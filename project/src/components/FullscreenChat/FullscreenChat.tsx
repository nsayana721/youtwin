import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { ContentChatInterface } from '../ContentChat/ContentChatInterface';
import { VoiceChatInterface } from './VoiceChatInterface';
import { Switch } from '../Switch/Switch';
import { Sidebar } from '../Sidebar/Sidebar';

interface FullscreenChatProps {
  tutorName: string;
  tutorId: string;
  subject: string;
  onClose: () => void;
}

export function FullscreenChat({ tutorName, tutorId, subject, onClose }: FullscreenChatProps) {
  const [mode, setMode] = useState<'text' | 'voice'>('text');
  const [autoPlay, setAutoPlay] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex">
      <Sidebar collapsed={false} />
      <div className="flex-1 p-8" style={{
        backgroundImage: 'url("https://lh3.googleusercontent.com/pw/AP1GczNY19sI_7U-M35qH3qe-AMfS6RJWOCMmjp0OrpzsgFPx321-iMe_q3ZFlH_CQSJoaowfpDvB1oL8YsGFSpPRmQGF04E5NO2Qp2WVLoXQKl5Ihc3-K2nWuY1aJlEv0JCrTn8IV9lT07fI4457dNBveHU4Q=w1024-h1024-s-no-gm?authuser=0")',
        backgroundSize: '200px',
        backgroundRepeat: 'repeat'
      }}>
        <div className="max-w-5xl mx-auto h-full">
          <div className="bg-white rounded-2xl shadow-xl h-full flex flex-col overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b sticky top-0 z-10">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">{tutorName}</h2>
                <p className="text-sm text-gray-500">{subject}</p>
              </div>
              <div className="flex items-center gap-3">
                {mode === 'text' && (
                  <>
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
                  </>
                )}
                <button
                  onClick={() => setMode(mode === 'text' ? 'voice' : 'text')}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary-500 bg-gray-50/80 hover:bg-primary-50 rounded-lg transition-colors border border-gray-200 hover:border-primary-200"
                >
                  Switch to {mode === 'text' ? 'voice' : 'text'}
                </button>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-primary-500 transition-colors rounded-lg hover:bg-primary-50"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-hidden">
              {mode === 'text' ? (
                <ContentChatInterface
                  tutorName={tutorName}
                  tutorId={tutorId}
                  subject={subject}
                  autoPlay={autoPlay}
                  fullScreen={true}
                  key={resetKey}
                />
              ) : (
                <VoiceChatInterface
                  tutorName={tutorName}
                  tutorId={tutorId}
                  subject={subject}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}