import React from 'react';

interface IconProps {
  className?: string;
}

export function FolderIcon({ className = '' }: IconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="currentColor"
      className={className}
    >
      <path d="M3 3C2.44772 3 2 3.44772 2 4V20C2 20.5523 2.44772 21 3 21H21C21.5523 21 22 20.5523 22 20V7C22 6.44772 21.5523 6 21 6H12L10 3H3Z" />
    </svg>
  );
}