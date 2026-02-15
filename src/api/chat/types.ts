export interface ChatAPI {
  /** 채팅 메시지 전송 */
  sendMessage: (request: SendMessageRequest) => Promise<ChatResponse>;
}

export type Message = {
  role: "user" | "assistant";
  content: string;
};

export type KnowledgeItem = {
  keywords: string[];
  question: string;
  answer: string;
  category: string;
};

export type SendMessageRequest = {
  message: string;
  history?: Message[];
  knowledgeBase?: KnowledgeItem[]; // 클라이언트에서 전달하는 지식 베이스
};

export type ChatResponse = {
  message: string;
};
