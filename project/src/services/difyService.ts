const API_URL = import.meta.env.VITE_DIFY_API_URL;
const API_KEY = import.meta.env.VITE_DIFY_API_KEY;

interface ChatOptions {
  conversationId?: string;
  userId?: string;
}

export async function* streamChat(message: string, options: ChatOptions = {}, signal?: AbortSignal) {
  const userId = options.userId || 'user-' + Math.random().toString(36).substr(2, 9);

  try {
    const response = await fetch(`${API_URL}/chat-messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: message,
        user: userId,
        response_mode: 'streaming',
        conversation_id: options.conversationId || '',
        inputs: {},
        files: []
      }),
      signal
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Network response was not ok');
    }

    const reader = response.body?.getReader();
    if (!reader) throw new Error('No reader available');

    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.trim() === '') continue;
        if (!line.startsWith('data: ')) continue;
        
        const jsonStr = line.slice(6);
        try {
          const data = JSON.parse(jsonStr);
          if (data.event === 'error') {
            throw new Error(data.message);
          } else {
            yield data;
          }
        } catch (e) {
          console.error('Failed to parse JSON:', e);
          throw e;
        }
      }
    }
  } catch (error) {
    if (error.name === 'AbortError') {
      // Silently handle abort errors as they are expected
      return;
    }
    // Log and rethrow other errors
    console.error('Chat error:', error);
    throw error;
  }
}