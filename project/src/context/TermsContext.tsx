import React, { createContext, useContext, useState, useEffect } from 'react';

interface Term {
  id: string;
  term: string;
  tutorId: string;
  tutorName: string;
  subject: string;
}

interface TermsContextType {
  favoriteTerms: Term[];
  toggleFavoriteTerm: (term: Term) => void;
  removeFavoriteTerm: (termId: string) => void;
}

const TermsContext = createContext<TermsContextType | undefined>(undefined);

export function TermsProvider({ children }: { children: React.ReactNode }) {
  const [favoriteTerms, setFavoriteTerms] = useState<Term[]>(() => {
    const saved = localStorage.getItem('favoriteTerms');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favoriteTerms', JSON.stringify(favoriteTerms));
  }, [favoriteTerms]);

  const toggleFavoriteTerm = (term: Term) => {
    setFavoriteTerms(prev => {
      const exists = prev.some(t => t.id === term.id);
      if (exists) {
        return prev.filter(t => t.id !== term.id);
      }
      return [...prev, term];
    });
  };

  const removeFavoriteTerm = (termId: string) => {
    setFavoriteTerms(prev => prev.filter(term => term.id !== termId));
  };

  return (
    <TermsContext.Provider value={{ favoriteTerms, toggleFavoriteTerm, removeFavoriteTerm }}>
      {children}
    </TermsContext.Provider>
  );
}

export function useTerms() {
  const context = useContext(TermsContext);
  if (context === undefined) {
    throw new Error('useTerms must be used within a TermsProvider');
  }
  return context;
}