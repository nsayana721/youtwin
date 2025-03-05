import React from 'react';
import { X } from 'lucide-react';
import { ContentChatInterface } from './ContentChatInterface';
import { Switch } from '../Switch/Switch';
import { useState } from 'react';

interface ContentChatSidebarProps {
  tutorName: string;
  tutorId: string;
  subject: string;
  contentTitle: string;
}

export function ContentChatSidebar({ tutorName, tutorId, subject, contentTitle }: ContentChatSidebarProps) {
  const [autoPlay, setAutoPlay] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="p-4 border-b bg-white sticky top-0 z-10">
        <div className="flex items-center gap-4 mb-2">
          <h2 className="text-lg font-semibold text-gray-900 flex-shrink-0">{subject}</h2>
          <div className="flex items-center gap-3">
            <Switch
              checked={autoPlay}
              onChange={setAutoPlay}
              label="Auto Play"
            />
            <button
              onClick={() => setResetKey(prev => prev + 1)}
              className="p-2 text-gray-400 hover:text-primary-500 transition-colors rounded-lg hover:bg-primary-50"
              title="Clear chat history"
            >
              <svg 
                className="w-5 h-5" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M5.46257 4.43262C7.21556 2.91688 9.5007 2 12 2C17.5228 2 22 6.47715 22 12C22 14.1361 21.3302 16.1158 20.1892 17.7406L17 12H20C20 7.58172 16.4183 4 12 4C9.84982 4 7.89777 4.84827 6.46023 6.22842L5.46257 4.43262ZM18.5374 19.5674C16.7844 21.0831 14.4993 22 12 22C6.47715 22 2 17.5228 2 12C2 9.86386 2.66979 7.88416 3.8108 6.25944L7 12H4C4 16.4183 7.58172 20 12 20C14.1502 20 16.1022 19.1517 17.5398 17.7716L18.5374 19.5674Z" />
              </svg>
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-500">{contentTitle}</p>
      </div>
      
      <ContentChatInterface 
        tutorName={tutorName} 
        tutorId={tutorId} 
        subject={subject}
        autoPlay={autoPlay}
        key={resetKey}
      />
    </div>
  );
}