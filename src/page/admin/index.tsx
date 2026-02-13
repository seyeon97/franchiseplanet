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

  // localStorage에서 데이터 로드
  const loadData = () => {
    if (typeof window !== 'undefined') {
      setBrands(JSON.parse(localStorage.getItem("brands") || "[]"));
      setColumns(JSON.parse(localStorage.getItem("columns") || "[]"));
      setResources(JSON.parse(localStorage.getItem("resources") || "[]"));
      setOfflinePrograms(JSON.parse(localStorage.getItem("offlinePrograms") || "[]"));
    }
  };

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
