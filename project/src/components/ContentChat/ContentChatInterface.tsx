import React, { useState, useRef, useEffect } from 'react';
import { ContentChatMessage } from './ContentChatMessage';
import { ContentChatInput } from './ContentChatInput';
import { streamChat } from '../../services/difyService';

interface ContentChatInterfaceProps {
  tutorName: string;
  tutorId: string;
  subject: string;
  autoPlay?: boolean;
  fullScreen?: boolean;
}
interface Message {
  content: string;
  isAI: boolean;
  id: number;
  isPlaying?: boolean;
  isPlaying?: boolean;
  thinking?: boolean;
}

interface ContentChatInterfaceProps {
  tutorName: string;
  subject: string;
}

export function ContentChatInterface({ tutorName, tutorId, subject, autoPlay = false, fullScreen = false }: ContentChatInterfaceProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [currentPlayingId, setCurrentPlayingId] = useState<number | null>(null);
  const [conversationId, setConversationId] = useState<string>('');
  const [userId] = useState(() => 'user-' + Math.random().toString(36).substr(2, 9));
  const [messages, setMessages] = useState<Message[]>([{
    content: `Hi! I'm ${tutorName}. Feel free to ask any questions about this ${subject} lesson. I'm here to help you understand the content better! 📚`,
    isAI: true,
    id: Date.now(),
    isError: false
  }]);
  const [isTyping, setIsTyping] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const isNearBottom = () => {
    const container = chatContainerRef.current;
    if (!container) return true;
    
    const threshold = 100; // pixels from bottom
    return container.scrollHeight - container.scrollTop - container.clientHeight < threshold;
  };

  const scrollToBottom = () => {
    if (isNearBottom()) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setMessages(prev => prev.map((msg, idx) => 
        idx === prev.length - 1 && msg.isAI
          ? { 
              ...msg, 
              content: msg.content + ' [Stopped by user]',
              isStopped: true 
            }
          : msg
      ));
    }
    if (utteranceRef.current) {
      speechSynthesis.cancel();
      utteranceRef.current = null;
      setCurrentPlayingId(null);
    }
    setIsProcessing(false);
    setIsTyping(false);
  };

  const handleMessagePlay = (messageId: number, content: string) => {
    if (currentPlayingId === messageId) {
      // Stop playing if it's the current message
      speechSynthesis.cancel();
      utteranceRef.current = null;
      setCurrentPlayingId(null);
    } else {
      // Stop any current playback
      if (utteranceRef.current) {
        speechSynthesis.cancel();
      }
      // Start playing the new message
      utteranceRef.current = new SpeechSynthesisUtterance(content);
      utteranceRef.current.onend = () => {
        setCurrentPlayingId(null);
      };
      speechSynthesis.speak(utteranceRef.current);
      setCurrentPlayingId(messageId);
    }
  };

  useEffect(() => {
    if (!autoPlay && utteranceRef.current) {
      speechSynthesis.cancel();
      utteranceRef.current = null;
      setCurrentPlayingId(null);
    }
  }, [autoPlay]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (content: string) => {
    if (!content.trim()) return;

    const userMessage = { content, isAI: false, id: Date.now() };
    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);
    setIsTyping(true);

    const typingIndicatorId = Date.now() + 1;
    setMessages(prev => [...prev, { 
      content: 'Thinking...', 
      thinking: true,
      isAI: true, 
      id: typingIndicatorId,
      isError: false 
    }]);

    abortControllerRef.current = new AbortController();
    let fullResponse = '';

    try {
      for await (const chunk of streamChat(
        content,
        { conversationId, userId },
        abortControllerRef.current.signal
      )) {
        if (chunk.event === 'message') {
          // Add the chunk to the full response
          fullResponse += chunk.answer;
          
          // Update the typing indicator message with the current response
          setMessages(prev => prev.map(msg => 
            msg.id === typingIndicatorId 
              ? { ...msg, content: fullResponse, thinking: false }
              : msg
          ));
        } else if (chunk.event === 'message_end') {  
          // Store the conversation ID from the first response
          if (chunk.conversation_id && !conversationId) {
            setConversationId(chunk.conversation_id);
          }

          // Only check for empty response at the end of the message
          if (!fullResponse.trim()) {
            setMessages(prev => prev.map(msg => 
              msg.id === typingIndicatorId 
                ? { 
                    ...msg, 
                    content: "I'm drawing a blank here! 🤔 Could you rephrase your question? I want to make sure I give you the best possible answer!",
                    isError: true 
                  }
                : msg
            ));
            setIsTyping(false);
            setIsProcessing(false);
            abortControllerRef.current = null;
            setIsTyping(false);
            setIsProcessing(false);
            abortControllerRef.current = null;
            return;
          }

          setIsTyping(false);
          setIsProcessing(false);
          if (autoPlay) {
            // Extract only the main content for speech, excluding thinking part
            const mainContent = fullResponse.includes('</details>')
              ? fullResponse.substring(fullResponse.indexOf('</details>') + 10).trim()
              : fullResponse.trim();
            
            if (mainContent) {
              handleMessagePlay(typingIndicatorId, mainContent);
            }
          }
          abortControllerRef.current = null;
        }
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error in chat:', error);
        setMessages(prev => prev.map(msg => 
          msg.id === typingIndicatorId 
            ? { 
                ...msg, 
                content: "Oops! 🤖 Looks like my circuits are a bit overloaded right now. Let's try that again in a moment when I've had a chance to cool down my processors! 🌬️",
                isError: true 
              }
            : msg
        ));
      }
      setIsTyping(false);
      setIsProcessing(false);
      abortControllerRef.current = null;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <ContentChatMessage
            key={message.id}
            content={message.content}
            isAI={message.isAI}
            isError={message.isError}
            isPlaying={currentPlayingId === message.id}
            thinking={message.thinking || false}
            onPlay={handleMessagePlay}
            isStopped={message.isStopped}
            tutorName={tutorName}
            tutorId={tutorId}
            id={message.id}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className={`border-t bg-white p-4 ${fullScreen ? 'pb-4' : 'pb-8'} flex-shrink-0`}>
        <ContentChatInput 
          onSend={handleSend}
          isProcessing={isProcessing}
          onStop={handleStop}
        />
      </div>
    </div>
  );
}