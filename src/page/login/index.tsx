"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { kakaoConfig } from "@/lib/kakao-config";

// Kakao SDK 타입 정의
declare global {
  interface Window {
    Kakao: {
      init: (appKey: string) => void;
      isInitialized: () => boolean;
      Auth: {
        authorize: (options: {
          redirectUri: string;
          state?: string;
        }) => void;
      };
      API: {
        request: (options: {
          url: string;
          success: (response: KakaoUserInfo) => void;
          fail: (error: Error) => void;
        }) => void;
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

  const saveKakaoUserToAdmin = (userInfo: KakaoUserInfo) => {
    try {
      // 기존 사용자 목록 불러오기
      const existingUsers = localStorage.getItem("kakaoUsers");
      const users = existingUsers ? JSON.parse(existingUsers) : [];

      // 이미 등록된 사용자인지 확인
      const existingUserIndex = users.findIndex((u: { kakaoId: string }) => u.kakaoId === String(userInfo.id));

      const now = new Date().toISOString().split('T')[0];
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
        // 기존 사용자 업데이트 (최근 방문 시간만)
        users[existingUserIndex] = userRecord;
      } else {
        // 새 사용자 추가
        users.push(userRecord);
      }

      localStorage.setItem("kakaoUsers", JSON.stringify(users));
    } catch (error) {
      console.error("사용자 정보 저장 실패:", error);
    }
  };

  const handleKakaoCallback = async () => {
    // 실제 환경에서는 서버로 인증 코드를 보내 액세스 토큰을 받아야 합니다
    // 여기서는 간단히 로그인 상태만 저장합니다
    try {
      // 카카오 사용자 정보 가져오기 (실제로는 서버에서 처리해야 함)
      // 임시로 더미 데이터 생성
      const dummyUserInfo: KakaoUserInfo = {
        id: Math.floor(Math.random() * 1000000),
        kakao_account: {
          email: "kakao@user.com",
          profile: {
            nickname: "카카오 사용자",
            profile_image_url: undefined,
          },
        },
      };

      // 사용자 정보를 어드민 페이지용으로 저장
      saveKakaoUserToAdmin(dummyUserInfo);

      // 임시로 로그인 처리
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", dummyUserInfo.kakao_account.email || "kakao@user.com");

      // URL 정리하고 마이페이지로 이동
      window.history.replaceState({}, document.title, "/login");
      router.push("/more");
    } catch (error) {
      console.error("카카오 로그인 처리 실패:", error);
      alert("로그인 처리 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    // 카카오 SDK 스크립트 동적 로드
    const loadKakaoScript = () => {
      return new Promise<void>((resolve, reject) => {
        // 이미 로드된 경우
        if (window.Kakao) {
          console.log("카카오 SDK 이미 존재함");
          resolve();
          return;
        }

        // 스크립트 생성
        const script = document.createElement("script");
        script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js";
        script.async = true;

        script.onload = () => {
          console.log("카카오 SDK 스크립트 로드 성공!");
          resolve();
        };

        script.onerror = () => {
          console.error("카카오 SDK 스크립트 로드 실패!");
          reject(new Error("Script load failed"));
        };

        document.body.appendChild(script);
      });
    };

    // Kakao SDK 초기화
    const initKakao = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        console.log("카카오 SDK 초기화 중...");
        window.Kakao.init(kakaoConfig.javascriptKey);
        console.log("카카오 SDK 초기화 완료!");
        setIsKakaoReady(true);
      } else if (window.Kakao && window.Kakao.isInitialized()) {
        console.log("카카오 SDK 이미 초기화됨");
        setIsKakaoReady(true);
      }
    };

    // SDK 로드 및 초기화
    loadKakaoScript()
      .then(() => {
        // 스크립트 로드 후 Kakao 객체가 생성될 때까지 대기
        let attempts = 0;
        const maxAttempts = 50;
        const checkKakao = setInterval(() => {
          attempts++;
          if (window.Kakao) {
            console.log("Kakao 객체 사용 가능!");
            initKakao();
            clearInterval(checkKakao);
          } else if (attempts >= maxAttempts) {
            console.error("Kakao 객체 생성 타임아웃");
            clearInterval(checkKakao);
          }
        }, 100);
      })
      .catch((error) => {
        console.error("카카오 SDK 로드 중 에러:", error);
      });

    // 이미 로그인된 경우 /more로 리다이렉트
    const alreadyLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (alreadyLoggedIn) {
      router.push("/more");
      return;
    }

    // URL에서 인증 코드 확인
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (code) {
      handleKakaoCallback();
    }
  }, [router]);

  const handleKakaoLogin = () => {
    if (!isKakaoReady) {
      alert("카카오 SDK가 로드되지 않았습니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    if (kakaoConfig.javascriptKey === "YOUR_KAKAO_JAVASCRIPT_KEY_HERE") {
      alert(
        "카카오 JavaScript 키를 설정해주세요.\n\n1. https://developers.kakao.com/console/app 접속\n2. 애플리케이션 추가\n3. JavaScript 키 복사\n4. src/lib/kakao-config.ts 파일에 키 입력\n5. 플랫폼 설정에서 Web 플랫폼 추가 (http://localhost:3000)\n6. 카카오 로그인 활성화 및 Redirect URI 설정 (http://localhost:3000/login)"
      );
      return;
    }

    try {
      // 카카오 로그인 페이지로 이동
      window.Kakao.Auth.authorize({
        redirectUri: kakaoConfig.redirectUri,
      });
    } catch (error) {
      console.error("카카오 로그인 오류:", error);
      alert("카카오 로그인 중 오류가 발생했습니다.");
    }
  };

  // 임시 로그인 (테스트용)
  const handleTempLogin = () => {
    // 테스트용 사용자 정보 생성
    const testUserInfo: KakaoUserInfo = {
      id: Math.floor(Math.random() * 1000000),
      kakao_account: {
        email: "test@user.com",
        profile: {
          nickname: "테스트 사용자",
          profile_image_url: undefined,
        },
      },
    };

    // 사용자 정보를 어드민 페이지용으로 저장
    saveKakaoUserToAdmin(testUserInfo);

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", "test@user.com");
    router.push("/more");
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
        <div className="max-w-md w-full">
        {/* 로고 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">
            프차플래닛
          </h1>
          <p className="text-base md:text-lg text-gray-600 font-medium">
            프랜차이즈의 모든 것
          </p>
        </div>

        {/* 로그인 폼 */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-200">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-3 text-center">
            로그인
          </h2>
          <p className="text-sm md:text-base text-gray-600 font-medium mb-8 text-center">
            카카오톡으로 간편하게 시작하세요
          </p>

          {/* 카카오톡 로그인 */}
          <button
            onClick={handleKakaoLogin}
            disabled={!isKakaoReady}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-4 px-4 rounded-2xl transition-all text-lg flex items-center justify-center gap-3 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="text-2xl">💬</span>
            카카오톡으로 시작하기
          </button>

          {/* 디버그 정보 (개발용) */}
          {!isKakaoReady && (
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-2xl p-4">
              <p className="text-xs text-blue-800 text-center">
                🔄 카카오 SDK 로딩 중...
              </p>
            </div>
          )}

          {/* 임시 로그인 (개발용) */}
          <button
            onClick={handleTempLogin}
            className="w-full mt-4 bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-4 px-4 rounded-2xl transition-all text-lg flex items-center justify-center gap-3"
          >
            <span className="text-2xl">🔓</span>
            임시 로그인 (테스트)
          </button>

          {/* 안내 문구 */}
          <div className="mt-6 bg-gray-50 rounded-2xl p-4">
            <p className="text-xs md:text-sm text-gray-600 text-center leading-relaxed">
              카카오톡 계정으로 간편하게 로그인하고
              <br />
              프차플래닛의 모든 서비스를 이용하세요
            </p>
          </div>

          {/* 개발자 안내 */}
          <div className="mt-4 bg-orange-50 border border-orange-200 rounded-2xl p-4">
            <p className="text-xs text-orange-800 text-center leading-relaxed">
              ⚠️ 카카오 로그인이 &quot;연결 거부&quot; 에러가 발생하면
              <br />
              카카오 개발자 콘솔에서:
              <br />
              1. 제품 설정 → 카카오 로그인 → <strong>활성화 ON</strong>
              <br />
              2. 앱 설정 → 플랫폼 → <strong>Web 플랫폼 등록</strong>
              <br />
              3. 설정 후 <strong>저장 버튼 클릭</strong> 필수!
            </p>
          </div>

          {/* 개발자 안내 */}
          {kakaoConfig.javascriptKey === "YOUR_KAKAO_JAVASCRIPT_KEY_HERE" && (
            <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
              <p className="text-xs text-yellow-800 text-center leading-relaxed">
                ⚠️ 개발자 안내: 카카오 JavaScript 키를 설정해주세요
                <br />
                <span className="font-mono text-[10px]">
                  src/lib/kakao-config.ts
                </span>
              </p>
            </div>
          )}
        </div>

        {/* 뒤로가기 */}
        <button
          onClick={() => router.back()}
          className="mt-6 w-full text-gray-600 font-bold py-3 hover:bg-gray-100 rounded-xl transition-colors"
        >
          뒤로가기
        </button>
      </div>
    </div>
  );
}
