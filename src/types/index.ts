export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export type View = 'home' | 'chat' | 'compare' | 'scenarios';
