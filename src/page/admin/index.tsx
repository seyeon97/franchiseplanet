"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

type TabType = "brands" | "columns" | "resources" | "offline" | "users";

interface KakaoUser {
  id: number;
  kakaoId: string;
  nickname: string;
  profileImage?: string;
  email?: string;
  loginDate: string;
  lastVisit: string;
}

interface Brand {
  id: number;
  name: string;
  category: string;
  totalCost: string; // 초기 투자금 (보증금 제외)
  thumbnail: string;
  description: string;
  monthlyRevenue: number;
  logoImage?: string; // 로고 이미지 URL (선택)
  color?: string; // 브랜드 색상 (선택)

  // 상세 비용 데이터 (매출별 시나리오)
  detailedCosts: {
    variableCosts: Array<{ label: string; percentage?: string; low: number; mid: number; high: number }>;
    fixedCosts: Array<{ label: string; low: number; mid: number; high: number }>;
  };
}

interface Column {
  id: number;
  title: string;
  category: string;
  summary: string;
  content: string;
  thumbnail: string;
  bgGradient: string;
  date: string;
  isNew: boolean;
}

interface Resource {
  id: number;
  title: string;
  description: string;
  type: string;
  category: string;
  summary: string;
  content: string;
  thumbnail: string;
  bgColor: string;
  date: string;
  provider: string;
  badge: string | null;
  badgeColor: string | null;
}

interface OfflineProgram {
  id: number;
  name: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  date: string;
  time: string;
  location: string;
  duration: string;
  maxParticipants: number;
  bgGradient: string;
  details: string[];
  category: string;
}

