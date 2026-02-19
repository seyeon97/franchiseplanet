"use server";

import { headers } from "next/headers";
import { config } from "@/server/config";
import { getDb } from "@/server/db";
import { kakaoUsersTable } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function kakaoLogin(code: string): Promise<{
  nickname: string;
  email: string;
  profileImage: string;
}> {
  // 실제 접속한 host 기반으로 redirect_uri 동적 결정 (www 유무 대응)
  const headersList = await headers();
  const host = headersList.get("host") || "franchiseplanet.kr";
  const redirectUri = `https://${host}/login`;
  console.log("[카카오 로그인] redirect_uri:", redirectUri);

  // 1. 인증 코드로 액세스 토큰 받기
  const tokenRes = await fetch("https://kauth.kakao.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: config.KAKAO_REST_API_KEY,
      client_secret: config.KAKAO_CLIENT_SECRET,
      redirect_uri: redirectUri,
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

  // 사용자 정보 DB에 저장 (어드민에서 확인 가능)
  try {
    const db = await getDb();
    const kakaoId = String(userData.id || Date.now());
    const now = new Date().toISOString().split("T")[0];
    const existing = await db.select().from(kakaoUsersTable).where(eq(kakaoUsersTable.kakaoId, kakaoId));
    if (existing.length > 0) {
      await db.update(kakaoUsersTable).set({
        nickname: nickname || "카카오 사용자",
        profileImage: profileImage || null,
        email: userData.kakao_account?.email || null,
        lastVisit: now,
      }).where(eq(kakaoUsersTable.kakaoId, kakaoId));
    } else {
      await db.insert(kakaoUsersTable).values({
        kakaoId,
        nickname: nickname || "카카오 사용자",
        profileImage: profileImage || null,
        email: userData.kakao_account?.email || null,
        loginDate: now,
        lastVisit: now,
      });
    }
  } catch (err) {
    console.error("[카카오 로그인] 사용자 DB 저장 실패:", err);
  }

  return {
    nickname: nickname || "카카오 사용자",
    email: userData.kakao_account?.email || "",
    profileImage: profileImage || "",
  };
}
