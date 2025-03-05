import React from 'react';

export function ChatSidebar() {
  return (
    <div className="h-full flex flex-col bg-white">
      <iframe
        src="https://lyson-dify.zeabur.app/chatbot/oFHhlRJu1HxC9t6P"
        className="w-full h-full"
        style={{ border: 'none' }}
        allow="microphone"
        title="Chat Interface"
      />
    </div>
  );
}