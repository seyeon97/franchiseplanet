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
  GEMINI_API_KEY: "AIzaSyDqNWHzIjNi6yEfqRCU4x8K3v8L9mJ5nXo", // 실제 API 키로 교체하세요
  GEMINI_API_URL: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
} as const;
