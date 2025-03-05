import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockTutors } from '../../data/mockTutors';
import { StarIcon } from '../../components/Icons/StarIcon';
import { ArrowLeft } from 'lucide-react';
import { ContentChatSidebar } from '../../components/ContentChat/ContentChatSidebar';
import { useState, useRef } from 'react';
import { SidebarFoldIcon, SidebarUnfoldIcon } from '../../components/Icons/SidebarIcons';
import { ContentCard } from '../../components/ContentCard/ContentCard';
import { useTerms } from '../../context/TermsContext';
import { useShared } from '../../context/SharedContext';
import { mockAudioContent } from '../../data/audioContent';
import { AudioPlayer } from '../../components/AudioPlayer/AudioPlayer';
import { Transcript } from '../../components/AudioPlayer/Transcript';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import { Modal } from '../../components/Modal/Modal';

export function ContentDetail() {
  const { tutorId, contentId } = useParams<{ tutorId: string; contentId: string }>();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(true);
  const [showTermModal, setShowTermModal] = useState(false);
  const [showSharedModal, setShowSharedModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{ id: string; title: string } | null>(null);
  const { favoriteTerms, toggleFavoriteTerm } = useTerms();
  const { favoriteShared, toggleFavoriteShared } = useShared();
  const [sidebarWidth, setSidebarWidth] = useState(384);
  const resizeRef = useRef({
    isResizing: false,
    startX: 0,
    startWidth: 0
  });
  const tutor = mockTutors.find(t => t.id === tutorId);
  const content = tutor?.courseContent.find(c => c.id === contentId);
  const audioContent = content?.type === 'audio' ? mockAudioContent[content.id] : null;
  const [currentTime, setCurrentTime] = useState(0);

  const handleMouseMove = (e: MouseEvent) => {
    if (!resizeRef.current.isResizing) return;
    
    e.preventDefault();
    requestAnimationFrame(() => {
      const delta = e.clientX - resizeRef.current.startX;
      const newWidth = Math.min(Math.max(320, resizeRef.current.startWidth - delta), 480);
      setSidebarWidth(newWidth);
    });
  };

  const handleMouseUp = () => {
    resizeRef.current.isResizing = false;
    document.body.style.cursor = 'default';
    document.body.style.userSelect = '';
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    resizeRef.current = {
      isResizing: true,
      startX: e.clientX,
      startWidth: sidebarWidth
    };
    document.body.style.cursor = 'ew-resize';
    document.body.style.userSelect = 'none';
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleTermFavorite = (term: { id: string; term: string }) => {
    const isFavorite = favoriteTerms.some(t => t.id === term.id);
    if (isFavorite) {
      setSelectedItem({ id: term.id, title: term.term });
      setShowTermModal(true);
    } else {
      toggleFavoriteTerm({
        id: term.id,
        term: term.term,
        tutorId: tutor.id,
        tutorName: tutor.name,
        subject: tutor.subject
      });
    }
  };

  const handleSharedFavorite = (chat: { id: string; title: string }) => {
    const isFavorite = favoriteShared.some(s => s.id === chat.id);
    if (isFavorite) {
      setSelectedItem({ id: chat.id, title: chat.title });
      setShowSharedModal(true);
    } else {
      toggleFavoriteShared({
        id: chat.id,
        title: chat.title,
        tutorId: tutor.id,
        tutorName: tutor.name,
        subject: tutor.subject
      });
    }
  };

  if (!tutor || !content) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Content not found.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 -m-8">
      <div 
        className="h-screen overflow-y-auto p-8 transition-all duration-300"
        style={{ marginRight: isExpanded ? `${sidebarWidth}px` : 0 }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-5 py-3 text-gray-600 hover:text-primary-500 bg-gray-50/80 hover:bg-primary-50 rounded-lg transition-colors mb-6 group border border-gray-200 hover:border-primary-200 shadow-sm backdrop-blur-sm"
            >
              <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
              Back to {tutor.subject}
            </button>

            <div className="rounded-xl overflow-hidden">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="px-3 py-1 bg-primary-50 text-primary-500 rounded-full text-sm uppercase">
                  {content.type}
                </span>
                <h1 className="text-2xl font-bold text-gray-900 mt-3 mb-2">
                  {content.title}
                </h1>
                <p className="text-lg text-gray-600">By {tutor.name}</p>
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

            <div className="aspect-video w-full relative rounded-xl overflow-hidden">
              {content.type === 'video' && (
                <iframe
                  src={`https://www.youtube.com/embed/${content.videoUrl?.split('v=')[1]}`}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
              {content.type === 'audio' && audioContent && (
                <img
                  src={content.imageUrl}
                  alt={content.title}
                  className="w-full h-full object-cover"
                />
              )}
              {content.type === 'text' && (
                <img
                  src={content.imageUrl}
                  alt={content.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            {content.type === 'audio' && audioContent && (
              <div className="mt-6 bg-gray-50 rounded-xl overflow-hidden">
                <div className="flex-1 overflow-hidden">
                  <Transcript
                    subtitles={audioContent.subtitles}
                    currentTime={currentTime}
                    onSubtitleClick={(time) => {
                      const audioElement = document.querySelector('audio');
                      if (audioElement) {
                        audioElement.currentTime = time;
                        audioElement.play();
                      }
                    }}
                  />
                </div>
                <AudioPlayer
                  content={audioContent}
                  onTimeUpdate={setCurrentTime}
                  className="rounded-none border-0 shadow-none"
                />
              </div>
            )}

            <div className="py-6 space-y-6">
              {content.type === 'text' && (
                <section>
                  <div className="prose prose-gray max-w-none">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        h1: ({ ...props }) => (
                          <h1 className="text-2xl font-bold text-gray-900 mt-8 mb-4 first:mt-0" {...props} />
                        ),
                        h2: ({ ...props }) => (
                          <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-4" {...props} />
                        ),
                        h3: ({ ...props }) => (
                          <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2" {...props} />
                        ),
                        p: ({ ...props }) => (
                          <p className="text-gray-700 leading-relaxed my-4" {...props} />
                        ),
                        ul: ({ ...props }) => (
                          <ul className="list-disc pl-6 my-4 space-y-2 text-gray-700" {...props} />
                        ),
                        ol: ({ ...props }) => (
                          <ol className="list-decimal pl-6 my-4 space-y-2 text-gray-700" {...props} />
                        ),
                        li: ({ ...props }) => (
                          <li className="text-gray-700" {...props} />
                        ),
                        blockquote: ({ node, ...props }) => (
                          <blockquote 
                            className="border-l-4 border-primary-200 pl-4 py-2 my-6 text-gray-600 italic"
                            {...props}
                          />
                        ),
                        code: ({ inline, ...props }) => 
                          inline ? (
                            <code className="bg-gray-100 rounded px-2 py-1 text-sm font-mono text-primary-600" {...props} />
                          ) : (
                            <pre className="bg-gray-100 rounded-lg p-4 my-6 overflow-x-auto">
                              <code className="text-sm font-mono text-gray-800" {...props} />
                            </pre>
                          ),
                      }}
                    >
                      {content.content?.split('\n').map(line => line.trim()).join('\n')}
                    </ReactMarkdown>
                  </div>
                </section>
              )}
              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Summary</h2>
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-gray-700">{content.summary || content.description}</p>
                </div>
              </section>

              {content.keyQuestions && (
                <section>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Key Questions</h2>
                  <ul className="space-y-3 bg-gray-50 rounded-lg p-6">
                    {content.keyQuestions.map((question, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-700">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-50 text-primary-500 flex items-center justify-center font-medium">
                          {index + 1}
                        </span>
                        {question}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </div>

          <div className="space-y-6">
            {content.terms && (
              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Terms</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {content.terms.map((term) => {
                    const isFavorite = favoriteTerms.some(t => t.id === term.id);
                    return (
                      <ContentCard
                        key={term.id}
                        title={term.term}
                        type="Term"
                        author={tutor.name}
                        onFavorite={() => handleTermFavorite(term)}
                        isFavorite={isFavorite}
                      />
                    );
                  })}
                </div>
              </section>
            )}

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Shared Conversations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[{
                  id: `${tutorId}-${contentId}-chat`,
                  title: content.title,
                }].map(chat => {
                  const isFavorite = favoriteShared.some(s => s.id === chat.id);
                  return (
                    <ContentCard
                      key={chat.id}
                      title={chat.title}
                      type="Chat"
                      author="Lyson Ober"
                      authorLabel="shared by"
                      onFavorite={() => handleSharedFavorite(chat)}
                      isFavorite={isFavorite}
                    />
                  );
                })}
              </div>
            </section>
          </div>
          </div>
        </div>
      </div>
      
      <div 
        className={`fixed top-0 h-screen bg-white border-l shadow-lg transition-all duration-300 ${
          isExpanded ? 'translate-x-0' : 'translate-x-full'
        } will-change-transform`}
        style={{ 
          width: `${sidebarWidth}px`,
          right: isExpanded ? '0' : `-${sidebarWidth}px`
        }}
      >
        <div
          className="absolute left-0 top-0 bottom-0 w-1 cursor-ew-resize hover:bg-primary-500/20 touch-none"
          onMouseDown={handleResizeStart}
        />
        <ContentChatSidebar
          tutorName={tutor.name}
          tutorId={tutor.id}
          subject={tutor.subject}
          contentTitle={content.title}
        />
      </div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="fixed top-4 right-4 w-8 h-8 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center text-gray-600 hover:text-primary-500 hover:border-primary-200 transition-all duration-300 z-20"
      >
        {isExpanded ? (
          <SidebarUnfoldIcon className="w-5 h-5" />
        ) : (
          <SidebarFoldIcon className="w-5 h-5" />
        )}
      </button>
      
      <Modal
        isOpen={showTermModal}
        onClose={() => {
          setShowTermModal(false);
          setSelectedItem(null);
        }}
        onConfirm={() => {
          if (selectedItem) {
            toggleFavoriteTerm({
              id: selectedItem.id,
              term: selectedItem.title,
              tutorId: tutor.id,
              tutorName: tutor.name,
              subject: tutor.subject
            });
          }
          setShowTermModal(false);
          setSelectedItem(null);
        }}
        title="Remove Term"
        message={selectedItem ? `Are you sure you want to remove "${selectedItem.title}" from your saved terms?` : ''}
      />
      
      <Modal
        isOpen={showSharedModal}
        onClose={() => {
          setShowSharedModal(false);
          setSelectedItem(null);
        }}
        onConfirm={() => {
          if (selectedItem) {
            toggleFavoriteShared({
              id: selectedItem.id,
              title: selectedItem.title,
              tutorId: tutor.id,
              tutorName: tutor.name,
              subject: tutor.subject
            });
          }
          setShowSharedModal(false);
          setSelectedItem(null);
        }}
        title="Remove Shared Chat"
        message={selectedItem ? `Are you sure you want to remove "${selectedItem.title}" from your saved chats?` : ''}
      />
    </div>
  );
}