export default function AdminView() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("brands");
  const [brands, setBrands] = useState<Brand[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [offlinePrograms, setOfflinePrograms] = useState<OfflineProgram[]>([]);
  const [kakaoUsers, setKakaoUsers] = useState<KakaoUser[]>([]);

  // 수정 모달 상태
  const [editModal, setEditModal] = useState<{
    type: TabType | null;
    data: Brand | Column | Resource | OfflineProgram | KakaoUser | null;
  }>({ type: null, data: null });

  // 브랜드 상세 보기 상태
  const [expandedBrandId, setExpandedBrandId] = useState<number | null>(null);

  // 드래그 앤 드롭 상태
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // 브랜드 순서 변경 함수
  const reorderBrands = (fromIndex: number, toIndex: number) => {
    const updated = [...brands];
    const [movedItem] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, movedItem);
    setBrands(updated);
    localStorage.setItem("brands", JSON.stringify(updated));
    window.dispatchEvent(new StorageEvent('storage', { key: 'brands' }));
  };

  // 삭제 함수들
  const deleteBrand = (id: number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      const updated = brands.filter(b => b.id !== id);
      setBrands(updated);
      localStorage.setItem("brands", JSON.stringify(updated));
      window.dispatchEvent(new StorageEvent('storage', { key: 'brands' }));
    }
  };

  const deleteColumn = (id: number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      const updated = columns.filter(c => c.id !== id);
      setColumns(updated);
      localStorage.setItem("columns", JSON.stringify(updated));
      window.dispatchEvent(new StorageEvent('storage', { key: 'columns' }));
    }
  };

  const deleteResource = (id: number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      const updated = resources.filter(r => r.id !== id);
      setResources(updated);
      localStorage.setItem("resources", JSON.stringify(updated));
      window.dispatchEvent(new StorageEvent('storage', { key: 'resources' }));
    }
  };

  const deleteOfflineProgram = (id: number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      const updated = offlinePrograms.filter(p => p.id !== id);
      setOfflinePrograms(updated);
      localStorage.setItem("offlinePrograms", JSON.stringify(updated));
      window.dispatchEvent(new StorageEvent('storage', { key: 'offlinePrograms' }));
    }
  };

  // 새로 추가 함수들
  const createNewBrand = () => {
    const newId = brands.length > 0 ? Math.max(...brands.map(b => b.id)) + 1 : 1;
    const newBrand: Brand = {
      id: newId,
      name: "새 브랜드",
      category: "카테고리",
      totalCost: "0억",
      thumbnail: "🏪",
      description: "브랜드 설명을 입력하세요",
      monthlyRevenue: 3560,
      detailedCosts: {
        variableCosts: [
          { label: "원가율", percentage: "36%", low: 720, mid: 1282, high: 2880 },
          { label: "카드수수료", percentage: "1.5%", low: 30, mid: 53, high: 120 },
          { label: "배달수수료", percentage: "30%", low: 120, mid: 214, high: 480 },
          { label: "플랫폼수수료", percentage: "5%", low: 80, mid: 142, high: 320 },
          { label: "수도광열비", percentage: "2%", low: 40, mid: 71, high: 160 },
          { label: "인건비", percentage: "22%", low: 500, mid: 783, high: 1680 },
        ],
        fixedCosts: [
          { label: "임대료", low: 352, mid: 220, high: 385 },
          { label: "관리비", low: 30, mid: 22, high: 39 },
          { label: "광고비", low: 10, mid: 10, high: 10 },
          { label: "정기 서비스", low: 30, mid: 30, high: 30 },
          { label: "소모품비", low: 30, mid: 30, high: 30 },
          { label: "로열티", low: 17, mid: 17, high: 17 },
        ],
      },
    };
    setEditModal({ type: "brands", data: newBrand });
  };

  const createNewColumn = () => {
    const newId = columns.length > 0 ? Math.max(...columns.map(c => c.id)) + 1 : 1;
    const newColumn: Column = {
      id: newId,
      title: "새 칼럼",
      category: "카테고리",
      summary: "요약을 입력하세요",
      content: "본문을 입력하세요",
      thumbnail: "📝",
      bgGradient: "linear-gradient(135deg, #3098F2 0%, #25A6D9 100%)",
      date: new Date().toLocaleDateString('ko-KR'),
      isNew: true,
    };
    setEditModal({ type: "columns", data: newColumn });
  };

  const createNewResource = () => {
    const newId = resources.length > 0 ? Math.max(...resources.map(r => r.id)) + 1 : 1;
    const newResource: Resource = {
      id: newId,
      title: "새 자료",
      description: "설명을 입력하세요",
      type: "PDF",
      category: "market",
      summary: "요약을 입력하세요",
      content: "본문을 입력하세요",
      thumbnail: "📄",
      bgColor: "from-blue-400 to-blue-500",
      badge: null,
      badgeColor: null,
      provider: "프차플래닛",
      date: new Date().toISOString().split('T')[0].replace(/-/g, '.'),
    };
    setEditModal({ type: "resources", data: newResource });
  };

  const createNewOfflineProgram = () => {
    const newId = offlinePrograms.length > 0 ? Math.max(...offlinePrograms.map(p => p.id)) + 1 : 1;
    const newProgram: OfflineProgram = {
      id: newId,
      name: "새 프로그램",
      title: "프로그램 제목",
      description: "프로그램 설명을 입력하세요",
      imageUrl: "👨‍💼",
      price: 0,
      date: new Date().toLocaleDateString('ko-KR'),
      time: "14:00",
      location: "장소 입력",
      duration: "2시간",
      maxParticipants: 10,
      bgGradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      details: [],
      category: "임장",
    };
    setEditModal({ type: "offline", data: newProgram });
  };

  // 저장/추가 함수들
  const saveBrand = (updatedBrand: Brand) => {
    const existing = brands.find(b => b.id === updatedBrand.id);
    let updated: Brand[];
    if (existing) {
      updated = brands.map(b => b.id === updatedBrand.id ? updatedBrand : b);
    } else {
      updated = [...brands, updatedBrand];
    }
    setBrands(updated);
    localStorage.setItem("brands", JSON.stringify(updated));
    // 같은 탭에서도 변경 감지를 위한 커스텀 이벤트 발생
    window.dispatchEvent(new StorageEvent('storage', { key: 'brands' }));
    setEditModal({ type: null, data: null });
  };

  const saveColumn = (updatedColumn: Column) => {
    const existing = columns.find(c => c.id === updatedColumn.id);
    let updated: Column[];
    if (existing) {
      updated = columns.map(c => c.id === updatedColumn.id ? updatedColumn : c);
    } else {
      updated = [...columns, updatedColumn];
    }
    setColumns(updated);
    localStorage.setItem("columns", JSON.stringify(updated));
    // 같은 탭에서도 변경 감지를 위한 커스텀 이벤트 발생
    window.dispatchEvent(new StorageEvent('storage', { key: 'columns' }));
    setEditModal({ type: null, data: null });
  };

  const saveResource = (updatedResource: Resource) => {
    const existing = resources.find(r => r.id === updatedResource.id);
    let updated: Resource[];
    if (existing) {
      updated = resources.map(r => r.id === updatedResource.id ? updatedResource : r);
    } else {
      updated = [...resources, updatedResource];
    }
    setResources(updated);
    localStorage.setItem("resources", JSON.stringify(updated));
    // 같은 탭에서도 변경 감지를 위한 커스텀 이벤트 발생
    window.dispatchEvent(new StorageEvent('storage', { key: 'resources' }));
    setEditModal({ type: null, data: null });
  };

  const saveOfflineProgram = (updatedProgram: OfflineProgram) => {
    const existing = offlinePrograms.find(p => p.id === updatedProgram.id);
    let updated: OfflineProgram[];
    if (existing) {
      updated = offlinePrograms.map(p => p.id === updatedProgram.id ? updatedProgram : p);
    } else {
      updated = [...offlinePrograms, updatedProgram];
    }
    setOfflinePrograms(updated);
    localStorage.setItem("offlinePrograms", JSON.stringify(updated));
    // 같은 탭에서도 변경 감지를 위한 커스텀 이벤트 발생
    window.dispatchEvent(new StorageEvent('storage', { key: 'offlinePrograms' }));
    setEditModal({ type: null, data: null });
  };

  // 초기 데이터 생성
  const initializeData = () => {
    if (typeof window !== 'undefined') {
      // 브랜드 초기 데이터
      const initialBrands: Brand[] = [
        {
          id: 1,
          name: "메가커피",
          category: "카페",
          totalCost: "1.5억~2억",
          thumbnail: "☕",
          logoImage: "/megacoffee-logo.png",
          color: "#F25C05",
          description: "합리적인 가격의 메가급 커피 전문점",
          monthlyRevenue: 3560,
          detailedCosts: {
            variableCosts: [
              { label: "원가율", percentage: "32%", low: 640, mid: 1139, high: 2560 },
              { label: "카드수수료", percentage: "1.5%", low: 30, mid: 53, high: 120 },
              { label: "배달수수료", percentage: "27%", low: 108, mid: 192, high: 432 },
              { label: "플랫폼수수료", percentage: "4.5%", low: 90, mid: 160, high: 360 },
              { label: "수도광열비", percentage: "2.5%", low: 50, mid: 89, high: 200 },
              { label: "인건비", percentage: "19%", low: 380, mid: 676, high: 1520 },
            ],
            fixedCosts: [
              { label: "임대료", low: 180, mid: 145, high: 241 },
              { label: "관리비", low: 20, mid: 16, high: 26 },
              { label: "광고비", low: 8, mid: 8, high: 8 },
              { label: "정기 서비스", low: 24, mid: 24, high: 24 },
              { label: "소모품비", low: 18, mid: 18, high: 18 },
              { label: "로열티", low: 17, mid: 17, high: 17 },
            ],
          }
        },
        {
          id: 2,
          name: "맘스터치",
          category: "치킨·버거",
          totalCost: "2억~3억",
          thumbnail: "🍔",
          color: "#FF6B35",
          description: "국내 대표 프리미엄 버거 프랜차이즈",
          monthlyRevenue: 8500,
          detailedCosts: {
            variableCosts: [
              { label: "원가율", percentage: "36%", low: 1152, mid: 3060, high: 5400 },
              { label: "카드수수료", percentage: "1.5%", low: 48, mid: 128, high: 225 },
              { label: "배달수수료", percentage: "30%", low: 192, mid: 510, high: 900 },
              { label: "플랫폼수수료", percentage: "5%", low: 160, mid: 425, high: 750 },
              { label: "수도광열비", percentage: "2%", low: 64, mid: 170, high: 300 },
              { label: "인건비", percentage: "22%", low: 704, mid: 1870, high: 3300 },
            ],
            fixedCosts: [
              { label: "임대료", low: 384, mid: 340, high: 540 },
              { label: "관리비", low: 42, mid: 37, high: 59 },
              { label: "광고비", low: 10, mid: 10, high: 10 },
              { label: "정기 서비스", low: 30, mid: 30, high: 30 },
              { label: "소모품비", low: 30, mid: 30, high: 30 },
              { label: "로열티", low: 20, mid: 20, high: 20 },
            ],
          }
        },
        {
          id: 3,
          name: "컴포즈커피",
          category: "카페",
          totalCost: "1억~1.5억",
          thumbnail: "☕",
          color: "#8B4513",
          description: "저렴한 가격의 커피 전문점",
          monthlyRevenue: 7800,
          detailedCosts: {
            variableCosts: [
              { label: "원가율", percentage: "35%", low: 1575, mid: 2730, high: 4200 },
              { label: "카드수수료", percentage: "1.5%", low: 68, mid: 117, high: 180 },
              { label: "배달수수료", percentage: "28%", low: 252, mid: 437, high: 672 },
              { label: "플랫폼수수료", percentage: "5%", low: 225, mid: 390, high: 600 },
              { label: "수도광열비", percentage: "3%", low: 135, mid: 234, high: 360 },
              { label: "인건비", percentage: "20%", low: 900, mid: 1560, high: 2400 },
            ],
            fixedCosts: [
              { label: "임대료", low: 360, mid: 280, high: 420 },
              { label: "관리비", low: 32, mid: 25, high: 38 },
              { label: "광고비", low: 10, mid: 10, high: 10 },
              { label: "정기 서비스", low: 25, mid: 25, high: 25 },
              { label: "소모품비", low: 20, mid: 20, high: 20 },
              { label: "로열티", low: 18, mid: 18, high: 18 },
            ],
          }
        },
        {
          id: 4,
          name: "교촌치킨",
          category: "치킨",
          totalCost: "2.5억~3.5억",
          thumbnail: "🍗",
          color: "#DC143C",
          description: "오리지널 간장치킨의 명가",
          monthlyRevenue: 9500,
          detailedCosts: {
            variableCosts: [
              { label: "원가율", percentage: "38%", low: 1520, mid: 3610, high: 6840 },
              { label: "카드수수료", percentage: "1.5%", low: 60, mid: 143, high: 270 },
              { label: "배달수수료", percentage: "32%", low: 256, mid: 608, high: 1152 },
              { label: "플랫폼수수료", percentage: "5%", low: 200, mid: 475, high: 900 },
              { label: "수도광열비", percentage: "2.5%", low: 100, mid: 238, high: 450 },
              { label: "인건비", percentage: "24%", low: 960, mid: 2280, high: 4320 },
            ],
            fixedCosts: [
              { label: "임대료", low: 384, mid: 285, high: 504 },
              { label: "관리비", low: 35, mid: 26, high: 46 },
              { label: "광고비", low: 15, mid: 15, high: 15 },
              { label: "정기 서비스", low: 35, mid: 35, high: 35 },
              { label: "소모품비", low: 35, mid: 35, high: 35 },
              { label: "로열티", low: 20, mid: 20, high: 20 },
            ],
          }
        },
        {
          id: 5,
          name: "설빙",
          category: "디저트",
          totalCost: "1.5억~2.5억",
          thumbnail: "🍧",
          color: "#FFB6C1",
          description: "프리미엄 빙수 디저트 카페",
          monthlyRevenue: 6200,
          detailedCosts: {
            variableCosts: [
              { label: "원가율", percentage: "33%", low: 924, mid: 2046, high: 3300 },
              { label: "카드수수료", percentage: "1.5%", low: 42, mid: 93, high: 150 },
              { label: "배달수수료", percentage: "25%", low: 140, mid: 310, high: 500 },
              { label: "플랫폼수수료", percentage: "4%", low: 112, mid: 248, high: 400 },
              { label: "수도광열비", percentage: "2%", low: 56, mid: 124, high: 200 },
              { label: "인건비", percentage: "18%", low: 504, mid: 1116, high: 1800 },
            ],
            fixedCosts: [
              { label: "임대료", low: 322, mid: 235, high: 375 },
              { label: "관리비", low: 30, mid: 22, high: 35 },
              { label: "광고비", low: 8, mid: 8, high: 8 },
              { label: "정기 서비스", low: 22, mid: 22, high: 22 },
              { label: "소모품비", low: 18, mid: 18, high: 18 },
              { label: "로열티", low: 12, mid: 12, high: 12 },
            ],
          }
        },
        {
          id: 6,
          name: "본죽",
          category: "한식",
          totalCost: "1.5억~2억",
          thumbnail: "🍲",
          color: "#228B22",
          description: "건강한 죽 전문 프랜차이즈",
          monthlyRevenue: 7000,
          detailedCosts: {
            variableCosts: [
              { label: "원가율", percentage: "34%", low: 1190, mid: 2380, high: 3740 },
              { label: "카드수수료", percentage: "1.5%", low: 53, mid: 105, high: 165 },
              { label: "배달수수료", percentage: "29%", low: 203, mid: 406, high: 638 },
              { label: "플랫폼수수료", percentage: "5%", low: 175, mid: 350, high: 550 },
              { label: "수도광열비", percentage: "2%", low: 70, mid: 140, high: 220 },
              { label: "인건비", percentage: "21%", low: 735, mid: 1470, high: 2310 },
            ],
            fixedCosts: [
              { label: "임대료", low: 392, mid: 280, high: 462 },
              { label: "관리비", low: 35, mid: 25, high: 42 },
              { label: "광고비", low: 12, mid: 12, high: 12 },
              { label: "정기 서비스", low: 28, mid: 28, high: 28 },
              { label: "소모품비", low: 25, mid: 25, high: 25 },
              { label: "로열티", low: 18, mid: 18, high: 18 },
            ],
          }
        }
      ];

      // 칼럼 초기 데이터
      const initialColumns: Column[] = [
        {
          id: 1,
          title: "2024년 프랜차이즈 창업 트렌드 분석",
          category: "시장분석",
          summary: "최근 프랜차이즈 시장의 주요 트렌드와 성공 전략",
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
          thumbnail: "📊",
          bgGradient: "from-[#3098F2] to-white",
          date: "2024.02.13",
          isNew: true
        },
        {
          id: 2,
          title: "메가커피 가맹점, 성공하는 입지 조건은?",
          category: "브랜드분석",
          summary: "메가커피 상위 10% 매장의 공통점",
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
          thumbnail: "☕",
          bgGradient: "from-[#25A6D9] to-white",
          date: "2024.02.10",
          isNew: true
        },
        {
          id: 3,
          title: "프랜차이즈 창업, 실패하는 3가지 이유",
          category: "창업가이드",
          summary: "창업 실패 사례를 통해 배우는 성공 전략",
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

**명심:** 준비된 창업이 성공 확률 3배 높습니다.`,
          thumbnail: "⚠️",
          bgGradient: "from-[#11BFAE] to-white",
          date: "2024.02.05",
          isNew: false
        }
      ];

      // 자료실 초기 데이터
      const initialResources: Resource[] = [
        {
          id: 1,
          title: "프랜차이즈 시장 분석 보고서",
          description: "2024년 최신 트렌드와 성장 전망",
          type: "PDF",
          category: "market",
          summary: "2024년 최신 트렌드와 성장 전망",
          thumbnail: "📊",
          bgColor: "from-blue-400 to-blue-500",
          badge: "인기",
          badgeColor: "bg-red-500",
          provider: "프차플래닛 리서치",
          date: "2024.02.13",
          content: `# 2024년 프랜차이즈 시장 전망

## 주요 트렌드

### 1. 무인 자동화 시스템 도입
- 인건비 절감 효과 30% 이상
- 24시간 운영 가능한 비즈니스 모델
- 키오스크, 로봇 활용 증가

### 2. 로컬 브랜드의 성장
- 대형 브랜드 대비 20% 낮은 초기 비용
- 지역 특화 메뉴로 차별화
- SNS 마케팅 효과적 활용

### 3. 친환경 트렌드
- ESG 경영 중요성 증가
- 재활용 가능한 포장재 사용
- 소비자 선호도 상승

## 성공 전략

✅ 차별화된 컨셉 개발
✅ 디지털 마케팅 활용
✅ 고객 경험 최적화
✅ 데이터 기반 의사결정

**결론:** 2024년은 기술과 친환경이 핵심 키워드입니다.`
        },
        {
          id: 2,
          title: "카페 창업 입지 선정 가이드",
          description: "상권 분석, 임대차 계약, 주요 체크리스트",
          type: "PDF",
          category: "checklist",
          summary: "상권 분석, 임대차 계약, 주요 체크리스트",
          thumbnail: "☕",
          bgColor: "from-amber-400 to-orange-500",
          badge: null,
          badgeColor: null,
          provider: "창업 컨설팅",
          date: "2024.02.10",
          content: `# 카페 창업 입지 선정 가이드

## 핵심 체크포인트

### 📍 유동인구 분석
- 주중/주말 유동인구 차이 확인
- 시간대별 유동 패턴 파악
- 최소 일 평균 500명 이상 권장

### 🏢 주변 환경
- 오피스 밀집 지역: 평일 수요 ↑
- 주거 밀집 지역: 주말 수요 ↑
- 대학가: 학기 중 집중

### 💰 임대 조건
- 월 임대료: 예상 매출의 10% 이내
- 보증금 회수 가능성 검토
- 권리금 적정성 평가

### ⚠️ 경쟁 현황
- 반경 500m 이내 경쟁점 수
- 주요 경쟁사 가격대 비교
- 차별화 포인트 발굴

**TIP:** 최소 3개월 이상 상권 조사 필수!`
        },
        {
          id: 3,
          title: "프랜차이즈 계약서 가이드",
          description: "계약 전 반드시 확인할 필수 항목 정리",
          type: "PDF",
          category: "contract",
          summary: "계약 전 반드시 확인할 필수 항목 정리",
          thumbnail: "📋",
          bgColor: "from-green-400 to-emerald-500",
          badge: "추천",
          badgeColor: "bg-blue-500",
          provider: "법률 자문팀",
          date: "2024.02.05",
          content: `# 프랜차이즈 계약서 가이드

## 필수 확인 항목

### 📋 계약 기본사항
- 계약 기간 및 갱신 조건
- 가맹비, 로열티 구조
- 보증금 및 위약금 규정

### ⚖️ 권리와 의무
- 상표 사용권 범위
- 영업 지역 독점권
- 본사 지원 내용 명시

### 💸 비용 구조
- 초기 투자 비용 상세
- 월별 고정 비용
- 추가 부담금 여부

### 🚫 주의사항
- 일방적 계약 해지 조항
- 과도한 위약금 설정
- 불공정 거래 조항

**중요:** 계약 전 변호사 검토 권장!`
        },
        {
          id: 4,
          title: "치킨 프랜차이즈 수익성 분석",
          description: "매출 구조, 비용 분석, 손익 시뮬레이션",
          type: "PDF",
          category: "market",
          summary: "매출 구조, 비용 분석, 손익 시뮬레이션",
          thumbnail: "🍗",
          bgColor: "from-yellow-400 to-amber-500",
          badge: "인기",
          badgeColor: "bg-red-500",
          provider: "업종 분석팀",
          date: "2024.02.01",
          content: `# 치킨 프랜차이즈 수익성 분석

## 매출 구조

### 💰 평균 매출
- 월 평균: 4,200만원
- 일 평균: 140만원
- 주말 집중도: 40%

### 📊 비용 구조
- 재료비: 35%
- 인건비: 25%
- 임대료: 10%
- 기타 고정비: 15%
- 순이익률: 15%

### ⚡ 손익분기점
- 첫 달부터 흑자 어려움
- 평균 6-8개월 소요
- 초기 투자 회수: 2-3년

**결론:** 안정적이지만 경쟁 치열`
        },
        {
          id: 5,
          title: "편의점 창업 완벽 가이드",
          description: "점포 선정부터 운영 노하우까지 총정리",
          type: "PDF",
          category: "checklist",
          summary: "점포 선정부터 운영 노하우까지 총정리",
          thumbnail: "🏪",
          bgColor: "from-purple-400 to-purple-500",
          badge: "인기",
          badgeColor: "bg-red-500",
          provider: "편의점 전문가",
          date: "2024.01.28",
          content: `# 편의점 창업 완벽 가이드

## 점포 선정

### 🏪 최적 입지
- 주거 밀집 지역
- 대중교통 접근성 우수
- 주차 공간 3대 이상

### 💼 초기 투자
- 가맹비: 2,000만원
- 인테리어: 3,000만원
- 초도물품: 1,500만원
- 총 6,500만원~

### 📈 운영 노하우
- 재고 관리 시스템 활용
- 시간대별 인력 배치
- POS 데이터 분석

**TIP:** 24시간 운영 vs 심야 휴무 신중 선택`
        },
        {
          id: 6,
          title: "가맹점주 권리 보호 안내서",
          description: "분쟁 해결 절차 및 법적 권리 종합 가이드",
          type: "PDF",
          category: "contract",
          summary: "분쟁 해결 절차 및 법적 권리 종합 가이드",
          thumbnail: "⚖️",
          bgColor: "from-gray-400 to-gray-500",
          badge: null,
          badgeColor: null,
          provider: "법률 상담소",
          date: "2024.01.25",
          content: `# 가맹점주 권리 보호 안내서

## 법적 권리

### ⚖️ 가맹사업법
- 정보공개서 제공 의무
- 허위·과장 광고 금지
- 불공정거래 제재

### 🛡️ 보호받을 수 있는 권리
- 영업지역 보호
- 계약 갱신 요구권
- 손해배상 청구권

### 📞 분쟁 해결
- 가맹거래사 공정위 신고
- 한국공정거래조정원 조정
- 법률구조공단 무료 상담

**중요:** 부당한 대우 시 즉시 신고!`
        }
      ];

      // 오프라인 프로그램 초기 데이터
      const initialOfflinePrograms: OfflineProgram[] = [
        {
          id: 1,
          name: "장사해커 컨설턴트",
          category: "임장",
          title: "강남역 임장",
          description: "강남역 상권 분석부터 유동인구 파악까지 전문가와 함께하는 현장 답사",
          bgGradient: "from-[#2F85F2] to-[#1F9CD3]",
          imageUrl: "👨‍💼",
          price: 150000,
          date: "2024년 3월 15일 (토)",
          time: "오전 10:00 - 오후 2:00",
          location: "강남역 2번 출구 앞",
          duration: "4시간",
          maxParticipants: 10,
          details: [
            "강남역 상권 전체 분석 및 유동인구 측정",
            "주요 상권별 임대료 및 권리금 정보 제공",
            "성공/실패 사례 현장 방문 및 분석",
            "1:1 맞춤 상권 컨설팅 30분 제공",
            "상권분석 리포트 제공 (PDF)"
          ]
        },
        {
          id: 2,
          name: "박프차 전문가",
          category: "임장",
          title: "성수역 임장",
          description: "핫플레이스 성수동! 트렌디한 상권의 숨은 매력 찾기",
          bgGradient: "from-[#1F9CD3] to-[#0BB7AD]",
          imageUrl: "👨‍💼",
          price: 180000,
          date: "2024년 3월 22일 (토)",
          time: "오후 2:00 - 오후 6:00",
          location: "성수역 3번 출구 앞",
          duration: "4시간",
          maxParticipants: 8,
          details: [
            "성수동 핫플레이스 투어 및 트렌드 분석",
            "F&B 창업 최적 입지 선정 노하우",
            "성공 브랜드 케이스 스터디",
            "임대 협상 전략 및 팁 공유",
            "성수동 상권 분석 자료 제공"
          ]
        },
        {
          id: 3,
          name: "이입지 대표",
          category: "임장",
          title: "홍대입구역 임장",
          description: "젊음의 거리 홍대, 창업 전 꼭 확인해야 할 입지 포인트",
          bgGradient: "from-[#0BB7AD] to-[#08C698]",
          imageUrl: "👩‍💼",
          price: 160000,
          date: "2024년 3월 29일 (토)",
          time: "오전 10:00 - 오후 2:00",
          location: "홍대입구역 9번 출구 앞",
          duration: "4시간",
          maxParticipants: 12,
          details: [
            "홍대 메인/서브 상권 구분 및 특징 분석",
            "유동인구 동선 파악 및 최적 입지 찾기",
            "주말/평일 상권 차이 분석",
            "프랜차이즈 vs 개인 창업 입지 비교",
            "홍대 상권 트렌드 리포트 제공"
          ]
        }
      ];

      localStorage.setItem("brands", JSON.stringify(initialBrands));
      localStorage.setItem("columns", JSON.stringify(initialColumns));
      localStorage.setItem("resources", JSON.stringify(initialResources));
      localStorage.setItem("offlinePrograms", JSON.stringify(initialOfflinePrograms));

      // 모든 페이지에 데이터 동기화 이벤트 발생
      window.dispatchEvent(new StorageEvent('storage', { key: 'brands' }));
      window.dispatchEvent(new StorageEvent('storage', { key: 'columns' }));
      window.dispatchEvent(new StorageEvent('storage', { key: 'resources' }));
      window.dispatchEvent(new StorageEvent('storage', { key: 'offlinePrograms' }));

      loadData();
    }
  };

  // localStorage에서 데이터 로드
  const loadData = () => {
    if (typeof window !== 'undefined') {
      try {
        const brandsData = localStorage.getItem("brands");
        const columnsData = localStorage.getItem("columns");
        const resourcesData = localStorage.getItem("resources");
        const offlineData = localStorage.getItem("offlinePrograms");
        const usersData = localStorage.getItem("kakaoUsers");

        setBrands(brandsData ? JSON.parse(brandsData) : []);
        setColumns(columnsData ? JSON.parse(columnsData) : []);
        setResources(resourcesData ? JSON.parse(resourcesData) : []);
        setOfflinePrograms(offlineData ? JSON.parse(offlineData) : []);
        setKakaoUsers(usersData ? JSON.parse(usersData) : []);
      } catch (error) {
        console.error("데이터 로드 오류:", error);
      }
    }
  };

  useEffect(() => {
    // 처음 마운트 시 데이터가 없으면 초기 데이터 자동 생성
    if (typeof window !== 'undefined') {
      const brandsData = localStorage.getItem("brands");
      const hasData = brandsData ||
                      localStorage.getItem("columns") ||
                      localStorage.getItem("resources") ||
                      localStorage.getItem("offlinePrograms");

      // 데이터 무결성 체크: 브랜드 데이터가 있으면 6개 브랜드가 모두 있는지 확인
      if (brandsData) {
        try {
          const storedBrands = JSON.parse(brandsData);
          // 6개 브랜드 중 하나라도 빠지면 초기화
          const expectedBrandIds = [1, 2, 3, 4, 5, 6];
          const hasMissingBrands = expectedBrandIds.some(id =>
            !storedBrands.find((b: Brand) => b.id === id)
          );

          if (hasMissingBrands || storedBrands.length < 6) {
            console.log("⚠️ 브랜드 데이터 불완전 - 초기화 중...");
            initializeData();
            return;
          }
        } catch (error) {
          console.error("브랜드 데이터 파싱 오류:", error);
          initializeData();
          return;
        }
      }

      if (!hasData) {
        initializeData();
      } else {
        loadData();
      }
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const tabs = [
    { id: "brands" as TabType, label: "브랜드", count: brands.length },
    { id: "columns" as TabType, label: "칼럼", count: columns.length },
    { id: "resources" as TabType, label: "자료실", count: resources.length },
    { id: "offline" as TabType, label: "오프라인", count: offlinePrograms.length },
    { id: "users" as TabType, label: "사용자", count: kakaoUsers.length },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 상단 헤더 */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-black text-gray-900">프차플래닛 관리자</h1>
              <span className="text-sm text-gray-500 font-medium">Admin</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg">
                <span className="text-sm text-gray-600">👤</span>
                <span className="text-sm font-bold text-gray-900">관리자</span>
              </div>
              <button
                onClick={() => {
                  if (confirm("홈페이지와 데이터를 동기화하시겠습니까?\n최신 콘텐츠로 업데이트됩니다.")) {
                    initializeData();
                  }
                }}
                className="px-4 py-2 text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors"
              >
                데이터 동기화
              </button>
              <button
                onClick={() => router.push("/")}
                className="px-4 py-2 text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors"
              >
                홈으로
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-6">
          {/* 왼쪽 사이드바 */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
              <h2 className="text-sm font-bold text-gray-500 mb-3 px-2">메뉴</h2>
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                      activeTab === tab.id
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      activeTab === tab.id
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-100 text-gray-600"
                    }`}>
                      {tab.count}
                    </span>
                  </button>
                ))}
              </nav>
            </div>

            {/* 통계 카드 */}
            <div className="mt-4 bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
              <h2 className="text-sm font-bold text-gray-500 mb-3">전체 콘텐츠</h2>
              <div className="text-3xl font-black text-gray-900">
                {brands.length + columns.length + resources.length + offlinePrograms.length}
              </div>
              <p className="text-xs text-gray-500 mt-1">총 등록된 콘텐츠</p>
            </div>
          </div>

          {/* 메인 콘텐츠 영역 */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
              {/* 콘텐츠 헤더 */}
              <div className="border-b border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-black text-gray-900">
                      {tabs.find(t => t.id === activeTab)?.label}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      총 {
                        activeTab === "brands" ? brands.length :
                        activeTab === "columns" ? columns.length :
                        activeTab === "resources" ? resources.length :
                        activeTab === "offline" ? offlinePrograms.length :
                        kakaoUsers.length
                      }개의 {activeTab === "users" ? "사용자" : "콘텐츠"}
                    </p>
                  </div>
                  {activeTab !== "users" && (
                    <button
                      onClick={() => {
                        if (activeTab === "brands") createNewBrand();
                        else if (activeTab === "columns") createNewColumn();
                        else if (activeTab === "resources") createNewResource();
                        else if (activeTab === "offline") createNewOfflineProgram();
                      }}
                      className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl hover:shadow-lg transition-all"
                    >
                      + 새로 추가
                    </button>
                  )}
                </div>
              </div>

              {/* 콘텐츠 리스트 */}
              <div className="p-6">
                {activeTab === "brands" && (
                  <div className="space-y-3">
                    {brands.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="text-4xl mb-3">🏪</div>
                        <p className="text-gray-500 font-medium">등록된 브랜드가 없습니다</p>
                        <p className="text-sm text-gray-400 mt-1">새로 추가 버튼을 눌러 브랜드를 등록하세요</p>
                      </div>
                    ) : (
                      brands.map((brand, index) => (
                        <div
                          key={brand.id}
                          draggable
                          onDragStart={(e) => {
                            setDraggedIndex(index);
                            e.dataTransfer.effectAllowed = "move";
                          }}
                          onDragOver={(e) => {
                            e.preventDefault();
                            e.dataTransfer.dropEffect = "move";
                            setDragOverIndex(index);
                          }}
                          onDragLeave={() => {
                            setDragOverIndex(null);
                          }}
                          onDrop={(e) => {
                            e.preventDefault();
                            if (draggedIndex !== null && draggedIndex !== index) {
                              reorderBrands(draggedIndex, index);
                            }
                            setDraggedIndex(null);
                            setDragOverIndex(null);
                          }}
                          onDragEnd={() => {
                            setDraggedIndex(null);
                            setDragOverIndex(null);
                          }}
                          className={`border border-gray-200 rounded-xl overflow-hidden transition-all ${
                            draggedIndex === index ? 'opacity-50' : ''
                          } ${
                            dragOverIndex === index ? 'border-blue-500 border-2' : ''
                          }`}
                        >
                          <div
                            className="flex items-center gap-4 p-4 hover:border-blue-300 hover:bg-blue-50/50 transition-all group"
                          >
                            {/* 드래그 핸들 */}
                            <div className="cursor-move flex-shrink-0 text-gray-400 hover:text-gray-600">
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"></path>
                              </svg>
                            </div>
                            <div
                              onClick={() => setEditModal({ type: "brands", data: brand })}
                              className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 cursor-pointer"
                            >
                              {brand.thumbnail || "🏪"}
                            </div>
                            <div
                              onClick={() => setEditModal({ type: "brands", data: brand })}
                              className="flex-1 min-w-0"
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-bold text-gray-900 truncate">{brand.name}</h3>
                                <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full flex-shrink-0">
                                  {brand.category}
                                </span>
                              </div>
                              <p className="text-sm text-gray-500 truncate">{brand.description}</p>
                            </div>
                            <div
                              onClick={() => setEditModal({ type: "brands", data: brand })}
                              className="text-right flex-shrink-0"
                            >
                              <div className="text-sm font-bold text-gray-900">
                                {brand.totalCost}
                              </div>
                              <div className="text-xs text-gray-500 mt-0.5">초기 비용</div>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedBrandId(expandedBrandId === brand.id ? null : brand.id);
                              }}
                              className="flex-shrink-0 w-8 h-8 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 flex items-center justify-center transition-all"
                            >
                              <svg
                                className={`w-5 h-5 transition-transform ${expandedBrandId === brand.id ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteBrand(brand.id);
                              }}
                              className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>

                          {/* 상세 비용 보기 */}
                          {expandedBrandId === brand.id && (
                            <div className="border-t border-gray-200 bg-gray-50 p-4 space-y-4">
                              {brand.detailedCosts ? (
                                <>
                                  {/* 변동비 상세 */}
                                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                      <span>📊</span> 변동비 상세보기
                                    </h4>
                                    <div className="space-y-2">
                                      <div className="flex items-center text-xs font-semibold text-gray-500 pb-2 border-b">
                                        <div className="flex-1">항목</div>
                                        <div className="w-20 text-right text-red-600">최저매출</div>
                                        <div className="w-20 text-right text-blue-600">평균매출</div>
                                        <div className="w-20 text-right text-green-600">최고매출</div>
                                      </div>
                                      {brand.detailedCosts.variableCosts.map((cost, idx) => (
                                        <div key={idx} className="flex items-center text-sm py-1.5">
                                          <div className="flex-1 text-gray-700">
                                            {cost.label} {cost.percentage && `(${cost.percentage})`}
                                          </div>
                                          <div className="w-20 text-right font-medium text-red-600">{cost.low.toLocaleString()}만원</div>
                                          <div className="w-20 text-right font-medium text-blue-600">{cost.mid.toLocaleString()}만원</div>
                                          <div className="w-20 text-right font-medium text-green-600">{cost.high.toLocaleString()}만원</div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  {/* 고정비 상세 */}
                                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                      <span>🏢</span> 고정비 상세보기
                                    </h4>
                                    <div className="space-y-2">
                                      <div className="flex items-center text-xs font-semibold text-gray-500 pb-2 border-b">
                                        <div className="flex-1">항목</div>
                                        <div className="w-20 text-right text-red-600">최저매출</div>
                                        <div className="w-20 text-right text-blue-600">평균매출</div>
                                        <div className="w-20 text-right text-green-600">최고매출</div>
                                      </div>
                                      {brand.detailedCosts.fixedCosts.map((cost, idx) => (
                                        <div key={idx} className="flex items-center text-sm py-1.5">
                                          <div className="flex-1 text-gray-700">{cost.label}</div>
                                          <div className="w-20 text-right font-medium text-red-600">{cost.low.toLocaleString()}만원</div>
                                          <div className="w-20 text-right font-medium text-blue-600">{cost.mid.toLocaleString()}만원</div>
                                          <div className="w-20 text-right font-medium text-green-600">{cost.high.toLocaleString()}만원</div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <div className="text-center py-8">
                                  <p className="text-sm text-gray-500 mb-3">상세 비용 데이터가 없습니다</p>
                                  <button
                                    onClick={() => setEditModal({ type: "brands", data: brand })}
                                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                                  >
                                    브랜드 수정하여 추가하기 →
                                  </button>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                )}

                {activeTab === "columns" && (
                  <div className="space-y-3">
                    {columns.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="text-4xl mb-3">📝</div>
                        <p className="text-gray-500 font-medium">등록된 칼럼이 없습니다</p>
                        <p className="text-sm text-gray-400 mt-1">새로 추가 버튼을 눌러 칼럼을 등록하세요</p>
                      </div>
                    ) : (
                      columns.map((column) => (
                        <div
                          key={column.id}
                          onClick={() => setEditModal({ type: "columns", data: column })}
                          className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/50 transition-all group cursor-pointer"
                        >
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                            {column.thumbnail || "📝"}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-bold text-gray-900 truncate">{column.title}</h3>
                              {column.isNew && (
                                <span className="text-xs px-2 py-0.5 bg-red-100 text-red-600 rounded-full flex-shrink-0">
                                  NEW
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-500 truncate">{column.summary}</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="text-sm font-bold text-gray-900">{column.date}</div>
                            <div className="text-xs text-gray-500 mt-0.5">{column.category}</div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteColumn(column.id);
                            }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {activeTab === "resources" && (
                  <div className="space-y-3">
                    {resources.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="text-4xl mb-3">📚</div>
                        <p className="text-gray-500 font-medium">등록된 자료가 없습니다</p>
                        <p className="text-sm text-gray-400 mt-1">새로 추가 버튼을 눌러 자료를 등록하세요</p>
                      </div>
                    ) : (
                      resources.map((resource) => (
                        <div
                          key={resource.id}
                          onClick={() => setEditModal({ type: "resources", data: resource })}
                          className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/50 transition-all group cursor-pointer"
                        >
                          <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                            {resource.thumbnail || "📄"}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-bold text-gray-900 truncate">{resource.title}</h3>
                              <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full flex-shrink-0">
                                {resource.category}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500 truncate">{resource.summary}</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="text-sm font-bold text-gray-900">{resource.date}</div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteResource(resource.id);
                            }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {activeTab === "offline" && (
                  <div className="space-y-3">
                    {offlinePrograms.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="text-4xl mb-3">👥</div>
                        <p className="text-gray-500 font-medium">등록된 프로그램이 없습니다</p>
                        <p className="text-sm text-gray-400 mt-1">새로 추가 버튼을 눌러 프로그램을 등록하세요</p>
                      </div>
                    ) : (
                      offlinePrograms.map((program) => (
                        <div
                          key={program.id}
                          onClick={() => setEditModal({ type: "offline", data: program })}
                          className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/50 transition-all group cursor-pointer"
                        >
                          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                            {program.imageUrl || "👨‍💼"}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-bold text-gray-900 truncate">{program.title}</h3>
                              <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full flex-shrink-0">
                                {program.category}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500 truncate">{program.description}</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="text-sm font-bold text-gray-900">
                              {program.price.toLocaleString()}원
                            </div>
                            <div className="text-xs text-gray-500 mt-0.5">{program.date}</div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteOfflineProgram(program.id);
                            }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {activeTab === "users" && (
                  <div className="space-y-3">
                    {kakaoUsers.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="text-4xl mb-3">👤</div>
                        <p className="text-gray-500 font-medium">카카오 로그인한 사용자가 없습니다</p>
                        <p className="text-sm text-gray-400 mt-1">사용자가 카카오 로그인하면 여기에 표시됩니다</p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-gray-200">
                              <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">프로필</th>
                              <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">닉네임</th>
                              <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">이메일</th>
                              <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">카카오 ID</th>
                              <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">최초 가입</th>
                              <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">최근 방문</th>
                            </tr>
                          </thead>
                          <tbody>
                            {kakaoUsers.map((user) => (
                              <tr
                                key={user.id}
                                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                              >
                                <td className="px-4 py-3">
                                  <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center overflow-hidden">
                                    {user.profileImage ? (
                                      <img src={user.profileImage} alt={user.nickname} className="w-full h-full object-cover" />
                                    ) : (
                                      <span className="text-xl">👤</span>
                                    )}
                                  </div>
                                </td>
                                <td className="px-4 py-3">
                                  <div className="font-medium text-gray-900">{user.nickname}</div>
                                </td>
                                <td className="px-4 py-3">
                                  <div className="text-sm text-gray-600">{user.email || "-"}</div>
                                </td>
                                <td className="px-4 py-3">
                                  <div className="text-sm text-gray-600 font-mono">{user.kakaoId}</div>
                                </td>
                                <td className="px-4 py-3">
                                  <div className="text-sm text-gray-600">{user.loginDate}</div>
                                </td>
                                <td className="px-4 py-3">
                                  <div className="text-sm text-gray-600">{user.lastVisit}</div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 수정 모달 */}
      {editModal.type && editModal.data && editModal.type !== "users" && (
        <EditModal
          type={editModal.type}
          data={editModal.data as Brand | Column | Resource | OfflineProgram}
          onClose={() => setEditModal({ type: null, data: null })}
          onSave={(data) => {
            if (editModal.type === "brands") saveBrand(data as Brand);
            else if (editModal.type === "columns") saveColumn(data as Column);
            else if (editModal.type === "resources") saveResource(data as Resource);
            else if (editModal.type === "offline") saveOfflineProgram(data as OfflineProgram);
          }}
        />
      )}
    </div>
  );
}

// 수정 모달 컴포넌트
function EditModal({
  type,
  data,
  onClose,
  onSave,
}: {
  type: Exclude<TabType, "users">;
  data: Brand | Column | Resource | OfflineProgram;
  onClose: () => void;
  onSave: (data: Brand | Column | Resource | OfflineProgram) => void;
}) {
  const [formData, setFormData] = useState(data);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const updateField = (field: string, value: string | number | boolean) => {
    setFormData({ ...formData, [field]: value });
  };

  const updateDetailedCost = (type: 'variableCosts' | 'fixedCosts', index: number, field: 'label' | 'percentage' | 'low' | 'mid' | 'high', value: string | number) => {
    const brandData = formData as Brand;

    const updated = [...brandData.detailedCosts[type]];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setFormData({
      ...brandData,
      detailedCosts: {
        ...brandData.detailedCosts,
        [type]: updated,
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 모달 헤더 */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-xl font-black text-gray-900">
            {type === "brands" && "브랜드"}
            {type === "columns" && "칼럼"}
            {type === "resources" && "자료"}
            {type === "offline" && "오프라인 프로그램"} 수정
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 모달 내용 */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* 브랜드 수정 폼 */}
          {type === "brands" && (
            <>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">브랜드명</label>
                <input
                  type="text"
                  value={(formData as Brand).name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">카테고리</label>
                <input
                  type="text"
                  value={(formData as Brand).category}
                  onChange={(e) => updateField("category", e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">설명</label>
                <textarea
                  value={(formData as Brand).description}
                  onChange={(e) => updateField("description", e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">썸네일 (이모지)</label>
                <input
                  type="text"
                  value={(formData as Brand).thumbnail}
                  onChange={(e) => updateField("thumbnail", e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">월 매출 (만원)</label>
                <input
                  type="number"
                  value={(formData as Brand).monthlyRevenue}
                  onChange={(e) => updateField("monthlyRevenue", Number(e.target.value))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  초기 투자금 <span className="text-gray-400 text-xs">(보증금 제외)</span>
                </label>
                <input
                  type="text"
                  value={(formData as Brand).totalCost}
                  onChange={(e) => updateField("totalCost", e.target.value)}
                  placeholder="예: 1.5억~2억원"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* 상세 비용 데이터 */}
              <div className="border-t pt-4">
                <div className="mb-3">
                  <h3 className="font-bold text-gray-900">상세 비용 데이터 (매출별 분석)</h3>
                  <p className="text-xs text-gray-500 mt-1">하위 10%, 평균, 상위 10% 매출 시나리오별 비용 입력</p>
                </div>

                {/* 변동비 상세 */}
                    <div className="mb-4 border border-gray-200 rounded-lg p-3 bg-gray-50">
                      <h4 className="text-sm font-bold text-gray-800 mb-3">📊 변동비 상세</h4>

                      {/* 헤더 */}
                      <div className="grid grid-cols-5 gap-2 items-center mb-2 px-2">
                        <div className="text-xs font-bold text-gray-600">항목명</div>
                        <div className="text-xs font-bold text-gray-600">비율</div>
                        <div className="text-xs font-bold text-red-600">하위 10%</div>
                        <div className="text-xs font-bold text-blue-600">평균</div>
                        <div className="text-xs font-bold text-green-600">상위 10%</div>
                      </div>

                      <div className="space-y-2">
                        {(formData as Brand).detailedCosts!.variableCosts.map((cost, idx) => (
                          <div key={idx} className="grid grid-cols-5 gap-2 items-center bg-white p-2 rounded">
                            <input
                              type="text"
                              value={cost.label}
                              onChange={(e) => updateDetailedCost('variableCosts', idx, 'label', e.target.value)}
                              placeholder="항목명"
                              className="px-2 py-1 border border-gray-300 rounded text-sm"
                            />
                            <input
                              type="text"
                              value={cost.percentage || ''}
                              onChange={(e) => updateDetailedCost('variableCosts', idx, 'percentage', e.target.value)}
                              placeholder="예: 36%"
                              className="px-2 py-1 border border-gray-300 rounded text-sm"
                            />
                            <input
                              type="number"
                              value={cost.low}
                              onChange={(e) => updateDetailedCost('variableCosts', idx, 'low', Number(e.target.value))}
                              placeholder="하위 10%"
                              className="px-2 py-1 border border-gray-300 rounded text-sm"
                            />
                            <input
                              type="number"
                              value={cost.mid}
                              onChange={(e) => updateDetailedCost('variableCosts', idx, 'mid', Number(e.target.value))}
                              placeholder="평균"
                              className="px-2 py-1 border border-gray-300 rounded text-sm"
                            />
                            <input
                              type="number"
                              value={cost.high}
                              onChange={(e) => updateDetailedCost('variableCosts', idx, 'high', Number(e.target.value))}
                              placeholder="상위 10%"
                              className="px-2 py-1 border border-gray-300 rounded text-sm"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 고정비 상세 */}
                    <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                      <h4 className="text-sm font-bold text-gray-800 mb-3">🏢 고정비 상세</h4>

                      {/* 헤더 */}
                      <div className="grid grid-cols-4 gap-2 items-center mb-2 px-2">
                        <div className="text-xs font-bold text-gray-600">항목명</div>
                        <div className="text-xs font-bold text-red-600">하위 10%</div>
                        <div className="text-xs font-bold text-blue-600">평균</div>
                        <div className="text-xs font-bold text-green-600">상위 10%</div>
                      </div>

                      <div className="space-y-2">
                        {(formData as Brand).detailedCosts!.fixedCosts.map((cost, idx) => (
                          <div key={idx} className="grid grid-cols-4 gap-2 items-center bg-white p-2 rounded">
                            <input
                              type="text"
                              value={cost.label}
                              onChange={(e) => updateDetailedCost('fixedCosts', idx, 'label', e.target.value)}
                              placeholder="항목명"
                              className="px-2 py-1 border border-gray-300 rounded text-sm"
                            />
                            <input
                              type="number"
                              value={cost.low}
                              onChange={(e) => updateDetailedCost('fixedCosts', idx, 'low', Number(e.target.value))}
                              placeholder="하위 10%"
                              className="px-2 py-1 border border-gray-300 rounded text-sm"
                            />
                            <input
                              type="number"
                              value={cost.mid}
                              onChange={(e) => updateDetailedCost('fixedCosts', idx, 'mid', Number(e.target.value))}
                              placeholder="평균"
                              className="px-2 py-1 border border-gray-300 rounded text-sm"
                            />
                            <input
                              type="number"
                              value={cost.high}
                              onChange={(e) => updateDetailedCost('fixedCosts', idx, 'high', Number(e.target.value))}
                              placeholder="상위 10%"
                              className="px-2 py-1 border border-gray-300 rounded text-sm"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
              </div>
            </>
          )}

          {/* 칼럼 수정 폼 */}
          {type === "columns" && (
            <>
              {/* 썸네일 프리뷰 */}
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 bg-gray-50">
                <label className="block text-sm font-bold text-gray-700 mb-3">썸네일 프리뷰</label>
                <div
                  className="w-full h-48 rounded-xl flex flex-col items-center justify-center text-white relative overflow-hidden"
                  style={{ background: (formData as Column).bgGradient }}
                >
                  <div className="text-6xl mb-3">{(formData as Column).thumbnail || "📝"}</div>
                  <div className="text-xl font-bold text-center px-4">{(formData as Column).title || "제목"}</div>
                  <div className="text-sm mt-2 opacity-90">{(formData as Column).category || "카테고리"}</div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">제목</label>
                <input
                  type="text"
                  value={(formData as Column).title}
                  onChange={(e) => updateField("title", e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">카테고리</label>
                <input
                  type="text"
                  value={(formData as Column).category}
                  onChange={(e) => updateField("category", e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">썸네일 (이모지)</label>
                <input
                  type="text"
                  value={(formData as Column).thumbnail}
                  onChange={(e) => updateField("thumbnail", e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="📝"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">배경 그라디언트</label>
                <div className="grid grid-cols-3 gap-2 mb-2">
                  <button
                    type="button"
                    onClick={() => updateField("bgGradient", "linear-gradient(135deg, #3098F2 0%, #25A6D9 100%)")}
                    className="h-12 rounded-lg"
                    style={{ background: "linear-gradient(135deg, #3098F2 0%, #25A6D9 100%)" }}
                  />
                  <button
                    type="button"
                    onClick={() => updateField("bgGradient", "linear-gradient(135deg, #25A6D9 0%, #11BFAE 100%)")}
                    className="h-12 rounded-lg"
                    style={{ background: "linear-gradient(135deg, #25A6D9 0%, #11BFAE 100%)" }}
                  />
                  <button
                    type="button"
                    onClick={() => updateField("bgGradient", "linear-gradient(135deg, #667eea 0%, #764ba2 100%)")}
                    className="h-12 rounded-lg"
                    style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
                  />
                  <button
                    type="button"
                    onClick={() => updateField("bgGradient", "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)")}
                    className="h-12 rounded-lg"
                    style={{ background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" }}
                  />
                  <button
                    type="button"
                    onClick={() => updateField("bgGradient", "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)")}
                    className="h-12 rounded-lg"
                    style={{ background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" }}
                  />
                  <button
                    type="button"
                    onClick={() => updateField("bgGradient", "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)")}
                    className="h-12 rounded-lg"
                    style={{ background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)" }}
                  />
                </div>
                <input
                  type="text"
                  value={(formData as Column).bgGradient}
                  onChange={(e) => updateField("bgGradient", e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-mono"
                  placeholder="linear-gradient(135deg, #3098F2 0%, #25A6D9 100%)"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">요약</label>
                <textarea
                  value={(formData as Column).summary}
                  onChange={(e) => updateField("summary", e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">본문</label>
                <textarea
                  value={(formData as Column).content}
                  onChange={(e) => updateField("content", e.target.value)}
                  rows={10}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">날짜</label>
                <input
                  type="text"
                  value={(formData as Column).date}
                  onChange={(e) => updateField("date", e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={(formData as Column).isNew}
                  onChange={(e) => updateField("isNew", e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <label className="text-sm font-bold text-gray-700">NEW 배지 표시</label>
              </div>
            </>
          )}

          {/* 자료실 수정 폼 */}
          {type === "resources" && (
            <>
              {/* 썸네일 프리뷰 */}
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 bg-gray-50">
                <label className="block text-sm font-bold text-gray-700 mb-3">썸네일 프리뷰</label>
                <div className="w-full h-48 rounded-xl flex flex-col items-center justify-center bg-white border-2 border-gray-200 relative overflow-hidden">
                  <div className="text-6xl mb-3">{(formData as Resource).thumbnail || "📄"}</div>
                  <div className="text-xl font-bold text-gray-900 text-center px-4">{(formData as Resource).title || "제목"}</div>
                  <div className="text-sm text-gray-600 mt-2">{(formData as Resource).category || "카테고리"}</div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">제목</label>
                <input
                  type="text"
                  value={(formData as Resource).title}
                  onChange={(e) => updateField("title", e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">카테고리</label>
                <input
                  type="text"
                  value={(formData as Resource).category}
                  onChange={(e) => updateField("category", e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">썸네일 (이모지)</label>
                <input
                  type="text"
                  value={(formData as Resource).thumbnail}
                  onChange={(e) => updateField("thumbnail", e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="📄"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">요약</label>
                <textarea
                  value={(formData as Resource).summary}
                  onChange={(e) => updateField("summary", e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">본문</label>
                <textarea
                  value={(formData as Resource).content}
                  onChange={(e) => updateField("content", e.target.value)}
                  rows={10}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">날짜</label>
                <input
                  type="text"
                  value={(formData as Resource).date}
                  onChange={(e) => updateField("date", e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </>
          )}

          {/* 오프라인 프로그램 수정 폼 */}
          {type === "offline" && (
            <>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">프로그램명</label>
                <input
                  type="text"
                  value={(formData as OfflineProgram).name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">제목</label>
                <input
                  type="text"
                  value={(formData as OfflineProgram).title}
                  onChange={(e) => updateField("title", e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">카테고리</label>
                <input
                  type="text"
                  value={(formData as OfflineProgram).category}
                  onChange={(e) => updateField("category", e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">설명</label>
                <textarea
                  value={(formData as OfflineProgram).description}
                  onChange={(e) => updateField("description", e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">이미지 (이모지)</label>
                <input
                  type="text"
                  value={(formData as OfflineProgram).imageUrl}
                  onChange={(e) => updateField("imageUrl", e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">가격 (원)</label>
                  <input
                    type="number"
                    value={(formData as OfflineProgram).price}
                    onChange={(e) => updateField("price", Number(e.target.value))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">최대 참가자</label>
                  <input
                    type="number"
                    value={(formData as OfflineProgram).maxParticipants}
                    onChange={(e) => updateField("maxParticipants", Number(e.target.value))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">날짜</label>
                <input
                  type="text"
                  value={(formData as OfflineProgram).date}
                  onChange={(e) => updateField("date", e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">시간</label>
                <input
                  type="text"
                  value={(formData as OfflineProgram).time}
                  onChange={(e) => updateField("time", e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">장소</label>
                <input
                  type="text"
                  value={(formData as OfflineProgram).location}
                  onChange={(e) => updateField("location", e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">소요시간</label>
                <input
                  type="text"
                  value={(formData as OfflineProgram).duration}
                  onChange={(e) => updateField("duration", e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </>
          )}

          {/* 저장/취소 버튼 */}
          <div className="flex gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl hover:shadow-lg transition-all"
            >
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
