"use server";

import { config } from "@/server/config";

export async function kakaoLogin(code: string): Promise<{
  nickname: string;
  email: string;
  profileImage: string;
}> {
  // 1. 인증 코드로 액세스 토큰 받기
  const tokenRes = await fetch("https://kauth.kakao.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: config.KAKAO_REST_API_KEY,
      redirect_uri: config.KAKAO_REDIRECT_URI,
      code,
    }),
  });

  const tokenData = await tokenRes.json() as {
    error?: string;
    error_description?: string;
    access_token?: string;
  };

  if (tokenData.error || !tokenData.access_token) {
    throw new Error(tokenData.error_description || tokenData.error || "토큰 발급 실패");
  }

  // 2. 액세스 토큰으로 사용자 정보 가져오기
  const userRes = await fetch("https://kapi.kakao.com/v2/user/me", {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`,
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  });

  const userData = await userRes.json() as {
    kakao_account?: {
      email?: string;
      profile?: { nickname?: string; profile_image_url?: string };
    };
  };

  return {
    nickname: userData.kakao_account?.profile?.nickname || "카카오 사용자",
    email: userData.kakao_account?.email || "",
    profileImage: userData.kakao_account?.profile?.profile_image_url || "",
  };
}
