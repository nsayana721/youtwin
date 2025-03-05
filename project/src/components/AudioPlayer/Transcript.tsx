import React, { useRef, useEffect } from 'react';
import { Play } from 'lucide-react';
import type { Subtitle } from '../../data/audioContent';
import { formatTime } from '../../utils/formatTime';

interface TranscriptProps {
  subtitles: Subtitle[];
  currentTime: number;
  onSubtitleClick: (startTime: number) => void;
}

export function Transcript({ subtitles, currentTime, onSubtitleClick }: TranscriptProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeSubtitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const activeSubtitle = activeSubtitleRef.current;
    const container = containerRef.current;
    
    if (activeSubtitle && container) {
      const containerRect = container.getBoundingClientRect();
      const subtitleRect = activeSubtitle.getBoundingClientRect();
      
      if (subtitleRect.top < containerRect.top || subtitleRect.bottom > containerRect.bottom) {
        activeSubtitle.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentTime]);

  return (
    <div 
      ref={containerRef}
      className="h-full overflow-y-auto"
    >
      <div className="divide-y divide-gray-100">
        {subtitles.map((subtitle) => {
          const isActive = currentTime >= subtitle.startTime && currentTime < subtitle.endTime;
          
          return (
            <div
              key={subtitle.id}
              ref={isActive ? activeSubtitleRef : null}
              className={`group relative p-4 transition-colors ${
                isActive ? 'bg-primary-50' : 'hover:bg-gray-50/50'
              }`}
            >
              <div className="flex items-start gap-4">
                <span className="text-sm text-gray-400 font-mono whitespace-nowrap">
                  {formatTime(subtitle.startTime)}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-700">{subtitle.text}</p>
                </div>
                <button
                  onClick={() => onSubtitleClick(subtitle.startTime)}
                  className={`flex-shrink-0 p-2 rounded-full ${
                    isActive 
                      ? 'text-primary-500 bg-white shadow-sm' 
                      : 'text-gray-400 opacity-0 group-hover:opacity-100'
                  } hover:text-primary-500 transition-all`}
                >
                  <Play className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}