import React, { createContext, useContext, useState, useEffect } from 'react';
import { ChatFolder, ChatHistory, mockChatFolders } from '../data/chatHistory';

interface ChatHistoryContextType {
  folders: ChatFolder[];
  addFolder: (name: string) => void;
  renameFolder: (id: string, newName: string) => void;
  deleteFolder: (id: string) => void;
  addChat: (chat: ChatHistory, folderId?: string) => void;
  moveChat: (chatId: string, fromFolderId: string, toFolderId: string) => void;
  deleteChat: (chatId: string, folderId: string) => void;
  updateChat: (folderId: string, chat: ChatHistory) => void;
}

const ChatHistoryContext = createContext<ChatHistoryContextType | undefined>(undefined);

export function ChatHistoryProvider({ children }: { children: React.ReactNode }) {
  const [folders, setFolders] = useState<ChatFolder[]>(() => {
    const saved = localStorage.getItem('chatFolders');
    if (saved) {
      try {
        const parsedData = JSON.parse(saved);
        return Array.isArray(parsedData) ? parsedData : mockChatFolders;
      } catch (e) {
        console.error('Error parsing chat folders:', e);
        return mockChatFolders;
      }
    }
    return mockChatFolders;
  });

  useEffect(() => {
    try {
      localStorage.setItem('chatFolders', JSON.stringify(folders));
    } catch (e) {
      console.error('Error saving chat folders:', e);
    }
  }, [folders]);

  const addFolder = (name: string) => {
    setFolders(prev => [...prev, {
      id: 'f' + Date.now(),
      name,
      chats: []
    }]);
  };

  const renameFolder = (id: string, newName: string) => {
    setFolders(prev => prev.map(folder =>
      folder.id === id ? { ...folder, name: newName } : folder
    ));
  };

  const deleteFolder = (id: string) => {
    setFolders(prev => prev.filter(folder => folder.id !== id));
  };

  const addChat = (chat: ChatHistory, folderId?: string) => {
    setFolders(prev => {
      if (folderId) {
        return prev.map(folder =>
          folder.id === folderId
            ? { ...folder, chats: [chat, ...folder.chats] }
            : folder
        );
      }
      // If no folder specified, add to "Uncategorized" or create it
      const uncategorizedFolder = prev.find(f => f.name === 'Uncategorized');
      if (uncategorizedFolder) {
        return prev.map(folder =>
          folder.id === uncategorizedFolder.id
            ? { ...folder, chats: [chat, ...folder.chats] }
            : folder
        );
      }
      return [...prev, {
        id: 'f' + Date.now(),
        name: 'Uncategorized',
        chats: [chat]
      }];
    });
  };

  const moveChat = (chatId: string, fromFolderId: string, toFolderId: string) => {
    setFolders(prev => {
      const fromFolder = prev.find(f => f.id === fromFolderId);
      const chat = fromFolder?.chats.find(c => c.id === chatId);
      if (!chat) return prev;

      return prev.map(folder => {
        if (folder.id === fromFolderId) {
          return {
            ...folder,
            chats: folder.chats.filter(c => c.id !== chatId)
          };
        }
        if (folder.id === toFolderId) {
          return {
            ...folder,
            chats: [chat, ...folder.chats]
          };
        }
        return folder;
      });
    });
  };

  const deleteChat = (chatId: string, folderId: string) => {
    setFolders(prev => prev.map(folder =>
      folder.id === folderId
        ? { ...folder, chats: folder.chats.filter(chat => chat.id !== chatId) }
        : folder
    ));
  };

  const updateChat = (folderId: string, updatedChat: ChatHistory) => {
    setFolders(prev => prev.map(folder =>
      folder.id === folderId
        ? {
            ...folder,
            chats: folder.chats.map(chat =>
              chat.id === updatedChat.id ? updatedChat : chat
            )
          }
        : folder
    ));
  };

  return (
    <ChatHistoryContext.Provider value={{
      folders,
      addFolder,
      renameFolder,
      deleteFolder,
      addChat,
      moveChat,
      deleteChat,
      updateChat
    }}>
      {children}
    </ChatHistoryContext.Provider>
  );
}

export function useChatHistory() {
  const context = useContext(ChatHistoryContext);
  if (context === undefined) {
    throw new Error('useChatHistory must be used within a ChatHistoryProvider');
  }
  return context;
}