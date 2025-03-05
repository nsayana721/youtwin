import React, { createContext, useContext, useState, useEffect } from 'react';

interface SharedChat {
  id: string;
  title: string;
  tutorId: string;
  tutorName: string;
  subject: string;
}

interface SharedContextType {
  favoriteShared: SharedChat[];
  toggleFavoriteShared: (chat: SharedChat) => void;
  removeFavoriteShared: (chatId: string) => void;
}

const SharedContext = createContext<SharedContextType | undefined>(undefined);

export function SharedProvider({ children }: { children: React.ReactNode }) {
  const [favoriteShared, setFavoriteShared] = useState<SharedChat[]>(() => {
    const saved = localStorage.getItem('favoriteShared');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favoriteShared', JSON.stringify(favoriteShared));
  }, [favoriteShared]);

  const toggleFavoriteShared = (chat: SharedChat) => {
    setFavoriteShared(prev => {
      const exists = prev.some(c => c.id === chat.id);
      if (exists) {
        return prev.filter(c => c.id !== chat.id);
      }
      return [...prev, chat];
    });
  };

  const removeFavoriteShared = (chatId: string) => {
    setFavoriteShared(prev => prev.filter(chat => chat.id !== chatId));
  };

  return (
    <SharedContext.Provider value={{ favoriteShared, toggleFavoriteShared, removeFavoriteShared }}>
      {children}
    </SharedContext.Provider>
  );
}

export function useShared() {
  const context = useContext(SharedContext);
  if (context === undefined) {
    throw new Error('useShared must be used within a SharedProvider');
  }
  return context;
}