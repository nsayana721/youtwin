import React from 'react';
import { StarIcon } from '../Icons/StarIcon';
import { use3DHover } from '../../hooks/use3DHover';

interface ContentCardProps {
  title: string;
  type: 'Term' | 'Chat';
  author: string;
  authorLabel?: string;
  onFavorite?: () => void;
  isFavorite?: boolean;
}

export function ContentCard({ 
  title, 
  type, 
  author, 
  authorLabel = 'by',
  onFavorite,
  isFavorite = false,
  onClick
}: ContentCardProps) {
  const { style, onMouseMove, onMouseLeave } = use3DHover();
  const typeStyles = {
    Term: 'bg-blue-50 text-blue-600',
    Chat: 'bg-purple-50 text-purple-600'
  };

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick();
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onFavorite) {
      onFavorite();
    }
  };

  return (
    <div 
      className="bg-white rounded-lg p-4 transition-all duration-200 cursor-pointer transform-gpu border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:border-primary-200"
      style={style}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={handleClick}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3 min-w-0">
          <h3 className="text-gray-900 font-medium truncate">{title}</h3>
          <span className={`px-2 py-1 ${typeStyles[type]} rounded-full text-xs font-medium`}>
            {type}
          </span>
        </div>
        <button
          className="text-gray-400 hover:text-primary-500 transition-colors flex-shrink-0 ml-2 z-10"
          onClick={handleFavoriteClick}
        >
          <StarIcon filled={isFavorite} className="w-5 h-5" />
        </button>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-500 min-w-0">
        <span className="flex-shrink-0">{authorLabel}</span>
        <span className="font-medium truncate">{author}</span>
      </div>
    </div>
  );
}