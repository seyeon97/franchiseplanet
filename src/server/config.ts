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
  GEMINI_API_KEY: "AIzaSyAgb7j4uTtJYceogNXDDNcuTYH3snI0y9I",
  GEMINI_API_URL: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent",
} as const;
