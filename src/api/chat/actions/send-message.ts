"use server";

import { config } from "@/server/config";
import type { SendMessageRequest, ChatResponse } from "../types";
import { findAnswerInKnowledgeBase } from "../knowledge-base";

// 프랜차이즈 창업 전문 시스템 프롬프트
const SYSTEM_PROMPT = `당신은 프랜차이즈 창업 전문 컨설턴트입니다.
사용자의 프랜차이즈 창업 관련 질문에 대해 전문적이고 실용적인 조언을 제공합니다.

다음 주제에 대해 도움을 줄 수 있습니다:
- 브랜드 선택 및 비교
- 초기 투자금 및 비용 분석
- 상권 분석 및 입지 선정
- 수익성 분석 (상위/평균/하위 매장)
- 창업 절차 및 준비사항
- 프랜차이즈 계약 관련 조언
- 운영 노하우 및 마케팅

답변은 친절하고 이해하기 쉽게, 구체적인 예시와 함께 제공하세요.
답변은 한국어로 작성하며, 존댓말을 사용합니다.`;

// Groq API 호출
async function callGroqAPI(
  apiConfig: { url: string; key: string; model: string },
  message: string,
  history: Array<{ role: string; content: string }>
): Promise<string> {
  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...history.map((msg) => ({
      role: msg.role,
      content: msg.content,
    })),
    { role: "user", content: message },
  ];

  const response = await fetch(apiConfig.url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiConfig.key}`,
    },
    body: JSON.stringify({
      model: apiConfig.model,
      messages,
      temperature: 0.7,
      max_tokens: 1024,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error (${response.status}): ${errorText.substring(0, 200)}`);
  }

  const data = await response.json() as {
    choices?: Array<{
      message?: {
        content?: string;
      };
    }>;
  };
  return data.choices?.[0]?.message?.content || "응답을 생성할 수 없습니다.";
}

// Hugging Face API 호출
async function callHuggingFaceAPI(
  apiConfig: { url: string; key: string; model: string },
  message: string,
  history: Array<{ role: string; content: string }>
): Promise<string> {
  // 대화 히스토리를 텍스트로 변환
  let conversationText = `${SYSTEM_PROMPT}\n\n`;

  for (const msg of history) {
    conversationText += `${msg.role === "user" ? "사용자" : "어시스턴트"}: ${msg.content}\n\n`;
  }

  conversationText += `사용자: ${message}\n\n어시스턴트:`;

  const response = await fetch(apiConfig.url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inputs: conversationText,
      parameters: {
        max_new_tokens: 1024,
        temperature: 0.7,
        return_full_text: false,
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error (${response.status}): ${errorText.substring(0, 200)}`);
  }

  const data = await response.json() as
    | Array<{ generated_text?: string }>
    | { generated_text?: string };

  // Hugging Face는 배열 또는 객체를 반환할 수 있음
  if (Array.isArray(data)) {
    return data[0]?.generated_text || "응답을 생성할 수 없습니다.";
  }

  return data.generated_text || "응답을 생성할 수 없습니다.";
}

export async function sendMessage(
  request: SendMessageRequest
): Promise<ChatResponse> {
  const { message, history = [] } = request;

  if (!message) {
    throw new Error("메시지가 필요합니다");
  }

  // 1단계: 먼저 로컬 지식 베이스에서 답변 찾기
  console.log("[AI Chat] 로컬 지식 베이스에서 검색 중...");
  const localAnswer = findAnswerInKnowledgeBase(message);

  if (localAnswer) {
    console.log("[AI Chat] 로컬 지식 베이스에서 답변 발견 (외부 API 사용 안 함)");
    return { message: localAnswer };
  }

  // 2단계: 로컬에 답변이 없으면 외부 API 사용
  console.log("[AI Chat] 로컬 답변 없음, 외부 API 사용");

  // 모든 API를 순서대로 시도
  for (const apiConfig of config.AI_APIS) {
    try {
      console.log(`[AI Chat] ${apiConfig.name} API 시도 중...`);

      let aiMessage: string;

      if (apiConfig.name === "Groq") {
        aiMessage = await callGroqAPI(apiConfig, message, history);
      } else if (apiConfig.name === "Hugging Face") {
        aiMessage = await callHuggingFaceAPI(apiConfig, message, history);
      } else {
        continue; // 지원하지 않는 API는 스킵
      }

      console.log(`[AI Chat] ${apiConfig.name} API 성공`);
      return { message: aiMessage };

    } catch (error) {
      console.error(`[AI Chat] ${apiConfig.name} API 실패:`, error);
      // 다음 API로 계속 진행
      continue;
    }
  }

  // 모든 API가 실패한 경우 - 친절한 안내 메시지 반환
  console.log("[AI Chat] 모든 외부 API 실패, 안내 메시지 반환");

  const fallbackMessage = `죄송합니다. 현재 AI 서비스가 일시적으로 사용할 수 없습니다. 😔

하지만 다음 방법으로 도움을 받으실 수 있습니다:

📚 **자주 묻는 질문 확인**
아래 질문들을 클릭해보세요. 즉시 답변을 받으실 수 있습니다:
• "프랜차이즈 창업에 필요한 초기 비용은 얼마인가요?"
• "좋은 입지를 선정하는 방법을 알려주세요"

📞 **전문가 상담**
더 구체적인 상담이 필요하시다면, 오프라인 페이지에서 전문가 상담 프로그램을 이용해보세요.

💡 **TIP:**
어드민 페이지에서 전문가 상담 데이터를 추가하시면, AI 서비스 없이도 즉시 답변을 받을 수 있습니다!`;

  return { message: fallbackMessage };
}
