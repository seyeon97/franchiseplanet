"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type TabType = "brands" | "columns" | "resources" | "offline";

export default function AdminView() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("brands");

  const tabs = [
    { id: "brands" as TabType, label: "브랜드 관리", icon: "🏪" },
    { id: "columns" as TabType, label: "칼럼 관리", icon: "📝" },
    { id: "resources" as TabType, label: "자료실 관리", icon: "📚" },
    { id: "offline" as TabType, label: "오프라인 관리", icon: "👥" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-black text-gray-900">관리자 페이지</h1>
                <p className="text-sm text-gray-500 font-medium mt-1">프차플래닛 콘텐츠 관리</p>
              </div>
              <button
                onClick={() => router.push("/")}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors"
              >
                홈으로
              </button>
            </div>

            {/* 탭 메뉴 */}
            <div className="flex gap-2 mt-6 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 콘텐츠 영역 */}
        <div className="p-6">
          {activeTab === "brands" && <BrandManagement />}
          {activeTab === "columns" && <ColumnManagement />}
          {activeTab === "resources" && <ResourceManagement />}
          {activeTab === "offline" && <OfflineManagement />}
        </div>
      </div>
    </div>
  );
}

// 브랜드 관리 컴포넌트
function BrandManagement() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    totalCost: "",
    thumbnail: "",
    description: "",
    monthlyRevenue: "",
    fixedCosts: {
      franchise: "",
      interior: "",
      deposit: "",
      equipment: "",
    },
    variableCosts: {
      rent: "",
      labor: "",
      materials: "",
      utilities: "",
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // localStorage에 저장
    const brands = JSON.parse(localStorage.getItem("adminBrands") || "[]");
    const newBrand = {
      id: Date.now(),
      ...formData,
      totalCost: parseInt(formData.totalCost),
      monthlyRevenue: parseInt(formData.monthlyRevenue),
      fixedCosts: {
        franchise: parseInt(formData.fixedCosts.franchise),
        interior: parseInt(formData.fixedCosts.interior),
        deposit: parseInt(formData.fixedCosts.deposit),
        equipment: parseInt(formData.fixedCosts.equipment),
      },
      variableCosts: {
        rent: parseInt(formData.variableCosts.rent),
        labor: parseInt(formData.variableCosts.labor),
        materials: parseInt(formData.variableCosts.materials),
        utilities: parseInt(formData.variableCosts.utilities),
      },
    };
    brands.push(newBrand);
    localStorage.setItem("adminBrands", JSON.stringify(brands));

    // 폼 초기화
    setFormData({
      name: "",
      category: "",
      totalCost: "",
      thumbnail: "",
      description: "",
      monthlyRevenue: "",
      fixedCosts: { franchise: "", interior: "", deposit: "", equipment: "" },
      variableCosts: { rent: "", labor: "", materials: "", utilities: "" },
    });
    setShowForm(false);
    alert("브랜드가 등록되었습니다!");
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-black text-gray-900">브랜드 관리</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-bold hover:shadow-lg transition-all"
        >
          {showForm ? "취소" : "+ 브랜드 추가"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">브랜드명</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="예: 메가커피"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">카테고리</label>
              <input
                type="text"
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="예: 카페"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">총 창업 비용 (원)</label>
              <input
                type="number"
                required
                value={formData.totalCost}
                onChange={(e) => setFormData({ ...formData, totalCost: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="예: 50000000"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">월 평균 매출 (원)</label>
              <input
                type="number"
                required
                value={formData.monthlyRevenue}
                onChange={(e) => setFormData({ ...formData, monthlyRevenue: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="예: 30000000"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">썸네일 (이모지)</label>
              <input
                type="text"
                required
                value={formData.thumbnail}
                onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="예: ☕"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-900 mb-2">설명</label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                placeholder="브랜드 설명을 입력하세요"
              />
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-black text-gray-900 mb-4">고정비</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">가맹비 (원)</label>
                <input
                  type="number"
                  required
                  value={formData.fixedCosts.franchise}
                  onChange={(e) => setFormData({ ...formData, fixedCosts: { ...formData.fixedCosts, franchise: e.target.value } })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">인테리어 (원)</label>
                <input
                  type="number"
                  required
                  value={formData.fixedCosts.interior}
                  onChange={(e) => setFormData({ ...formData, fixedCosts: { ...formData.fixedCosts, interior: e.target.value } })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">보증금 (원)</label>
                <input
                  type="number"
                  required
                  value={formData.fixedCosts.deposit}
                  onChange={(e) => setFormData({ ...formData, fixedCosts: { ...formData.fixedCosts, deposit: e.target.value } })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">장비/집기 (원)</label>
                <input
                  type="number"
                  required
                  value={formData.fixedCosts.equipment}
                  onChange={(e) => setFormData({ ...formData, fixedCosts: { ...formData.fixedCosts, equipment: e.target.value } })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-black text-gray-900 mb-4">변동비</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">임대료 (원/월)</label>
                <input
                  type="number"
                  required
                  value={formData.variableCosts.rent}
                  onChange={(e) => setFormData({ ...formData, variableCosts: { ...formData.variableCosts, rent: e.target.value } })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">인건비 (원/월)</label>
                <input
                  type="number"
                  required
                  value={formData.variableCosts.labor}
                  onChange={(e) => setFormData({ ...formData, variableCosts: { ...formData.variableCosts, labor: e.target.value } })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">재료비 (원/월)</label>
                <input
                  type="number"
                  required
                  value={formData.variableCosts.materials}
                  onChange={(e) => setFormData({ ...formData, variableCosts: { ...formData.variableCosts, materials: e.target.value } })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">공과금 (원/월)</label>
                <input
                  type="number"
                  required
                  value={formData.variableCosts.utilities}
                  onChange={(e) => setFormData({ ...formData, variableCosts: { ...formData.variableCosts, utilities: e.target.value } })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all"
            >
              등록하기
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-6 bg-gray-100 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all"
            >
              취소
            </button>
          </div>
        </form>
      )}

      {/* 등록된 브랜드 목록 */}
      <BrandList />
    </div>
  );
}

// 브랜드 목록 컴포넌트
function BrandList() {
  const [brands, setBrands] = useState<any[]>([]);

  useState(() => {
    const savedBrands = localStorage.getItem("adminBrands");
    if (savedBrands) {
      setBrands(JSON.parse(savedBrands));
    }
  });

  const handleDelete = (id: number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      const updatedBrands = brands.filter((brand) => brand.id !== id);
      setBrands(updatedBrands);
      localStorage.setItem("adminBrands", JSON.stringify(updatedBrands));
    }
  };

  if (brands.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center">
        <p className="text-gray-500 font-medium">등록된 브랜드가 없습니다</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {brands.map((brand) => (
        <div key={brand.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-start justify-between mb-3">
            <div className="text-4xl">{brand.thumbnail}</div>
            <button
              onClick={() => handleDelete(brand.id)}
              className="text-red-500 hover:text-red-700 font-bold text-sm"
            >
              삭제
            </button>
          </div>
          <h3 className="text-lg font-black text-gray-900 mb-1">{brand.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{brand.category}</p>
          <p className="text-sm text-gray-500 mb-3 line-clamp-2">{brand.description}</p>
          <div className="border-t pt-3">
            <p className="text-xs text-gray-500 mb-1">총 창업비용</p>
            <p className="text-lg font-black text-gray-900">{brand.totalCost.toLocaleString()}원</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// 칼럼 관리 컴포넌트
function ColumnManagement() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    summary: "",
    content: "",
    thumbnail: "",
    bgGradient: "from-[#3098F2] to-white",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const columns = JSON.parse(localStorage.getItem("adminColumns") || "[]");
    const newColumn = {
      id: Date.now(),
      ...formData,
      date: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\. /g, '.').replace(/\.$/, ''),
      isNew: true,
    };
    columns.push(newColumn);
    localStorage.setItem("adminColumns", JSON.stringify(columns));

    setFormData({
      title: "",
      category: "",
      summary: "",
      content: "",
      thumbnail: "",
      bgGradient: "from-[#3098F2] to-white",
    });
    setShowForm(false);
    alert("칼럼이 등록되었습니다!");
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-black text-gray-900">칼럼 관리</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-bold hover:shadow-lg transition-all"
        >
          {showForm ? "취소" : "+ 칼럼 추가"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">제목</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="칼럼 제목"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">카테고리</label>
              <input
                type="text"
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="예: 시장분석"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">썸네일 (이모지)</label>
              <input
                type="text"
                required
                value={formData.thumbnail}
                onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="예: 📊"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">배경 그라디언트</label>
              <select
                value={formData.bgGradient}
                onChange={(e) => setFormData({ ...formData, bgGradient: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="from-[#3098F2] to-white">파란색</option>
                <option value="from-[#25A6D9] to-white">하늘색</option>
                <option value="from-[#11BFAE] to-white">청록색</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-900 mb-2">요약</label>
              <input
                type="text"
                required
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="짧은 요약 (1-2줄)"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-900 mb-2">내용 (마크다운)</label>
              <textarea
                required
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 h-64 font-mono text-sm"
                placeholder="# 제목&#10;## 소제목&#10;내용..."
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all"
            >
              등록하기
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-6 bg-gray-100 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all"
            >
              취소
            </button>
          </div>
        </form>
      )}

      <ColumnList />
    </div>
  );
}

// 칼럼 목록 컴포넌트
function ColumnList() {
  const [columns, setColumns] = useState<any[]>([]);

  useState(() => {
    const savedColumns = localStorage.getItem("adminColumns");
    if (savedColumns) {
      setColumns(JSON.parse(savedColumns));
    }
  });

  const handleDelete = (id: number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      const updatedColumns = columns.filter((column) => column.id !== id);
      setColumns(updatedColumns);
      localStorage.setItem("adminColumns", JSON.stringify(updatedColumns));
    }
  };

  if (columns.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center">
        <p className="text-gray-500 font-medium">등록된 칼럼이 없습니다</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {columns.map((column) => (
        <div key={column.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4 flex-1">
              <div className="text-4xl">{column.thumbnail}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                    {column.category}
                  </span>
                  <span className="text-xs text-gray-500">{column.date}</span>
                </div>
                <h3 className="text-lg font-black text-gray-900 mb-1">{column.title}</h3>
                <p className="text-sm text-gray-600">{column.summary}</p>
              </div>
            </div>
            <button
              onClick={() => handleDelete(column.id)}
              className="text-red-500 hover:text-red-700 font-bold text-sm ml-4"
            >
              삭제
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// 자료실 관리 컴포넌트
function ResourceManagement() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    summary: "",
    content: "",
    thumbnail: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const resources = JSON.parse(localStorage.getItem("adminResources") || "[]");
    const newResource = {
      id: Date.now(),
      ...formData,
      date: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\. /g, '.').replace(/\.$/, ''),
    };
    resources.push(newResource);
    localStorage.setItem("adminResources", JSON.stringify(resources));

    setFormData({
      title: "",
      category: "",
      summary: "",
      content: "",
      thumbnail: "",
    });
    setShowForm(false);
    alert("자료가 등록되었습니다!");
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-black text-gray-900">자료실 관리</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-bold hover:shadow-lg transition-all"
        >
          {showForm ? "취소" : "+ 자료 추가"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">제목</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="자료 제목"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">카테고리</label>
              <input
                type="text"
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="예: 창업가이드"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">썸네일 (이모지)</label>
              <input
                type="text"
                required
                value={formData.thumbnail}
                onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="예: 📄"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-900 mb-2">요약</label>
              <input
                type="text"
                required
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="짧은 설명"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-900 mb-2">내용</label>
              <textarea
                required
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 h-64"
                placeholder="자세한 내용..."
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all"
            >
              등록하기
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-6 bg-gray-100 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all"
            >
              취소
            </button>
          </div>
        </form>
      )}

      <ResourceList />
    </div>
  );
}

// 자료실 목록 컴포넌트
function ResourceList() {
  const [resources, setResources] = useState<any[]>([]);

  useState(() => {
    const savedResources = localStorage.getItem("adminResources");
    if (savedResources) {
      setResources(JSON.parse(savedResources));
    }
  });

  const handleDelete = (id: number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      const updatedResources = resources.filter((resource) => resource.id !== id);
      setResources(updatedResources);
      localStorage.setItem("adminResources", JSON.stringify(updatedResources));
    }
  };

  if (resources.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center">
        <p className="text-gray-500 font-medium">등록된 자료가 없습니다</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {resources.map((resource) => (
        <div key={resource.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-start justify-between mb-3">
            <div className="text-4xl">{resource.thumbnail}</div>
            <button
              onClick={() => handleDelete(resource.id)}
              className="text-red-500 hover:text-red-700 font-bold text-sm"
            >
              삭제
            </button>
          </div>
          <div className="mb-2">
            <span className="text-xs font-bold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
              {resource.category}
            </span>
          </div>
          <h3 className="text-lg font-black text-gray-900 mb-1">{resource.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{resource.summary}</p>
          <p className="text-xs text-gray-500">{resource.date}</p>
        </div>
      ))}
    </div>
  );
}

// 오프라인 관리 컴포넌트
function OfflineManagement() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    description: "",
    imageUrl: "",
    price: "",
    date: "",
    time: "",
    location: "",
    duration: "",
    maxParticipants: "",
    bgGradient: "from-[#2F85F2] to-[#1F9CD3]",
    details: ["", "", "", "", ""],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const programs = JSON.parse(localStorage.getItem("adminOfflinePrograms") || "[]");
    const newProgram = {
      id: Date.now(),
      ...formData,
      category: "임장",
      price: parseInt(formData.price),
      maxParticipants: parseInt(formData.maxParticipants),
      details: formData.details.filter(d => d.trim() !== ""),
    };
    programs.push(newProgram);
    localStorage.setItem("adminOfflinePrograms", JSON.stringify(programs));

    setFormData({
      name: "",
      title: "",
      description: "",
      imageUrl: "",
      price: "",
      date: "",
      time: "",
      location: "",
      duration: "",
      maxParticipants: "",
      bgGradient: "from-[#2F85F2] to-[#1F9CD3]",
      details: ["", "", "", "", ""],
    });
    setShowForm(false);
    alert("오프라인 프로그램이 등록되었습니다!");
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-black text-gray-900">오프라인 프로그램 관리</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-bold hover:shadow-lg transition-all"
        >
          {showForm ? "취소" : "+ 프로그램 추가"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">강사명</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="예: 장사해커 컨설턴트"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">프로그램명</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="예: 강남역 임장"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">이모지</label>
              <input
                type="text"
                required
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="예: 👨‍💼"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">가격 (원)</label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="예: 150000"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">일시</label>
              <input
                type="text"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="예: 2024년 3월 15일 (토)"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">시간</label>
              <input
                type="text"
                required
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="예: 오전 10:00 - 오후 2:00"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">장소</label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="예: 강남역 2번 출구 앞"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">소요시간</label>
              <input
                type="text"
                required
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="예: 4시간"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">정원 (명)</label>
              <input
                type="number"
                required
                value={formData.maxParticipants}
                onChange={(e) => setFormData({ ...formData, maxParticipants: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="예: 10"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">배경색</label>
              <select
                value={formData.bgGradient}
                onChange={(e) => setFormData({ ...formData, bgGradient: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="from-[#2F85F2] to-[#1F9CD3]">파란색</option>
                <option value="from-[#1F9CD3] to-[#0BB7AD]">청록색</option>
                <option value="from-[#0BB7AD] to-[#08C698]">녹색</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-900 mb-2">설명</label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                placeholder="프로그램 설명"
              />
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-black text-gray-900 mb-4">프로그램 상세 내용 (최대 5개)</h3>
            <div className="space-y-3">
              {formData.details.map((detail, idx) => (
                <input
                  key={idx}
                  type="text"
                  value={detail}
                  onChange={(e) => {
                    const newDetails = [...formData.details];
                    newDetails[idx] = e.target.value;
                    setFormData({ ...formData, details: newDetails });
                  }}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`상세 내용 ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all"
            >
              등록하기
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-6 bg-gray-100 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all"
            >
              취소
            </button>
          </div>
        </form>
      )}

      <OfflineProgramList />
    </div>
  );
}

// 오프라인 프로그램 목록 컴포넌트
function OfflineProgramList() {
  const [programs, setPrograms] = useState<any[]>([]);

  useState(() => {
    const savedPrograms = localStorage.getItem("adminOfflinePrograms");
    if (savedPrograms) {
      setPrograms(JSON.parse(savedPrograms));
    }
  });

  const handleDelete = (id: number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      const updatedPrograms = programs.filter((program) => program.id !== id);
      setPrograms(updatedPrograms);
      localStorage.setItem("adminOfflinePrograms", JSON.stringify(updatedPrograms));
    }
  };

  if (programs.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center">
        <p className="text-gray-500 font-medium">등록된 프로그램이 없습니다</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {programs.map((program) => (
        <div key={program.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-start justify-between mb-3">
            <div className="text-4xl">{program.imageUrl}</div>
            <button
              onClick={() => handleDelete(program.id)}
              className="text-red-500 hover:text-red-700 font-bold text-sm"
            >
              삭제
            </button>
          </div>
          <h3 className="text-lg font-black text-gray-900 mb-1">{program.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{program.name}</p>
          <p className="text-sm text-gray-500 mb-3 line-clamp-2">{program.description}</p>
          <div className="border-t pt-3 space-y-1">
            <p className="text-xs text-gray-500">일시: {program.date}</p>
            <p className="text-xs text-gray-500">장소: {program.location}</p>
            <p className="text-lg font-black text-gray-900 mt-2">{program.price.toLocaleString()}원</p>
          </div>
        </div>
      ))}
    </div>
  );
}
