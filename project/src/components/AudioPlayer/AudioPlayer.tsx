import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import type { AudioContent, Subtitle } from '../../data/audioContent';
import { formatTime } from '../../utils/formatTime';

interface AudioPlayerProps {
  content: AudioContent;
  onTimeUpdate?: (time: number) => void;
  className?: string;
}

export function AudioPlayer({ content, onTimeUpdate, className = '' }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      onTimeUpdate?.(audio.currentTime);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    return () => audio.removeEventListener('timeupdate', handleTimeUpdate);
  }, [onTimeUpdate]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = progressRef.current;
    if (!progressBar || !audioRef.current) return;

    const rect = progressBar.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    const newTime = ratio * content.duration;
    
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-100 p-4 ${className}`}>
      <audio ref={audioRef} src={content.audioUrl} />
      
      <div className="flex items-center gap-4">
        <button
          onClick={togglePlay}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-500 text-white hover:bg-primary-600 transition-colors"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5" />
          )}
        </button>

        <div className="flex-1">
          <div
            ref={progressRef}
            className="h-2 bg-gray-100 rounded-full cursor-pointer relative"
            onClick={handleProgressClick}
          >
            <div
              className="absolute left-0 top-0 bottom-0 bg-primary-500 rounded-full"
              style={{ width: `${(currentTime / content.duration) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-1 text-sm text-gray-500">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(content.duration)}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleMute}
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="w-20 accent-primary-500"
          />
        </div>
      </div>
    </div>
  );
}