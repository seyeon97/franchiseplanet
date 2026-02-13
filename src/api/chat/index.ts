import type { ChatAPI } from "./types";
export * from "./types";

import { sendMessage } from "./actions/send-message";

export const chat: ChatAPI = {
  sendMessage,
};
