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
  history: Array<{ role: string; content: string }>,
  systemPrompt: string
): Promise<string> {
  const messages = [
    { role: "system", content: systemPrompt },
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

// OpenRouter API 호출 (OpenAI 호환)
async function callOpenRouterAPI(
  apiConfig: { url: string; key: string; model: string },
  message: string,
  history: Array<{ role: string; content: string }>,
  systemPrompt: string
): Promise<string> {
  const messages = [
    { role: "system", content: systemPrompt },
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
      "HTTP-Referer": "https://franchise-consultant.com",
      "X-Title": "Franchise Consultant",
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

// Gemini API 호출
async function callGeminiAPI(
  apiConfig: { url: string; key: string; model: string },
  message: string,
  history: Array<{ role: string; content: string }>,
  systemPrompt: string
): Promise<string> {
  // Gemini는 시스템 프롬프트와 대화를 하나의 텍스트로 변환
  let prompt = `${systemPrompt}\n\n`;

  for (const msg of history) {
    prompt += `${msg.role === "user" ? "사용자" : "어시스턴트"}: ${msg.content}\n\n`;
  }

  prompt += `사용자: ${message}\n\n어시스턴트:`;

  const response = await fetch(`${apiConfig.url}?key=${apiConfig.key}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: prompt
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
      }
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error (${response.status}): ${errorText.substring(0, 200)}`);
  }

  const data = await response.json() as {
    candidates?: Array<{
      content?: {
        parts?: Array<{
          text?: string;
        }>;
      };
    }>;
  };

  return data.candidates?.[0]?.content?.parts?.[0]?.text || "응답을 생성할 수 없습니다.";
}

export async function sendMessage(
  request: SendMessageRequest
): Promise<ChatResponse> {
  const { message, history = [], knowledgeBase: customKnowledge } = request;

  if (!message) {
    throw new Error("메시지가 필요합니다");
  }

  // 1단계: 지식 베이스에서 관련 정보 찾기
  console.log("[AI Chat] 지식 베이스에서 관련 정보 검색 중...");

  const knowledgeData = customKnowledge || [];
  console.log(`[AI Chat] 지식 베이스: ${knowledgeData.length}개 항목`);

  // 질문 정규화
  const normalizedQuestion = message.toLowerCase().replace(/\s/g, "");
  console.log(`[AI Chat] 질문: "${message}"`);

  // 관련 있는 지식 베이스 항목들 찾기 (키워드 매칭)
  const relevantKnowledge = knowledgeData.filter((item) => {
    const hasKeyword = item.keywords.some((keyword) =>
      normalizedQuestion.includes(keyword.toLowerCase().replace(/\s/g, ""))
    );
    return hasKeyword;
  });

  console.log(`[AI Chat] 관련 지식 ${relevantKnowledge.length}개 발견`);

  // 2단계: AI에게 지식 베이스를 컨텍스트로 제공하여 답변 생성
  let enhancedPrompt = SYSTEM_PROMPT;

  if (relevantKnowledge.length > 0) {
    console.log("[AI Chat] 지식 베이스를 AI 컨텍스트로 활용");
    enhancedPrompt += "\n\n=== 📚 전문가 지식 베이스 (학습 자료) ===\n";
    enhancedPrompt += "아래는 이 분야 전문가들의 실제 상담 내용입니다. 이 내용을 학습하여 활용하세요.\n\n";

    relevantKnowledge.forEach((item, index) => {
      enhancedPrompt += `[전문가 상담 ${index + 1}] 주제: ${item.category}\n`;
      enhancedPrompt += `질문: ${item.question}\n`;
      enhancedPrompt += `전문가 답변:\n${item.answer}\n\n`;
    });

    enhancedPrompt += "=== ⚠️ 중요: 답변 작성 방식 ===\n";
    enhancedPrompt += "위 전문가 답변의 내용을 **절대 그대로 복사하지 마세요**.\n";
    enhancedPrompt += "당신은 실제 사람처럼 자연스럽게 대화해야 합니다:\n\n";
    enhancedPrompt += "1. 🗣️ 사람처럼 자연스럽게:\n";
    enhancedPrompt += "   - 전문가 답변을 이해하고 당신의 말로 재구성하세요\n";
    enhancedPrompt += "   - 대화하듯이 친근하고 편안한 톤으로 작성하세요\n";
    enhancedPrompt += "   - '~습니다', '~됩니다' 같은 딱딱한 표현 대신 '~해요', '~되요' 사용\n\n";
    enhancedPrompt += "2. 💬 대화형 답변:\n";
    enhancedPrompt += "   - 사용자의 질문에 공감하는 짧은 인사로 시작 (예: '좋은 질문이에요!', '궁금하셨군요!')\n";
    enhancedPrompt += "   - 핵심 정보를 간결하게 전달\n";
    enhancedPrompt += "   - 필요하면 추가 질문을 유도하는 멘트 추가\n\n";
    enhancedPrompt += "3. 📝 내용 재구성:\n";
    enhancedPrompt += "   - 전문가 답변이 길면 핵심만 뽑아서 요약\n";
    enhancedPrompt += "   - 사용자의 구체적인 질문에 맞춰 관련 부분만 강조\n";
    enhancedPrompt += "   - 불필요한 세부사항은 생략\n\n";
    enhancedPrompt += "4. 😊 감정 표현:\n";
    enhancedPrompt += "   - 이모지는 1-2개 정도만 적절히 사용\n";
    enhancedPrompt += "   - 친근하지만 신뢰감 있는 톤 유지\n";
    enhancedPrompt += "   - 전문가답지만 딱딱하지 않게\n\n";
    enhancedPrompt += "예시:\n";
    enhancedPrompt += "❌ 나쁜 예: [전문가 답변을 그대로 복사]\n";
    enhancedPrompt += "✅ 좋은 예: '메가커피 창업 고려하시는군요! 😊 초기 투자금은 보통 5천만원 정도 필요해요. 가맹비, 인테리어, 설비비 등이 주요 항목이죠. 혹시 특정 지역을 염두에 두고 계신가요? 지역마다 조금씩 차이가 있을 수 있거든요!'\n";
  }

  // 3단계: AI API를 통해 답변 생성
  console.log("[AI Chat] AI API 호출 (지식 베이스 참고하여 자연스럽게 답변)");

  // 모든 API를 순서대로 시도
  for (const apiConfig of config.AI_APIS) {
    try {
      console.log(`[AI Chat] ${apiConfig.name} API 시도 중...`);

      let aiMessage: string;

      if (apiConfig.name === "Gemini") {
        aiMessage = await callGeminiAPI(apiConfig, message, history, enhancedPrompt);
      } else if (apiConfig.name === "OpenRouter") {
        aiMessage = await callOpenRouterAPI(apiConfig, message, history, enhancedPrompt);
      } else if (apiConfig.name === "Groq") {
        aiMessage = await callGroqAPI(apiConfig, message, history, enhancedPrompt);
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
어드민 페이지에서 전문가 상담 데이터를 추가하시면, 즉시 답변을 받을 수 있습니다!`;

  return { message: fallbackMessage };
}
