import React, { useEffect } from 'react';
import { ContentCard } from '../../components/ContentCard/ContentCard';
import { useShared } from '../../context/SharedContext';
import { Modal } from '../../components/Modal/Modal';

export function Shared() {
  const { favoriteShared, removeFavoriteShared } = useShared();
  const [showModal, setShowModal] = React.useState(false);
  const [selectedChat, setSelectedChat] = React.useState<string | null>(null);

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

  const handleRemove = (chatId: string) => {
    setSelectedChat(chatId);
    setShowModal(true);
  };

  const handleConfirmRemove = () => {
    if (selectedChat) {
      removeFavoriteShared(selectedChat);
    }
    setShowModal(false);
    setSelectedChat(null);
  };

  const selectedChatData = selectedChat 
    ? favoriteShared.find(chat => chat.id === selectedChat)
    : null;

  return (
    <>
      <div className="mb-8 bg-white/80 backdrop-blur-sm py-10 px-8 shadow-lg -mx-8 -mt-8 rounded-bl-3xl rounded-br-3xl">
        <h1 className="text-3xl font-bold text-gray-900">My Shared</h1>
        <p className="text-gray-600 mt-2">
          Your saved chat conversations
        </p>
      </div>
      
      {favoriteShared.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            You haven't saved any shared conversations yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteShared.map((chat) => (
            <ContentCard
              key={chat.id}
              title={chat.title}
              type="Chat"
              author={chat.tutorName}
              authorLabel={`from ${chat.subject}`}
              onFavorite={() => handleRemove(chat.id)}
              isFavorite={true}
            />
          ))}
        </div>
      )}

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedChat(null);
        }}
        onConfirm={handleConfirmRemove}
        title="Remove Shared Chat"
        message={selectedChatData 
          ? `Are you sure you want to remove "${selectedChatData.title}" from your saved chats?`
          : 'Are you sure you want to remove this chat?'
        }
      />
    </>
  );
}