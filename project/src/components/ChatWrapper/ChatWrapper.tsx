import React from 'react';
import { X } from 'lucide-react';

interface ChatWrapperProps {
  onClose: () => void;
  fullScreen?: boolean;
}

export function ChatWrapper({ onClose, fullScreen = true }: ChatWrapperProps) {
  const containerClasses = fullScreen
    ? "fixed inset-0 bg-white z-50 flex flex-col"
    : "h-full flex flex-col bg-white";

  return (
    <div className={containerClasses}>
      {fullScreen && (
        <div className="p-4 border-b flex justify-between items-center bg-white">
          <h2 className="text-lg font-semibold">Chat Session</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
      {!fullScreen && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      )}
      <div className="flex-1">
        <iframe
          src="https://lyson-dify.zeabur.app/chatbot/oFHhlRJu1HxC9t6P"
          className="w-full h-full"
          style={{ border: 'none' }}
          allow="microphone"
          title="Chat Interface"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      </div>
    </div>
  );
}