export interface ChatAvatar {
  imageUrl: string;
  initials: string;
}

export interface ChatUser {
  id: string;
  name: string;
  avatar: ChatAvatar;
}

export const userAvatar: ChatAvatar = {
  imageUrl: 'https://framerusercontent.com/images/69oKvyADQg8iWIkjQ9YSd34rwns.jpg',
  initials: 'Y'
};

export const tutorAvatars: Record<string, ChatAvatar> = {
  '1': { // Chris Anderson - Biology
    imageUrl: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=400&auto=format&fit=crop&q=60',
    initials: 'CA'
  },
  '2': { // David Mitchell - Mathematics
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=60',
    initials: 'DM'
  },
  '3': { // Sarah Wilson - Critical Thinking
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60',
    initials: 'SW'
  },
  '4': { // Emma Thompson - Chemistry
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60',
    initials: 'ET'
  },
  '5': { // Michael Brown - Physics
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60',
    initials: 'MB'
  },
  '6': { // Rachel Green - English Literature
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60',
    initials: 'RG'
  }
};