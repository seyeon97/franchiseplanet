import "server-only";

/**
 * Server-side configuration
 *
 * Store sensitive values here (API keys, secrets, etc.)
 * This file is protected by 'server-only' - it cannot be imported in client components.
 *
 * Usage:
 * import { config } from '@/server/config';
 * const apiKey = config.SOME_API_KEY;
 */

type AIAPIConfig = {
  name: string;
  url: string;
  key: string;
  model: string;
};

export const config: {
  AI_APIS: AIAPIConfig[];
} = {
  // 여러 AI API 설정
  // TODO: 아래 API 키를 실제 키로 교체하세요
  // Gemini: https://makersuite.google.com/app/apikey
  // OpenRouter: https://openrouter.ai/keys
  AI_APIS: [
    {
      name: "Gemini",
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent",
      key: "YOUR_GEMINI_API_KEY_HERE", // 무료 Gemini API 키 필요
      model: "gemini-2.0-flash-exp",
    },
  ],
};
