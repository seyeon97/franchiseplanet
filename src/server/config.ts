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
  // Gemini API 설정
  // https://aistudio.google.com/app/apikey 에서 API 키를 발급받으세요
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || "YOUR_GEMINI_API_KEY_HERE",
  GEMINI_API_URL: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
} as const;
