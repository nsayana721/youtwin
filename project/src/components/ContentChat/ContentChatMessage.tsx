import React from 'react';
import { tutorAvatars, userAvatar } from '../../data/chatData';
import { useState, useEffect, useRef } from 'react';
import { PlayIcon, PauseIcon } from '../Icons/PlayPauseIcons';

interface ContentChatMessageProps {
  content: string;
  isAI: boolean;
  thinking?: boolean;
  tutorName: string;
  tutorId: string;
  id: number;
  isPlaying?: boolean;
  isError?: boolean;
  isStopped?: boolean;
  onPlay: (id: number, content: string) => void;
}

interface ParsedContent {
  isThinking: boolean;
  thinking: string | null;
  mainContent: string | null;
}

export function ContentChatMessage({ 
  content, 
  isAI, 
  thinking, 
  tutorName, 
  tutorId, 
  id,
  isPlaying,
  isError, 
  isStopped,
  onPlay 
}: ContentChatMessageProps) {
  const tutorAvatar = tutorAvatars[tutorId];
  const lastContentRef = useRef<string>('');
  const [isThinkingOpen, setIsThinkingOpen] = useState(true);
  const mainContentRef = useRef<string | null>(null);
  const [parsedContent, setParsedContent] = useState<ParsedContent>({
    isThinking: false,
    thinking: null,
    mainContent: null
  });

  const handlePlayClick = () => {
    if (mainContentRef.current) {
      onPlay(id, mainContentRef.current);
    }
  };

  useEffect(() => {
    // Only update if content has changed
    if (content === lastContentRef.current) return;
    lastContentRef.current = content;

    if (!isAI) {
      setParsedContent({
        isThinking: false,
        thinking: null,
        mainContent: content.trim()
      });
      return;
    }

    const detailsStart = content.indexOf('<details style=');
    const detailsEnd = content.indexOf('</details>');
    
    if (detailsStart !== -1) {
      const thinkingContent = content.substring(
        content.indexOf('</summary>') + 10,
        detailsEnd
      ).trim();
      
      const mainContent = detailsEnd !== -1 ? content.substring(detailsEnd + 10).trim() : null;
      mainContentRef.current = mainContent;

      setParsedContent({
        isThinking: true,
        thinking: thinkingContent,
        mainContent: mainContent
      });
    } else {
      mainContentRef.current = content.trim();
      setParsedContent({
        isThinking: false,
        thinking: null,
        mainContent: content.trim()
      });
    }
  }, [content]);

  return (
    <div className={`flex gap-3 mb-4 items-start ${isAI ? '' : 'justify-end'}`}>
      {isAI && (
        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
          <img
            src={tutorAvatar.imageUrl}
            alt={tutorName}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className={`${isAI ? 'w-full max-w-[80%]' : 'max-w-[80%]'}`}>
        <div className={`rounded-2xl px-4 py-3 relative ${
          isAI 
            ? isError 
              ? 'bg-red-50 border border-red-200' 
              : isStopped
                ? 'bg-amber-50 border border-amber-200'
                : 'bg-gray-100'
            : 'bg-primary-500 text-white order-first'
        }`}>
          {thinking ? (
            <div className="flex items-center gap-2 text-gray-500">
              <span>Thinking</span>
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" />
                <div className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {parsedContent.isThinking && (
                <div>
                  <div className="bg-[#FEF2F0] text-[#F75B48] rounded-lg overflow-hidden w-full">
                    <button
                      onClick={() => setIsThinkingOpen(prev => !prev)}
                      className="w-full px-3 py-2 flex items-center gap-2 hover:bg-[#FDE6E2] transition-colors"
                    >
                      <svg
                        className={`w-4 h-4 transition-transform ${isThinkingOpen ? 'rotate-90' : ''}`}
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M8.58579 16.5858L13.1716 12L8.58579 7.41421L10 6L16 12L10 18L8.58579 16.5858Z" />
                      </svg>
                      <span className="font-medium">Thinking...</span>
                    </button>
                    {isThinkingOpen && (
                      <div className="px-3 py-2 border-t border-[#FDE6E2]">
                        <div className="whitespace-pre-wrap">{parsedContent.thinking}</div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {parsedContent.mainContent && (
                <div className={`text-sm whitespace-pre-wrap ${parsedContent.isThinking && isThinkingOpen ? 'mt-4' : ''}`}>
                  {parsedContent.mainContent}
                </div>
              )}
              {isAI && !thinking && content && parsedContent.mainContent && !isError && (
                <div className="mt-1 flex justify-end gap-1">
                  <button 
                    onClick={handlePlayClick}
                    className="text-gray-400 hover:text-primary-500 transition-colors p-1 hover:bg-gray-100 rounded-lg"
                  >
                    {isPlaying ? (
                      <PauseIcon className="w-5 h-5" />
                    ) : (
                      <PlayIcon className="w-5 h-5" />
                    )}
                  </button>
                  <button 
                    onClick={() => navigator.clipboard.writeText(parsedContent.mainContent || '')}
                    className="text-gray-400 hover:text-primary-500 transition-colors p-1 hover:bg-gray-100 rounded-lg"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6.9998 6V3C6.9998 2.44772 7.44752 2 7.9998 2H19.9998C20.5521 2 20.9998 2.44772 20.9998 3V17C20.9998 17.5523 20.5521 18 19.9998 18H16.9998V20.9991C16.9998 21.5519 16.5499 22 15.993 22H4.00666C3.45059 22 3 21.5554 3 20.9991L3.0026 7.00087C3.0027 6.44811 3.45264 6 4.00942 6H6.9998ZM5.00242 8L5.00019 20H14.9998V8H5.00242ZM8.9998 6H16.9998V16H18.9998V4H8.9998V6Z" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {!isAI && !thinking && (
        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
          <img
            src={userAvatar.imageUrl}
            alt="You"
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  );
}