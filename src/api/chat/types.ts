export interface ChatAPI {
  /** 채팅 메시지 전송 */
  sendMessage: (request: SendMessageRequest) => Promise<ChatResponse>;
}

export type Message = {
  role: "user" | "assistant";
  content: string;
};

export type SendMessageRequest = {
  message: string;
  history?: Message[];
};

export type ChatResponse = {
  message: string;
};
