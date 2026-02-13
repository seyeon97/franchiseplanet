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
                  <button className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl hover:shadow-lg transition-all">
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
                          className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/50 transition-all cursor-pointer"
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
                          className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/50 transition-all cursor-pointer"
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
                          className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/50 transition-all cursor-pointer"
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
                          className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/50 transition-all cursor-pointer"
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
    </div>
  );
}
