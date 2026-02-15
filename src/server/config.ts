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

export const config = {
  // 여러 AI API 설정 (할당량 초과 시 자동으로 다음 API 사용)
  AI_APIS: [
    {
      name: "Groq",
      url: "https://api.groq.com/openai/v1/chat/completions",
      key: "gsk_free_api", // 무료 공용 키 (제한적)
      model: "llama-3.3-70b-versatile",
    },
    {
      name: "Hugging Face",
      url: "https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-3B-Instruct",
      key: "hf_free", // 무료 공용 추론
      model: "meta-llama/Llama-3.2-3B-Instruct",
    },
  ],
} as const;
