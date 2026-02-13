"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginView() {
  const router = useRouter();

  const handleSocialLogin = (provider: string) => {
    // 카카오톡 로그인 처리
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", `user@${provider}.com`);
    router.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        {/* 로고 */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🌍</div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
            프차플래닛
          </h1>
          <p className="text-base md:text-lg text-blue-100 font-medium">
            프랜차이즈의 모든 것
          </p>
        </div>

        {/* 로그인 폼 */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-3 text-center">
            로그인
          </h2>
          <p className="text-sm md:text-base text-gray-600 font-medium mb-8 text-center">
            카카오톡으로 간편하게 시작하세요
          </p>

          {/* 카카오톡 로그인 */}
          <button
            onClick={() => handleSocialLogin("kakao")}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-4 px-4 rounded-2xl transition-all text-lg flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
          >
            <span className="text-2xl">💬</span>
            카카오톡으로 시작하기
          </button>

          {/* 안내 문구 */}
          <div className="mt-6 bg-gray-50 rounded-2xl p-4">
            <p className="text-xs md:text-sm text-gray-600 text-center leading-relaxed">
              카카오톡 계정으로 간편하게 로그인하고
              <br />
              프차플래닛의 모든 서비스를 이용하세요
            </p>
          </div>
        </div>

        {/* 뒤로가기 */}
        <button
          onClick={() => router.back()}
          className="mt-6 w-full text-white font-bold py-3 hover:bg-white/10 rounded-xl transition-colors"
        >
          뒤로가기
        </button>
      </div>
    </div>
  );
}
