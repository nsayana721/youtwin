import { useEffect } from 'react';
import { TutorCard } from '../../components/TutorCard/TutorCard';
import { mockTutors } from '../../data/mockTutors';

export function Marketplace() {
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
        <h1 className="text-3xl font-bold text-gray-900">Marketplace</h1>
        <p className="text-gray-600 mt-2">
          Find your perfect digital twin tutor for your studies
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockTutors.map((tutor) => (
          <TutorCard key={tutor.id} tutor={tutor} />
        ))}
      </div>
    </>
  );
}