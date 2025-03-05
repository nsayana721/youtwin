import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { Tutor } from '../../data/mockTutors';
import { useFavorites } from '../../context/FavoritesContext';
import { StarIcon } from '../Icons/StarIcon';
import { use3DHover } from '../../hooks/use3DHover';
import { Modal } from '../Modal/Modal';

interface TutorCardProps {
  tutor: Tutor;
}

export function TutorCard({ tutor }: TutorCardProps) {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.includes(tutor.id);
  const navigate = useNavigate();
  const [showModal, setShowModal] = React.useState(false);
  const location = useLocation();
  const { style, onMouseMove, onMouseLeave } = use3DHover();

  const handleFavoriteClick = () => {
    if (isFavorite) {
      setShowModal(true);
    } else {
      toggleFavorite(tutor.id);
    }
  };

  const handleCardClick = () => {
    navigate(`${location.pathname}/${tutor.id}`);
  };

  const handleConfirmRemove = () => {
    toggleFavorite(tutor.id);
    setShowModal(false);
  };

  return (
    <>
      <div 
        className="bg-white rounded-xl overflow-hidden cursor-pointer transform-gpu border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:border-primary-200 transition-all duration-200"
        style={style}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onClick={handleCardClick}
      >
        <div className="aspect-video w-full relative group">
          <img
            src={tutor.imageUrl}
            alt={`${tutor.name}'s profile`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4 relative">
          <div className="text-lg font-semibold text-gray-900 mb-1">
            {tutor.subject}
          </div>
          <div className="text-sm text-gray-600">
            {tutor.name}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleFavoriteClick();
            }} 
            className="absolute bottom-4 right-4 text-gray-400 hover:text-primary-500 transition-colors"
          >
            <StarIcon
              filled={isFavorite}
              className="w-6 h-6 text-gray-600"
            />
          </button>
        </div>
      </div>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmRemove}
        title="Remove from My Twins"
        message={`Are you sure you want to remove ${tutor.name}'s ${tutor.subject} course from your favorites?`}
      />
    </>
  );
}