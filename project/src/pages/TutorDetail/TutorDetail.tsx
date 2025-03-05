import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockTutors } from '../../data/mockTutors';
import { useFavorites } from '../../context/FavoritesContext';
import { StarIcon } from '../../components/Icons/StarIcon';
import { Modal } from '../../components/Modal/Modal';
import { ArrowLeft, MessageCircle, CheckCircle2, Share2 } from 'lucide-react';
import { useEffect } from 'react';
import { FullscreenChat } from '../../components/FullscreenChat/FullscreenChat';
import { useState } from 'react';

export function TutorDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const tutor = mockTutors.find(t => t.id === id);
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.includes(id || '');
  const [showModal, setShowModal] = React.useState(false);
  const [showChat, setShowChat] = useState(false);
  const [selectedContentType, setSelectedContentType] = useState<'video' | 'text' | 'audio'>('video');
  
  if (!tutor) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Tutor not found.</p>
      </div>
    );
  }

  const filteredContent = tutor.courseContent?.filter((content) => content.type === selectedContentType) || [];

  if (showChat) {
    return (
      <FullscreenChat
        tutorName={tutor.name}
        tutorId={tutor.id}
        subject={tutor.subject}
        onClose={() => setShowChat(false)}
      />
    );
  }

  const handleFavoriteClick = () => {
    if (isFavorite) {
      setShowModal(true);
    } else {
      toggleFavorite(tutor.id);
    }
  };

  const handleConfirmRemove = () => {
    toggleFavorite(tutor.id);
    setShowModal(false);
  };

  return (
    <div className="flex-1 -m-8">
      <div className="h-screen overflow-y-auto p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-5 py-3 text-gray-600 hover:text-primary-500 bg-gray-50/80 hover:bg-primary-50 rounded-lg transition-colors mb-6 group border border-gray-200 hover:border-primary-200 shadow-sm backdrop-blur-sm"
        >
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
          Back
        </button>

        <div className="rounded-xl overflow-hidden">
          <div className="aspect-video w-full relative">
            <img
              src={tutor.imageUrl}
              alt={`${tutor.name}'s profile`}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="py-6 space-y-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {tutor.subject}
                </h1>
                <p className="text-lg text-gray-600">{tutor.name}</p>
              </div>
              <div className="flex gap-3 mt-1">
                <button
                  onClick={handleFavoriteClick}
                  className="text-gray-400 hover:text-primary-500 transition-colors"
                >
                  <StarIcon
                    filled={isFavorite}
                    className="w-6 h-6 text-gray-600"
                  />
                </button>
                <button 
                  onClick={() => setShowChat(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7.29117 20.8242L2 22L3.17581 16.7088C2.42544 15.3056 2 13.7025 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C10.2975 22 8.6944 21.5746 7.29117 20.8242ZM7.58075 18.711L8.23428 19.0605C9.38248 19.6745 10.6655 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 13.3345 4.32549 14.6175 4.93949 15.7657L5.28896 16.4192L4.63416 19.3658L7.58075 18.711ZM7 12H9C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12H17C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12Z" />
                  </svg>
                  Talk to {tutor.name.split(' ')[0]}
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mt-6 mb-8">
              <span className="px-3 py-1 bg-primary-50 text-primary-500 rounded-full">
                Level: {tutor.level}
              </span>
              <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full">
                Age: {tutor.ageRange}
              </span>
              <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full">
                {tutor.type}
              </span>
            </div>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Description</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700">{tutor.description}</p>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Course Content</h2>
              <div className="flex gap-4 mb-6">
                <button
                  onClick={() => setSelectedContentType('video')}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    selectedContentType === 'video'
                      ? 'bg-primary-50 text-primary-500'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Video
                </button>
                <button
                  onClick={() => setSelectedContentType('text')}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    selectedContentType === 'text'
                      ? 'bg-primary-50 text-primary-500'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Text
                </button>
                <button
                  onClick={() => setSelectedContentType('audio')}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    selectedContentType === 'audio'
                      ? 'bg-primary-50 text-primary-500'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Audio
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredContent.map((content) => (
                  <div 
                    key={content.id} 
                    className="border border-gray-100 rounded-lg p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:border-primary-200 transition-all duration-200"
                  >
                    <div
                      className="cursor-pointer"
                      onClick={() => navigate(`${location.pathname}/content/${content.id}`)}
                    >
                    <div className="aspect-video rounded-lg mb-3 overflow-hidden">
                      <img
                        src={content.imageUrl}
                        alt={content.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-medium text-gray-900 mb-1">{content.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">{content.description}</p>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">{tutor.name}</span>
                      <span className="text-gray-400">{content.duration}</span>
                    </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
        </div>
      </div>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmRemove}
        title="Remove from My Twins"
        message={`Are you sure you want to remove ${tutor.name}'s ${tutor.subject} course from your favorites?`}
      />
    </div>
  );
}