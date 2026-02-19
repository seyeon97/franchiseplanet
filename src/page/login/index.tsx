"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { kakaoConfig } from "@/lib/kakao-config";

declare global {
  interface Window {
    Kakao: {
      init: (appKey: string) => void;
      isInitialized: () => boolean;
      Auth: {
        authorize: (options: { redirectUri: string }) => void;
      };
    };
  }
}

interface KakaoUserInfo {
  id: number;
  kakao_account: {
    email?: string;
    profile?: {
      nickname: string;
      profile_image_url?: string;
    };
  };
}

export default function LoginView() {
  const router = useRouter();
  const [isKakaoReady, setIsKakaoReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const saveKakaoUserToAdmin = (userInfo: KakaoUserInfo) => {
    try {
      const existingUsers = localStorage.getItem("kakaoUsers");
      const users = existingUsers ? JSON.parse(existingUsers) : [];
      const existingUserIndex = users.findIndex((u: { kakaoId: string }) => u.kakaoId === String(userInfo.id));
      const now = new Date().toISOString().split("T")[0];
      const userRecord = {
        id: existingUserIndex >= 0 ? users[existingUserIndex].id : users.length + 1,
        kakaoId: String(userInfo.id),
        nickname: userInfo.kakao_account.profile?.nickname || "카카오 사용자",
        profileImage: userInfo.kakao_account.profile?.profile_image_url,
        email: userInfo.kakao_account.email,
        loginDate: existingUserIndex >= 0 ? users[existingUserIndex].loginDate : now,
        lastVisit: now,
      };
      if (existingUserIndex >= 0) {
        users[existingUserIndex] = userRecord;
      } else {
        users.push(userRecord);
      }
      localStorage.setItem("kakaoUsers", JSON.stringify(users));
    } catch (error) {
      console.error("사용자 정보 저장 실패:", error);
    }
  };

  const handleKakaoCallback = async () => {
    try {
      setIsLoading(true);
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      if (!code) return;

      const { kakaoLogin } = await import("@/api/kakao");
      const { nickname, email, profileImage } = await kakaoLogin(code);

      const userInfo: KakaoUserInfo = {
        id: Date.now(),
        kakao_account: {
          email: email || "",
          profile: {
            nickname: nickname || "카카오 사용자",
            profile_image_url: profileImage,
          },
        },
      };

      saveKakaoUserToAdmin(userInfo);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userName", nickname || "카카오 사용자");
      localStorage.setItem("userEmail", email || "");
      localStorage.setItem("userProfileImage", profileImage || "");

      window.history.replaceState({}, document.title, "/login");
      router.push("/more");
    } catch (error) {
      console.error("카카오 로그인 처리 실패:", error);
      setIsLoading(false);
      const msg = error instanceof Error ? error.message : String(error);
      alert(`로그인 오류: ${msg}`);
      window.history.replaceState({}, document.title, "/login");
    }
  };

  useEffect(() => {
    // URL에서 인증 코드 또는 에러 확인 (SDK 로드보다 먼저)
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const error = urlParams.get("error");
    const errorDescription = urlParams.get("error_description");

    if (error) {
      alert(`카카오 로그인 실패: ${errorDescription || error}`);
      window.history.replaceState({}, document.title, "/login");
      return;
    }

    if (code) {
      handleKakaoCallback();
      return;
    }

    // 이미 로그인된 경우 /more로 리다이렉트
    const alreadyLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (alreadyLoggedIn) {
      router.push("/more");
      return;
    }

    // 카카오 SDK 로드
    const loadKakaoScript = () => {
      return new Promise<void>((resolve, reject) => {
        if (window.Kakao) { resolve(); return; }
        const script = document.createElement("script");
        script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js";
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Script load failed"));
        document.body.appendChild(script);
      });
    };

    loadKakaoScript()
      .then(() => {
        const check = setInterval(() => {
          if (window.Kakao) {
            if (!window.Kakao.isInitialized()) {
              window.Kakao.init(kakaoConfig.javascriptKey);
            }
            setIsKakaoReady(true);
            clearInterval(check);
          }
        }, 100);
      })
      .catch(() => {});
  }, [router]);

  const handleKakaoLogin = () => {
    if (!isKakaoReady) return;
    try {
      window.Kakao.Auth.authorize({ redirectUri: kakaoConfig.redirectUri });
    } catch (error) {
      console.error("카카오 로그인 오류:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-yellow-400 flex items-center justify-center animate-pulse">
            <span className="text-2xl">💬</span>
          </div>
          <p className="text-gray-600 font-medium">카카오 로그인 처리 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12"
      style={{ background: "linear-gradient(135deg, #FFF9E6 0%, #FFFFFF 50%, #FFF0F5 100%)" }}>
      <div className="w-full max-w-sm">

        {/* 로고 영역 */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 mx-auto mb-4 rounded-3xl flex items-center justify-center shadow-lg"
            style={{ background: "linear-gradient(135deg, #FF6BA9 0%, #A78BFA 100%)" }}>
            <span className="text-3xl font-black text-white">프플</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 mb-1">프차플래닛</h1>
          <p className="text-sm text-gray-500">프랜차이즈의 모든 것</p>
        </div>

        {/* 카카오 로그인 버튼 */}
        <button
          onClick={handleKakaoLogin}
          disabled={!isKakaoReady}
          className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl font-bold text-base transition-all shadow-md hover:shadow-lg active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ backgroundColor: "#FEE500", color: "#191919" }}
        >
          {!isKakaoReady ? (
            <>
              <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
              잠시만 기다려주세요...
            </>
          ) : (
            <>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 3C7.03 3 3 6.36 3 10.5c0 2.61 1.6 4.9 4.02 6.28L6 21l4.45-2.95c.5.07 1.02.1 1.55.1 4.97 0 9-3.36 9-7.5S16.97 3 12 3z" fill="#191919"/>
              </svg>
              카카오로 시작하기
            </>
          )}
        </button>

        {/* 안내 문구 */}
        <p className="text-center text-xs text-gray-400 mt-6 leading-relaxed">
          로그인 시 서비스 이용약관 및<br />개인정보처리방침에 동의하게 됩니다.
        </p>
      </div>
    </div>
  );
}
