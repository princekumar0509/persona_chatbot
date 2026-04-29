export type MentorType = "anshuman" | "abhimanyu" | "kshitij";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  mentor?: MentorType;
}

export interface ChatContextType {
  messages: Message[];
  activeMentor: MentorType;
  isLoading: boolean;
  error: string | null;
  sendMessage: (message: string) => Promise<void>;
  setActiveMentor: (mentor: MentorType) => void;
  clearMessages: () => void;
}

export interface MentorConfig {
  id: MentorType;
  name: string;
  title: string;
  systemPrompt: string;
  suggestionQuestions: string[];
}

export interface ChatApiSuccess {
  success: true;
  response: string;
  mentor: MentorType;
  timestamp: string;
}

export interface ChatApiError {
  success: false;
  error: string;
  errorCode?: string;
}

export type ChatApiResponse = ChatApiSuccess | ChatApiError;
