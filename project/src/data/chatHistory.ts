export interface ChatFolder {
  id: string;
  name: string;
  chats: ChatHistory[];
}

export interface ChatHistory {
  id: string;
  title: string;
  tutorId: string;
  tutorName: string;
  subject: string;
  contentId?: string; // Optional - only present for content-specific chats
  lastMessage: string;
  lastUpdated: Date;
}

export const mockChatFolders: ChatFolder[] = [
  {
    id: 'f1',
    name: 'Biology',
    chats: [
      {
        id: 'c1',
        title: 'Cell Division and Mitosis',
        tutorId: '1',
        tutorName: 'Chris Anderson',
        subject: 'Biology',
        contentId: 'v1',
        lastMessage: 'Can you explain the prophase stage in more detail?',
        lastUpdated: new Date('2025-02-20T10:30:00')
      },
      {
        id: 'c2',
        title: 'General Biology Discussion',
        tutorId: '1',
        tutorName: 'Chris Anderson',
        subject: 'Biology',
        lastMessage: 'What are the main differences between plant and animal cells?',
        lastUpdated: new Date('2025-02-19T15:45:00')
      }
    ]
  },
  {
    id: 'f2',
    name: 'Mathematics',
    chats: [
      {
        id: 'c3',
        title: 'Linear Algebra Guide',
        tutorId: '2',
        tutorName: 'David Mitchell',
        subject: 'Mathematics',
        contentId: 't1',
        lastMessage: 'How do eigenvalues relate to matrix transformations?',
        lastUpdated: new Date('2025-02-18T09:15:00')
      }
    ]
  }
];