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
  // ⚠️ 여러 AI API 설정 - 할당량 끝나면 자동으로 다음 API 사용
  //
  // 🎯 전략: 여러 계정으로 무료 API 키를 발급받아 설정하면 끊김 없이 사용 가능!
  //
  // 📝 발급 방법:
  // 1. Google Gemini (무료, 하루 1,500회): https://makersuite.google.com/app/apikey
  // 2. Groq (무료, 분당 30회): https://console.groq.com/keys
  // 3. DeepSeek (무료, 매우 관대): https://platform.deepseek.com/api_keys
  //
  // 💡 팁: 여러 Gmail 계정으로 각각 발급받으면 할당량 3배!
  AI_APIS: [
    // === Gemini API (가장 추천, 무료 할당량 넉넉) ===
    {
      name: "Gemini-1",
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent",
      key: "YOUR_GEMINI_KEY_1", // Gmail 계정 1
      model: "gemini-2.0-flash-exp",
    },
    {
      name: "Gemini-2",
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent",
      key: "YOUR_GEMINI_KEY_2", // Gmail 계정 2 (선택)
      model: "gemini-2.0-flash-exp",
    },
    {
      name: "Gemini-3",
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent",
      key: "YOUR_GEMINI_KEY_3", // Gmail 계정 3 (선택)
      model: "gemini-2.0-flash-exp",
    },

    // === Groq API (빠름, 무료) ===
    {
      name: "Groq-1",
      url: "https://api.groq.com/openai/v1/chat/completions",
      key: "YOUR_GROQ_KEY_1",
      model: "llama-3.3-70b-versatile",
    },
    {
      name: "Groq-2",
      url: "https://api.groq.com/openai/v1/chat/completions",
      key: "YOUR_GROQ_KEY_2", // 계정 2 (선택)
      model: "llama-3.3-70b-versatile",
    },

    // === DeepSeek API (저렴, 거의 무료) ===
    {
      name: "DeepSeek-1",
      url: "https://api.deepseek.com/v1/chat/completions",
      key: "YOUR_DEEPSEEK_KEY_1",
      model: "deepseek-chat",
    },
  ],
};
