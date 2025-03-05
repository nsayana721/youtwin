import React, { useEffect } from 'react';
import { ContentCard } from '../../components/ContentCard/ContentCard';
import { useTerms } from '../../context/TermsContext';
import { Modal } from '../../components/Modal/Modal';

export function Terms() {
  const { favoriteTerms, removeFavoriteTerm } = useTerms();
  const [showModal, setShowModal] = React.useState(false);
  const [selectedTerm, setSelectedTerm] = React.useState<string | null>(null);

  useEffect(() => {
    document.body.style.backgroundImage = 'url("https://lh3.googleusercontent.com/pw/AP1GczNY19sI_7U-M35qH3qe-AMfS6RJWOCMmjp0OrpzsgFPx321-iMe_q3ZFlH_CQSJoaowfpDvB1oL8YsGFSpPRmQGF04E5NO2Qp2WVLoXQKl5Ihc3-K2nWuY1aJlEv0JCrTn8IV9lT07fI4457dNBveHU4Q=w1024-h1024-s-no-gm?authuser=0")';
    document.body.style.backgroundSize = '200px';
    document.body.style.backgroundRepeat = 'repeat';
    
    return () => {
      document.body.style.backgroundImage = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundRepeat = '';
    };
  }, []);

  const handleRemove = (termId: string) => {
    setSelectedTerm(termId);
    setShowModal(true);
  };

  const handleConfirmRemove = () => {
    if (selectedTerm) {
      removeFavoriteTerm(selectedTerm);
    }
    setShowModal(false);
    setSelectedTerm(null);
  };

  const selectedTermData = selectedTerm 
    ? favoriteTerms.find(term => term.id === selectedTerm)
    : null;

  return (
    <>
      <div className="mb-8 bg-white/80 backdrop-blur-sm py-10 px-8 shadow-lg -mx-8 -mt-8 rounded-bl-3xl rounded-br-3xl">
        <h1 className="text-3xl font-bold text-gray-900">My Terms</h1>
        <p className="text-gray-600 mt-2">
          Your saved terms and definitions
        </p>
      </div>
      
      {favoriteTerms.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            You haven't saved any terms yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteTerms.map((term) => (
            <ContentCard
              key={term.id}
              title={term.term}
              type="Term"
              author={term.tutorName}
              authorLabel={`from ${term.subject}`}
              onFavorite={() => handleRemove(term.id)}
              isFavorite={true}
            />
          ))}
        </div>
      )}

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedTerm(null);
        }}
        onConfirm={handleConfirmRemove}
        title="Remove Term"
        message={selectedTermData 
          ? `Are you sure you want to remove "${selectedTermData.term}" from your saved terms?`
          : 'Are you sure you want to remove this term?'
        }
      />
    </>
  );
}