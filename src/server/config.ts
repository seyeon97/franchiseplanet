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
  // 여러 AI API 설정 (할당량 초과 시 자동으로 다음 API 사용)
  AI_APIS: [
    {
      name: "OpenRouter",
      url: "https://openrouter.ai/api/v1/chat/completions",
      key: "sk-or-v1-0000", // 무료 모델은 키 없이도 작동
      model: "meta-llama/llama-3.2-3b-instruct:free", // 완전 무료 모델
    },
    {
      name: "Together AI",
      url: "https://api.together.xyz/v1/chat/completions",
      key: "free-trial", // 무료 체험
      model: "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
    },
  ],
};
