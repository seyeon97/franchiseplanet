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

  console.log("[카카오 로그인] 토큰 응답:", JSON.stringify(tokenData));

  if (tokenData.error || !tokenData.access_token) {
    throw new Error(`토큰 발급 실패: ${tokenData.error} - ${tokenData.error_description}`);
  }

  // 2. 액세스 토큰으로 사용자 정보 가져오기
  const userRes = await fetch("https://kapi.kakao.com/v2/user/me", {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`,
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  });

  const userData = await userRes.json() as {
    id?: number;
    properties?: { nickname?: string; profile_image?: string };
    kakao_account?: {
      email?: string;
      profile?: { nickname?: string; profile_image_url?: string };
    };
  };

  console.log("[카카오 로그인] 사용자 데이터:", JSON.stringify(userData));

  // 닉네임은 properties 또는 kakao_account.profile 두 경로에서 올 수 있음
  const nickname =
    userData.kakao_account?.profile?.nickname ||
    userData.properties?.nickname ||
    null;

  const profileImage =
    userData.kakao_account?.profile?.profile_image_url ||
    userData.properties?.profile_image ||
    null;

  console.log("[카카오 로그인] 닉네임:", nickname, "/ 이메일:", userData.kakao_account?.email);

  return {
    nickname: nickname || "카카오 사용자",
    email: userData.kakao_account?.email || "",
    profileImage: profileImage || "",
  };
}
