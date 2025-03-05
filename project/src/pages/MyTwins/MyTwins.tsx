import React, { useEffect, useState } from 'react';
import { TutorCard } from '../../components/TutorCard/TutorCard';
import { mockTutors } from '../../data/mockTutors';
import { useFavorites } from '../../context/FavoritesContext';
import { FullscreenChat } from '../../components/FullscreenChat/FullscreenChat';
import { MessageCircle } from 'lucide-react';

export function MyTwins() {
  const { favorites } = useFavorites();
  const favoriteTutors = mockTutors.filter(tutor => favorites.includes(tutor.id));
  const [selectedTutor, setSelectedTutor] = useState<{
    id: string;
    name: string;
    subject: string;
  } | null>(null);

  useEffect(() => {
    document.body.style.backgroundImage = 'url("https://lh3.googleusercontent.com/pw/AP1GczNY19sI_7U-M35qH3qe-AMfS6RJWOCMmjp0OrpzsgFPx321-iMe_q3ZFlH_CQSJoaowfpDvB1oL8YsGFSpPRmQGF04E5NO2Qp2WVLoXQKl5Ihc3-K2nWuY1aJlEv0JCrTn8IV9lT07fI4457dNBveHU4Q=w1024-h1024-s-no-gm?authuser=0")';
    document.body.style.backgroundSize = '200px';
    document.body.style.backgroundRepeat = 'repeat';
    document.body.style.backgroundOpacity = '0.5';
    
    return () => {
      document.body.style.backgroundImage = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundRepeat = '';
      document.body.style.backgroundOpacity = '';
    };
  }, []);

  return (
    <>
      <div className="mb-8 bg-white/80 backdrop-blur-sm py-10 px-8 shadow-lg -mx-8 -mt-8 rounded-bl-3xl rounded-br-3xl">
        <h1 className="text-3xl font-bold text-gray-900">My Twins</h1>
        <p className="text-gray-600 mt-2">
          Your favorite digital twin tutors
        </p>
      </div>
      
      {favoriteTutors.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            You haven't added any twins to your favorites yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteTutors.map((tutor) => (
            <div key={tutor.id} className="relative group">
              <TutorCard tutor={tutor} />
              <button
                onClick={() => setSelectedTutor({
                  id: tutor.id,
                  name: tutor.name,
                  subject: tutor.subject
                })}
                className="absolute bottom-4 right-16 flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary-600"
              >
                <MessageCircle className="w-5 h-5" />
                Talk to {tutor.name.split(' ')[0]}
              </button>
            </div>
          ))}
        </div>
      )}
      
      {selectedTutor && (
        <FullscreenChat
          tutorName={selectedTutor.name}
          tutorId={selectedTutor.id}
          subject={selectedTutor.subject}
          onClose={() => setSelectedTutor(null)}
        />
      )}
    </>
  );
}