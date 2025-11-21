export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  students: number;
  instructor: string;
  thumbnail: string;
  category: string;
  progress?: number;
  isBookmarked?: boolean;
}

export interface Video {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  isCompleted: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  message: string;
  timestamp: Date;
}   