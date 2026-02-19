"use server";

import { getDb } from "@/server/db";
import { kakaoUsersTable } from "@/server/db/schema";

export async function getKakaoUsers() {
  const db = await getDb();
  const rows = await db.select().from(kakaoUsersTable).orderBy(kakaoUsersTable.lastVisit);
  return rows.map((row) => ({
    id: row.id,
    kakaoId: row.kakaoId,
    nickname: row.nickname,
    profileImage: row.profileImage ?? undefined,
    email: row.email ?? undefined,
    loginDate: row.loginDate,
    lastVisit: row.lastVisit,
  }));
}
