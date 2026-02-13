"use server";

import { config } from "@/server/config";
import type { SendMessageRequest, ChatResponse } from "../types";

export async function sendMessage(
  request: SendMessageRequest
): Promise<ChatResponse> {
  const { message, history = [] } = request;

  if (!message) {
    throw new Error("메시지가 필요합니다");
  }

  // API 키 확인
  if (!config.GEMINI_API_KEY) {
    console.error("Gemini API 키가 설정되지 않았습니다.");
    throw new Error("AI 서비스 설정이 필요합니다. 관리자에게 문의하세요.");
  }

  // 프랜차이즈 창업 전문 시스템 프롬프트
  const systemPrompt = `당신은 프랜차이즈 창업 전문 컨설턴트입니다.
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

  // 대화 히스토리를 Gemini API 형식으로 변환
  const contents = [
    {
      role: "user",
      parts: [{ text: systemPrompt }],
    },
    {
      role: "model",
      parts: [
        {
          text: "안녕하세요! 프랜차이즈 창업 전문 컨설턴트입니다. 프랜차이즈 창업에 대해 궁금하신 점을 편하게 물어보세요.",
        },
      ],
    },
    ...history.map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    })),
    {
      role: "user",
      parts: [{ text: message }],
    },
  ];

  const response = await fetch(
    `${config.GEMINI_API_URL}?key=${config.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Gemini API Error Response:", errorText);
    console.error("Gemini API Status:", response.status);
    throw new Error(`AI 응답 생성 실패 (${response.status}): ${errorText.substring(0, 200)}`);
  }

  const data = (await response.json()) as {
    candidates?: Array<{
      content?: {
        parts?: Array<{ text?: string }>;
      };
    }>;
  };

  const aiMessage =
    data.candidates?.[0]?.content?.parts?.[0]?.text ||
    "죄송합니다. 응답을 생성할 수 없습니다.";

  return { message: aiMessage };
}
