"use server";

import { getDb } from "@/server/db";
import { columnsTable } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import type { Column, ColumnInput } from "../types";

const DEFAULT_COLUMNS: ColumnInput[] = [
  {
    title: "2024년 프랜차이즈 창업 트렌드 분석",
    category: "시장분석",
    date: "2024.02.13",
    thumbnail: "📊",
    summary: "최근 프랜차이즈 시장의 주요 트렌드와 성공 전략",
    bgGradient: "linear-gradient(135deg, #60A5FA 0%, #A78BFA 100%)",
    isNew: true,
    sortOrder: 1,
    content: `# 2024년 프랜차이즈 시장 전망

## 주요 트렌드

1. **무인 자동화 시스템 도입**
   - 인건비 절감 효과 30% 이상
   - 24시간 운영 가능한 비즈니스 모델

2. **로컬 브랜드의 성장**
   - 대형 브랜드 대비 20% 낮은 초기 비용
   - 지역 특화 메뉴로 차별화

3. **친환경 트렌드**
   - ESG 경영 중요성 증가
   - 소비자 선호도 상승

## 성공 전략

✅ 차별화된 컨셉 개발
✅ 디지털 마케팅 활용
✅ 고객 경험 최적화

**결론:** 2024년은 기술과 친환경이 키워드입니다.`,
  },
  {
    title: "메가커피 가맹점, 성공하는 입지 조건은?",
    category: "브랜드분석",
    date: "2024.02.10",
    thumbnail: "☕",
    summary: "메가커피 상위 10% 매장의 공통점",
    bgGradient: "linear-gradient(135deg, #FF6BA9 0%, #FFB6D9 100%)",
    isNew: true,
    sortOrder: 2,
    content: `# 메가커피 성공 입지 분석

## 상위 10% 매장의 공통점

### 📍 위치 조건
- 역세권 도보 5분 이내
- 대학가 또는 오피스 밀집 지역
- 주차장 확보 (최소 3대 이상)

### 💰 매출 현황
- 월평균 매출: 4,500만원
- 일 평균 방문객: 250명
- 객단가: 5,800원

### 🎯 핵심 성공 요인
1. 접근성 좋은 1층 매장
2. 넓은 좌석 공간 (최소 20석)
3. 주변 500m 이내 경쟁점 없음

**TIP:** 창업 전 유동인구 분석 필수!`,
  },
  {
    title: "프랜차이즈 창업, 실패하는 3가지 이유",
    category: "창업가이드",
    date: "2024.02.05",
    thumbnail: "⚠️",
    summary: "창업 실패 사례를 통해 배우는 성공 전략",
    bgGradient: "linear-gradient(135deg, #34D399 0%, #A7F3D0 100%)",
    isNew: false,
    sortOrder: 3,
    content: `# 프랜차이즈 창업 실패 원인

## ❌ 실패 사례 TOP 3

### 1. 시장 조사 부족
- 경쟁 현황 미파악
- 타겟 고객층 분석 부재
- → 예상 매출 50% 미달

### 2. 과도한 초기 투자
- 필요 이상의 인테리어 비용
- 과다한 재고 확보
- → 자금 회전 어려움

### 3. 본사 의존도 과다
- 자체 마케팅 능력 부족
- 운영 노하우 미습득
- → 경쟁력 약화

## ✅ 성공을 위한 체크리스트

□ 3개월 이상 시장 조사
□ 예비 창업자 인터뷰
□ 재무 계획 수립
□ 가맹본부 실사

**명심:** 준비된 창업이 성공 확률 3배 높입니다.`,
  },
];

export async function getColumns(): Promise<Column[]> {
  const db = await getDb();
  const rows = await db.select().from(columnsTable).orderBy(columnsTable.sortOrder);

  // DB가 비어있으면 초기 데이터 삽입
  if (rows.length === 0) {
    await seedColumns();
    const seeded = await db.select().from(columnsTable).orderBy(columnsTable.sortOrder);
    return seeded.map(rowToColumn);
  }

  return rows.map(rowToColumn);
}

export async function createColumn(input: ColumnInput): Promise<Column> {
  const db = await getDb();
  const result = await db.insert(columnsTable).values({
    title: input.title,
    category: input.category,
    date: input.date,
    thumbnail: input.thumbnail,
    summary: input.summary,
    content: input.content,
    bgGradient: input.bgGradient,
    isNew: input.isNew,
    sortOrder: input.sortOrder,
  }).returning();
  return rowToColumn(result[0]);
}

export async function updateColumn(id: number, input: Partial<ColumnInput>): Promise<Column> {
  const db = await getDb();
  const result = await db.update(columnsTable)
    .set({
      ...(input.title !== undefined && { title: input.title }),
      ...(input.category !== undefined && { category: input.category }),
      ...(input.date !== undefined && { date: input.date }),
      ...(input.thumbnail !== undefined && { thumbnail: input.thumbnail }),
      ...(input.summary !== undefined && { summary: input.summary }),
      ...(input.content !== undefined && { content: input.content }),
      ...(input.bgGradient !== undefined && { bgGradient: input.bgGradient }),
      ...(input.isNew !== undefined && { isNew: input.isNew }),
      ...(input.sortOrder !== undefined && { sortOrder: input.sortOrder }),
    })
    .where(eq(columnsTable.id, id))
    .returning();
  return rowToColumn(result[0]);
}

export async function deleteColumn(id: number): Promise<void> {
  const db = await getDb();
  await db.delete(columnsTable).where(eq(columnsTable.id, id));
}

export async function seedColumns(): Promise<void> {
  const db = await getDb();
  await db.insert(columnsTable).values(DEFAULT_COLUMNS);
}

function rowToColumn(row: typeof columnsTable.$inferSelect): Column {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    date: row.date,
    thumbnail: row.thumbnail,
    summary: row.summary,
    content: row.content,
    bgGradient: row.bgGradient,
    isNew: row.isNew,
    sortOrder: row.sortOrder,
  };
}
