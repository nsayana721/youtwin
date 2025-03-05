import React, { useState } from 'react';
import { useChatHistory } from '../../context/ChatHistoryContext';
import { ChevronDown, ChevronRight, FolderPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../Modal/Modal';

interface DeleteChatInfo {
  id: string;
  folderId: string;
  title: string;
}

interface ChatHistorySectionProps {
  isExpanded: boolean;
}

export function ChatHistorySection({ isExpanded }: ChatHistorySectionProps) {
  const {
    folders,
    addFolder,
    renameFolder,
    deleteFolder,
    moveChat,
    deleteChat
  } = useChatHistory();
  const navigate = useNavigate();
  const [expandedFolders, setExpandedFolders] = useState<string[]>([]);
  const [showNewFolderModal, setShowNewFolderModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [showDeleteFolderModal, setShowDeleteFolderModal] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [showDeleteChatModal, setShowDeleteChatModal] = useState(false);
  const [showAllFolders, setShowAllFolders] = useState(false);
  const [selectedChat, setSelectedChat] = useState<DeleteChatInfo | null>(null);
  const visibleFolders = showAllFolders ? folders : folders.slice(0, 5);
  const [renamingFolder, setRenamingFolder] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev =>
      prev.includes(folderId)
        ? prev.filter(id => id !== folderId)
        : [...prev, folderId]
    );
  };

  const handleChatClick = (chat: {
    tutorId: string;
    contentId?: string;
  }) => {
    if (chat.contentId) {
      navigate(`/marketplace/${chat.tutorId}/content/${chat.contentId}`);
    } else {
      navigate(`/marketplace/${chat.tutorId}`);
    }
  };

  const handleAddFolder = () => {
    if (newFolderName.trim()) {
      addFolder(newFolderName.trim());
      setNewFolderName('');
      setShowNewFolderModal(false);
    }
  };

  const handleDeleteFolder = () => {
    if (selectedFolder) {
      deleteFolder(selectedFolder);
      setSelectedFolder(null);
      setShowDeleteFolderModal(false);
    }
  };

  const handleDeleteChat = () => {
    if (selectedChat) {
      deleteChat(selectedChat.id, selectedChat.folderId);
      setSelectedChat(null);
      setShowDeleteChatModal(false);
    }
  };

  const handleRenameFolder = () => {
    if (renamingFolder) {
      renameFolder(renamingFolder.id, renamingFolder.name);
      setRenamingFolder(null);
    }
  };

  return (
    <div className="mt-4 flex-shrink-0">
      <div className="px-6 mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-medium text-gray-500">Collection</h2>
          {isExpanded && <span className="text-xs text-gray-400">{folders.length}</span>}
        </div>
        {isExpanded && <button
          onClick={() => setShowNewFolderModal(true)}
          className="p-1 text-gray-400 hover:text-primary-500 transition-colors rounded"
        >
          <FolderPlus className="w-4 h-4" />
        </button>}
      </div>

      <div className="space-y-1">
        {visibleFolders.map(folder => (
          <div key={folder.id}>
            <div
              onClick={() => toggleFolder(folder.id)}
              className="w-full px-6 py-2 flex items-center gap-2 text-sm text-gray-600 hover:text-primary-500 hover:bg-primary-50 transition-colors group"
            >
              {expandedFolders.includes(folder.id) ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
              {isExpanded && renamingFolder?.id === folder.id ? (
                <input
                  type="text"
                  value={renamingFolder.name}
                  onChange={e => setRenamingFolder(prev => prev ? { ...prev, name: e.target.value } : null)}
                  onBlur={handleRenameFolder}
                  onKeyDown={e => e.key === 'Enter' && handleRenameFolder()}
                  className="flex-1 bg-transparent border-b border-primary-500 focus:outline-none px-1"
                  autoFocus
                />
              ) : (
                <span className="flex-1 text-left truncate">{isExpanded ? folder.name : folder.name[0]}</span>
              )}
              {isExpanded && <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setRenamingFolder({ id: folder.id, name: folder.name });
                  }}
                  className="p-1 text-gray-400 hover:text-primary-500 transition-colors rounded"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.41421 15.89L16.5563 5.74786L15.1421 4.33365L5 14.4758V15.89H6.41421ZM7.24264 17.89H3V13.6474L14.435 2.21233C14.8256 1.8218 15.4587 1.8218 15.8492 2.21233L18.6777 5.04075C19.0682 5.43128 19.0682 6.06444 18.6777 6.45497L7.24264 17.89ZM3 19.89H21V21.89H3V19.89Z" />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFolder(folder.id);
                    setShowDeleteFolderModal(true);
                  }}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors rounded"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z" />
                  </svg>
                </button>
              </div>}
            </div>
            {expandedFolders.includes(folder.id) && (
              <div className="ml-6 border-l border-gray-200">
                {(folder.chats || []).map(chat => (
                  <div
                    key={chat.id}
                    onClick={() => handleChatClick(chat)}
                    className="w-full px-6 py-2 flex items-center gap-2 text-sm text-gray-600 hover:text-primary-500 hover:bg-primary-50 transition-colors group"
                  >
                    <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7.29117 20.8242L2 22L3.17581 16.7088C2.42544 15.3056 2 13.7025 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C10.2975 22 8.6944 21.5746 7.29117 20.8242ZM7.58075 18.711L8.23428 19.0605C9.38248 19.6745 10.6655 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 13.3345 4.32549 14.6175 4.93949 15.7657L5.28896 16.4192L4.63416 19.3658L7.58075 18.711Z" />
                    </svg>
                    {isExpanded && <span className="flex-1 text-left truncate">{chat.title}</span>}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedChat({
                          id: chat.id,
                          folderId: folder.id,
                          title: chat.title
                        });
                        setShowDeleteChatModal(true);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-all rounded"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {isExpanded && folders.length > 5 && (
        <button
          onClick={() => setShowAllFolders(!showAllFolders)}
          className="w-full px-6 py-2 text-sm text-gray-500 hover:text-primary-500 hover:bg-primary-50 transition-colors text-left"
        >
          {showAllFolders ? 'Show less' : `See ${folders.length - 5} more`}
        </button>
      )}
      
      <div className="px-6 mt-6 mb-2">
        {isExpanded && <h2 className="text-sm font-medium text-gray-500">Chat History</h2>}
      </div>
      

      <Modal
        isOpen={showNewFolderModal}
        onClose={() => {
          setShowNewFolderModal(false);
          setNewFolderName('');
        }}
        onConfirm={handleAddFolder}
        title="Create New Folder"
        type="default"
        confirmLabel="Create"
        message={
          <div>
            <input
              type="text"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddFolder();
                }
              }}
              placeholder="Enter folder name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              autoFocus
            />
          </div>
        }
      />

      <Modal
        isOpen={showDeleteFolderModal}
        onClose={() => {
          setShowDeleteFolderModal(false);
          setSelectedFolder(null);
        }}
        onConfirm={handleDeleteFolder}
        title="Delete Folder"
        message="Are you sure you want to delete this folder? All chats inside will be moved to Uncategorized."
      />

      <Modal
        isOpen={showDeleteChatModal}
        onClose={() => {
          setShowDeleteChatModal(false);
          setSelectedChat(null);
        }}
        onConfirm={handleDeleteChat}
        title="Delete Chat"
        message={selectedChat ? `Are you sure you want to delete "${selectedChat.title}"?` : ''}
      />
    </div>
  );
}