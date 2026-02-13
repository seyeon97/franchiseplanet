"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginView() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // 로그인 처리 (임시로 localStorage 사용)
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", email);

    // 이전 페이지로 돌아가거나 홈으로
    router.back();
  };

  const handleSocialLogin = (provider: string) => {
    // 소셜 로그인 처리
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
          <h2 className="text-2xl font-black text-gray-900 mb-6">로그인</h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                이메일
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 outline-none transition-colors text-base"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                비밀번호
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 outline-none transition-colors text-base"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-colors text-base"
            >
              로그인
            </button>
          </form>

          {/* 구분선 */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">
                또는
              </span>
            </div>
          </div>

          {/* 소셜 로그인 */}
          <div className="space-y-3">
            <button
              onClick={() => handleSocialLogin("kakao")}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-4 rounded-xl transition-colors text-base flex items-center justify-center gap-2"
            >
              <span>💬</span>
              카카오로 시작하기
            </button>

            <button
              onClick={() => handleSocialLogin("naver")}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-xl transition-colors text-base flex items-center justify-center gap-2"
            >
              <span>N</span>
              네이버로 시작하기
            </button>

            <button
              onClick={() => handleSocialLogin("google")}
              className="w-full bg-white hover:bg-gray-50 text-gray-900 font-bold py-3 px-4 rounded-xl transition-colors text-base border-2 border-gray-200 flex items-center justify-center gap-2"
            >
              <span>G</span>
              구글로 시작하기
            </button>
          </div>

          {/* 회원가입 */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              아직 계정이 없으신가요?{" "}
              <button
                onClick={() => router.push("/signup")}
                className="text-blue-600 font-bold hover:underline"
              >
                회원가입
              </button>
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
