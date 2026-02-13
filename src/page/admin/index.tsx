"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

type TabType = "brands" | "columns" | "resources" | "offline";

interface Brand {
  id: number;
  name: string;
  category: string;
  totalCost: number;
  thumbnail: string;
  description: string;
  monthlyRevenue: number;
  fixedCosts: {
    franchise: number;
    interior: number;
    deposit: number;
    equipment: number;
  };
  variableCosts: {
    rent: number;
    labor: number;
    materials: number;
    utilities: number;
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
  category: string;
  summary: string;
  content: string;
  thumbnail: string;
  date: string;
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

  // 수정 모달 상태
  const [editModal, setEditModal] = useState<{
    type: TabType | null;
    data: Brand | Column | Resource | OfflineProgram | null;
  }>({ type: null, data: null });

  // 삭제 함수들
  const deleteBrand = (id: number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      const updated = brands.filter(b => b.id !== id);
      setBrands(updated);
      localStorage.setItem("brands", JSON.stringify(updated));
    }
  };

  const deleteColumn = (id: number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      const updated = columns.filter(c => c.id !== id);
      setColumns(updated);
      localStorage.setItem("columns", JSON.stringify(updated));
    }
  };

  const deleteResource = (id: number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      const updated = resources.filter(r => r.id !== id);
      setResources(updated);
      localStorage.setItem("resources", JSON.stringify(updated));
    }
  };

  const deleteOfflineProgram = (id: number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      const updated = offlinePrograms.filter(p => p.id !== id);
      setOfflinePrograms(updated);
      localStorage.setItem("offlinePrograms", JSON.stringify(updated));
    }
  };

  // 새로 추가 함수들
  const createNewBrand = () => {
    const newId = brands.length > 0 ? Math.max(...brands.map(b => b.id)) + 1 : 1;
    const newBrand: Brand = {
      id: newId,
      name: "새 브랜드",
      category: "카테고리",
      totalCost: 0,
      thumbnail: "🏪",
      description: "브랜드 설명을 입력하세요",
      monthlyRevenue: 0,
      fixedCosts: { franchise: 0, interior: 0, deposit: 0, equipment: 0 },
      variableCosts: { rent: 0, labor: 0, materials: 0, utilities: 0 },
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
      category: "카테고리",
      summary: "요약을 입력하세요",
      content: "본문을 입력하세요",
      thumbnail: "📄",
      date: new Date().toLocaleDateString('ko-KR'),
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
    setEditModal({ type: null, data: null });
  };

  // 초기 데이터 생성
  const initializeData = () => {
    if (typeof window !== 'undefined') {
      // 브랜드 초기 데이터
      const initialBrands: Brand[] = [
        {
          id: 1,
          name: "맘스터치",
          category: "치킨·버거",
          totalCost: 8500,
          thumbnail: "🍔",
          description: "국내 대표 프리미엄 버거 프랜차이즈",
          monthlyRevenue: 12000,
          fixedCosts: { franchise: 1500, interior: 3000, deposit: 2000, equipment: 2000 },
          variableCosts: { rent: 300, labor: 250, materials: 350, utilities: 100 }
        },
        {
          id: 2,
          name: "컴포즈커피",
          category: "카페·디저트",
          totalCost: 7800,
          thumbnail: "☕",
          description: "합리적인 가격의 커피 전문점",
          monthlyRevenue: 10000,
          fixedCosts: { franchise: 1000, interior: 2500, deposit: 2000, equipment: 2300 },
          variableCosts: { rent: 250, labor: 200, materials: 300, utilities: 80 }
        },
        {
          id: 3,
          name: "교촌치킨",
          category: "치킨",
          totalCost: 9500,
          thumbnail: "🍗",
          description: "오리지널 간장치킨의 명가",
          monthlyRevenue: 15000,
          fixedCosts: { franchise: 2000, interior: 3500, deposit: 2000, equipment: 2000 },
          variableCosts: { rent: 300, labor: 280, materials: 400, utilities: 120 }
        },
        {
          id: 4,
          name: "설빙",
          category: "디저트",
          totalCost: 6200,
          thumbnail: "🍧",
          description: "프리미엄 빙수 디저트 카페",
          monthlyRevenue: 8500,
          fixedCosts: { franchise: 1200, interior: 2000, deposit: 1500, equipment: 1500 },
          variableCosts: { rent: 200, labor: 180, materials: 250, utilities: 70 }
        },
        {
          id: 5,
          name: "본죽",
          category: "한식",
          totalCost: 7000,
          thumbnail: "🍲",
          description: "건강한 죽 전문 프랜차이즈",
          monthlyRevenue: 9000,
          fixedCosts: { franchise: 1300, interior: 2500, deposit: 1700, equipment: 1500 },
          variableCosts: { rent: 220, labor: 200, materials: 280, utilities: 80 }
        }
      ];

      // 칼럼 초기 데이터
      const initialColumns: Column[] = [
        {
          id: 1,
          title: "프랜차이즈 창업, 이것만은 꼭!",
          category: "창업 가이드",
          summary: "성공적인 프랜차이즈 창업을 위한 필수 체크리스트",
          content: "프랜차이즈 창업을 준비하시나요? 성공적인 창업을 위해 반드시 확인해야 할 사항들을 정리했습니다.",
          thumbnail: "📋",
          bgGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          date: "2024.01.15",
          isNew: true
        },
        {
          id: 2,
          title: "입지 선정의 모든 것",
          category: "입지 분석",
          summary: "매장 위치가 성공의 80%를 결정합니다",
          content: "좋은 입지란 무엇일까요? 입지 선정 시 고려해야 할 핵심 요소들을 알아봅니다.",
          thumbnail: "📍",
          bgGradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
          date: "2024.01.10",
          isNew: true
        },
        {
          id: 3,
          title: "2024 트렌드 분석",
          category: "트렌드",
          summary: "올해 뜨는 업종은 무엇일까?",
          content: "2024년 프랜차이즈 시장의 주요 트렌드와 유망 업종을 분석합니다.",
          thumbnail: "📈",
          bgGradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
          date: "2024.01.05",
          isNew: false
        }
      ];

      // 자료실 초기 데이터
      const initialResources: Resource[] = [
        {
          id: 1,
          title: "프랜차이즈 계약서 샘플",
          category: "계약서",
          summary: "표준 프랜차이즈 계약서 양식 및 주의사항",
          content: "프랜차이즈 계약 시 반드시 확인해야 할 조항들과 표준 계약서 양식을 제공합니다.",
          thumbnail: "📄",
          date: "2024.01.15"
        },
        {
          id: 2,
          title: "창업 자금 조달 가이드",
          category: "자금",
          summary: "정부 지원금부터 대출까지 총정리",
          content: "창업 자금 마련을 위한 다양한 방법과 정부 지원 제도를 소개합니다.",
          thumbnail: "💰",
          date: "2024.01.12"
        },
        {
          id: 3,
          title: "세무 회계 기초",
          category: "세무",
          summary: "창업자가 알아야 할 세무 지식",
          content: "사업자 등록부터 부가가치세, 종합소득세까지 기본적인 세무 지식을 정리했습니다.",
          thumbnail: "📊",
          date: "2024.01.08"
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

        setBrands(brandsData ? JSON.parse(brandsData) : []);
        setColumns(columnsData ? JSON.parse(columnsData) : []);
        setResources(resourcesData ? JSON.parse(resourcesData) : []);
        setOfflinePrograms(offlineData ? JSON.parse(offlineData) : []);
      } catch (error) {
        console.error("데이터 로드 오류:", error);
      }
    }
  };

  useEffect(() => {
    // 처음 마운트 시 데이터가 없으면 초기 데이터 자동 생성
    if (typeof window !== 'undefined') {
      const hasData = localStorage.getItem("brands") ||
                      localStorage.getItem("columns") ||
                      localStorage.getItem("resources") ||
                      localStorage.getItem("offlinePrograms");

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
                        offlinePrograms.length
                      }개의 콘텐츠
                    </p>
                  </div>
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
                      brands.map((brand) => (
                        <div
                          key={brand.id}
                          onClick={() => setEditModal({ type: "brands", data: brand })}
                          className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/50 transition-all group cursor-pointer"
                        >
                          <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                            {brand.thumbnail || "🏪"}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-bold text-gray-900 truncate">{brand.name}</h3>
                              <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full flex-shrink-0">
                                {brand.category}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500 truncate">{brand.description}</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="text-sm font-bold text-gray-900">
                              {brand.totalCost.toLocaleString()}만원
                            </div>
                            <div className="text-xs text-gray-500 mt-0.5">초기 비용</div>
                          </div>
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
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 수정 모달 */}
      {editModal.type && editModal.data && (
        <EditModal
          type={editModal.type}
          data={editModal.data}
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
  type: TabType;
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

  const updateNestedField = (parent: string, field: string, value: number) => {
    const brandData = formData as Brand;

    if (parent === 'fixedCosts') {
      const updatedFixedCosts = {
        ...brandData.fixedCosts,
        [field]: value,
      };
      const totalCost = updatedFixedCosts.franchise + updatedFixedCosts.interior + updatedFixedCosts.deposit + updatedFixedCosts.equipment;
      setFormData({
        ...formData,
        fixedCosts: updatedFixedCosts,
        totalCost: totalCost,
      });
    } else if (parent === 'variableCosts') {
      const updatedVariableCosts = {
        ...brandData.variableCosts,
        [field]: value,
      };
      setFormData({
        ...formData,
        variableCosts: updatedVariableCosts,
      });
    }
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

              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-gray-900">고정 비용 (만원)</h3>
                  <div className="text-sm">
                    <span className="text-gray-500">총 고정비: </span>
                    <span className="font-bold text-blue-600">
                      {((formData as Brand).fixedCosts.franchise +
                        (formData as Brand).fixedCosts.interior +
                        (formData as Brand).fixedCosts.deposit +
                        (formData as Brand).fixedCosts.equipment).toLocaleString()}만원
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">가맹비</label>
                    <input
                      type="number"
                      value={(formData as Brand).fixedCosts.franchise}
                      onChange={(e) => updateNestedField("fixedCosts", "franchise", Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">인테리어</label>
                    <input
                      type="number"
                      value={(formData as Brand).fixedCosts.interior}
                      onChange={(e) => updateNestedField("fixedCosts", "interior", Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">보증금</label>
                    <input
                      type="number"
                      value={(formData as Brand).fixedCosts.deposit}
                      onChange={(e) => updateNestedField("fixedCosts", "deposit", Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">장비</label>
                    <input
                      type="number"
                      value={(formData as Brand).fixedCosts.equipment}
                      onChange={(e) => updateNestedField("fixedCosts", "equipment", Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-gray-900">변동 비용 (만원/월)</h3>
                  <div className="text-sm">
                    <span className="text-gray-500">총 변동비: </span>
                    <span className="font-bold text-orange-600">
                      {((formData as Brand).variableCosts.rent +
                        (formData as Brand).variableCosts.labor +
                        (formData as Brand).variableCosts.materials +
                        (formData as Brand).variableCosts.utilities).toLocaleString()}만원/월
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">임대료</label>
                    <input
                      type="number"
                      value={(formData as Brand).variableCosts.rent}
                      onChange={(e) => updateNestedField("variableCosts", "rent", Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">인건비</label>
                    <input
                      type="number"
                      value={(formData as Brand).variableCosts.labor}
                      onChange={(e) => updateNestedField("variableCosts", "labor", Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">재료비</label>
                    <input
                      type="number"
                      value={(formData as Brand).variableCosts.materials}
                      onChange={(e) => updateNestedField("variableCosts", "materials", Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">공과금</label>
                    <input
                      type="number"
                      value={(formData as Brand).variableCosts.utilities}
                      onChange={(e) => updateNestedField("variableCosts", "utilities", Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
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
