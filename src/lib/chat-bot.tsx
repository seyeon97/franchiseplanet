"use client";

import { useState, useRef, useEffect } from "react";
import { chat } from "@/api/chat";
import type { Message } from "@/api/chat";

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "안녕하세요! 프랜차이즈 창업 전문 컨설턴트입니다. 궁금하신 점을 편하게 물어보세요!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await chat.sendMessage({
        message: userMessage,
        history: messages,
      });

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response.message },
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "죄송합니다. 일시적인 오류가 발생했습니다. 다시 시도해주세요.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* 헤더 */}
      <div className="px-6 pt-4 pb-3 bg-white shadow-sm flex-shrink-0">
        <h1
          className="text-2xl font-extrabold mb-1 leading-tight"
          style={{
            background: "linear-gradient(90deg, #3182F6 0%, #00C896 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          전문가 상담
        </h1>
        <p className="text-sm text-gray-600 font-medium">
          프랜차이즈 창업 전문가가 답변해드려요
        </p>
      </div>

      {/* 메시지 영역 */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-28">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {message.role === "user" ? (
              <div className="relative max-w-[80%]">
                <div className="rounded-2xl p-[2px] bg-gradient-to-r from-[#3182F6] to-[#00C896]">
                  <div className="bg-white rounded-2xl px-4 py-3">
                    <p className="text-base leading-relaxed whitespace-pre-wrap text-gray-900">
                      {message.content}
                    </p>
                  </div>
                </div>
                {/* 오른쪽 꼬리 */}
                <div className="absolute -right-2 bottom-3 w-4 h-4 bg-gradient-to-br from-[#00C896] to-[#00C896] transform rotate-45 rounded-br-md"></div>
                <div className="absolute -right-[6px] bottom-[14px] w-3 h-3 bg-white transform rotate-45 rounded-br-sm"></div>
              </div>
            ) : (
              <div className="relative max-w-[80%]">
                <div className="rounded-2xl px-4 py-3 bg-white text-gray-900 shadow-sm">
                  <p className="text-base leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </p>
                </div>
                {/* 왼쪽 꼬리 */}
                <div className="absolute -left-2 bottom-3 w-4 h-4 bg-white transform rotate-45 rounded-bl-md shadow-sm"></div>
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-white shadow-sm">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* 입력 영역 */}
      <div className="px-4 py-3 pb-24 bg-white border-t border-gray-200 flex-shrink-0">
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="궁금한 점을 물어보세요..."
              disabled={isLoading}
              className="w-full bg-gray-50 rounded-full px-5 py-3.5 pr-12 text-base font-medium text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-gradient-to-r from-[#3182F6] to-[#00C896] flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
