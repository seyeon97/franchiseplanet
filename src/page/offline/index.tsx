"use client";

import { useRef, useState, useEffect } from "react";

// 아임포트 타입 선언
interface IamportResponse {
  success: boolean;
  error_msg?: string;
  imp_uid?: string;
  merchant_uid?: string;
  pay_method?: string;
  paid_amount?: number;
  status?: string;
}

interface IamportInstance {
  init: (code: string) => void;
  request_pay: (params: Record<string, string | number>, callback: (response: IamportResponse) => void) => void;
}

declare global {
  interface Window {
    IMP?: IamportInstance;
  }
}

interface Program {
  id: number;
  name: string;
  category: string;
  title: string;
  description: string;
  bgColor: string;
  imageUrl: string;
  price: number;
  date: string;
  time: string;
  location: string;
  duration: string;
  maxParticipants: number;
  details: string[];
}

export default function OfflineView() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isScrollingRef = useRef(false);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [iamportLoaded, setIamportLoaded] = useState(false);

  // 아임포트 SDK 로드
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.IMP) {
      const script = document.createElement('script');
      script.src = 'https://cdn.iamport.kr/v1/iamport.js';
      script.async = true;
      script.onload = () => {
        setIamportLoaded(true);
      };
      document.head.appendChild(script);

      return () => {
        // Cleanup
        const scriptToRemove = document.querySelector('script[src="https://cdn.iamport.kr/v1/iamport.js"]');
        if (scriptToRemove) {
          document.head.removeChild(scriptToRemove);
        }
      };
    } else if (window.IMP) {
      setIamportLoaded(true);
    }
  }, []);

  // 스크롤 위치에 따라 현재 인덱스 업데이트
  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current && !isScrollingRef.current) {
        const scrollLeft = scrollRef.current.scrollLeft;
        const width = scrollRef.current.offsetWidth;
        const index = Math.round(scrollLeft / width);

        // Clear previous timeout
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        // Set a timeout to snap to the nearest card after scrolling stops
        scrollTimeoutRef.current = setTimeout(() => {
          if (scrollRef.current) {
            const currentScrollLeft = scrollRef.current.scrollLeft;
            const currentWidth = scrollRef.current.offsetWidth;
            const targetIndex = Math.round(currentScrollLeft / currentWidth);

            setCurrentIndex(targetIndex);

            // Ensure we're snapped to the correct position
            isScrollingRef.current = true;
            scrollRef.current.scrollTo({
              left: currentWidth * targetIndex,
              behavior: "smooth",
            });

            setTimeout(() => {
              isScrollingRef.current = false;
            }, 300);
          }
        }, 50);
      }
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScroll);
      return () => {
        scrollElement.removeEventListener("scroll", handleScroll);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      };
    }
  }, []);

  // 인디케이터 클릭 시 해당 카드로 스크롤
  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      isScrollingRef.current = true;
      const width = scrollRef.current.offsetWidth;
      scrollRef.current.scrollTo({
        left: width * index,
        behavior: "smooth",
      });
      setCurrentIndex(index);

      setTimeout(() => {
        isScrollingRef.current = false;
      }, 300);
    }
  };

  // 예시 임장 프로그램 데이터
  const programs: Program[] = [
    {
      id: 1,
      name: "장사해커 컨설턴트",
      category: "임장",
      title: "강남역 임장",
      description: "강남역 상권 분석부터 유동인구 파악까지 전문가와 함께하는 현장 답사",
      bgColor: "from-[#2F85F2] to-[#1F9CD3]",
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
        "상권분석 리포트 제공 (PDF)",
      ],
    },
    {
      id: 2,
      name: "박프차 전문가",
      category: "임장",
      title: "성수역 임장",
      description: "핫플레이스 성수동! 트렌디한 상권의 숨은 매력 찾기",
      bgColor: "from-[#1F9CD3] to-[#0BB7AD]",
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
        "성수동 상권 분석 자료 제공",
      ],
    },
    {
      id: 3,
      name: "이입지 대표",
      category: "임장",
      title: "홍대입구역 임장",
      description: "젊음의 거리 홍대, 창업 전 꼭 확인해야 할 입지 포인트",
      bgColor: "from-[#0BB7AD] to-[#08C698]",
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
        "홍대 상권 트렌드 리포트 제공",
      ],
    },
  ];

  return (
    <div className="h-screen bg-gray-50 flex flex-col pb-20">
      {/* 고정 헤더 */}
      <div className="px-6 pt-8 pb-4 max-w-2xl mx-auto w-full">
        <h1 className="text-4xl font-extrabold mb-3 leading-tight text-[#101828]">
          전문가와 함께하는
          <br />
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(90deg, #3182F6 0%, #00C896 100%)",
            }}
          >
            현장 임장
          </span>
        </h1>
        <p className="text-lg text-gray-600 font-medium">
          성공 창업의 시작, 입지 분석부터
        </p>
      </div>

      {/* 카드 스와이프 영역 */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-x-scroll snap-x snap-mandatory scrollbar-hide"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <div className="flex h-full">
          {programs.map((program, index) => (
            <div
              key={program.id}
              className="min-w-full h-full snap-center flex flex-col px-6 py-4 relative"
              style={{ scrollSnapAlign: 'center', scrollSnapStop: 'always' }}
            >
              <div className="max-w-2xl w-full mx-auto flex-1 flex items-center justify-center">
                <button
                  onClick={() => setSelectedProgram(program)}
                  className="text-left group w-full"
                >
                  <div className="bg-white rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)] group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300">
                    {/* 카드 상단 - 그라데이션 영역 */}
                    <div className={`bg-gradient-to-br ${program.bgColor} p-5 pb-10 relative`}>
                      <div className="text-xs font-bold text-white/90 mb-1.5 tracking-wide">
                        ★ 프랜차이즈 / 상권분석 전문가
                      </div>
                      <h3 className="text-3xl font-black text-white leading-tight mb-2">
                        {program.title}
                      </h3>

                      {/* 강사 사진 - 카드 하단으로 걸쳐지도록 */}
                      <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 z-10">
                        <div className="w-24 h-24 rounded-[2.5rem] bg-white shadow-[0_4px_16px_rgba(0,0,0,0.1)] flex items-center justify-center text-5xl border-3 border-white group-hover:scale-105 transition-all duration-300">
                          {program.imageUrl}
                        </div>
                      </div>
                    </div>

                    {/* 카드 하단 정보 */}
                    <div className="pt-16 pb-5 px-5 text-center bg-gradient-to-b from-gray-50 to-white">
                      <h4 className="text-xl font-black text-[#101828] mb-2">
                        {program.name}
                      </h4>
                      <div className="inline-block mb-3">
                        <span className="text-xs font-bold text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
                          {program.category}
                        </span>
                      </div>
                      <p className="text-base text-gray-600 leading-relaxed mb-4">
                        {program.description}
                      </p>

                      {/* CTA 버튼 */}
                      <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${program.bgColor} text-white font-bold px-5 py-2.5 rounded-full group-hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-all duration-300`}>
                        <span>자세히 보기</span>
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 고정 하단 인디케이터 */}
      <div className="px-6 pb-4 max-w-2xl mx-auto w-full">
        {/* 페이지 인디케이터 - 클릭 가능 */}
        <div className="flex justify-center gap-2 mb-4">
          {programs.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex
                  ? "w-8 bg-[#101828]"
                  : "w-1.5 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`${idx + 1}번째 카드로 이동`}
            />
          ))}
        </div>

        {/* 스와이프 힌트 - 페이지별로 다르게 표시 */}
        <div className="text-center">
          {currentIndex === 0 && (
            <div className="inline-flex items-center gap-3 text-gray-400 animate-pulse">
              <span className="text-sm font-medium">옆으로 밀기</span>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          )}
          {currentIndex === programs.length - 1 && (
            <div className="inline-flex items-center gap-3 text-gray-400 animate-pulse">
              <svg
                className="w-5 h-5 rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <span className="text-sm font-medium">옆으로 밀기</span>
            </div>
          )}
          {currentIndex > 0 && currentIndex < programs.length - 1 && (
            <div className="inline-flex items-center gap-3 text-gray-400 animate-pulse">
              <svg
                className="w-5 h-5 rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <span className="text-sm font-medium">옆으로 밀기</span>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* 자세히보기 모달 */}
      {selectedProgram && !showPayment && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-end md:items-center justify-center">
          <div className="bg-white rounded-t-3xl md:rounded-3xl w-full md:max-w-2xl max-h-[85vh] overflow-y-auto pb-24">
            {/* 모달 헤더 */}
            <div className="sticky top-0 bg-white rounded-t-3xl z-10 pb-4">
              <div className="flex justify-end p-4">
                <button
                  onClick={() => setSelectedProgram(null)}
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* 프로그램 헤더 */}
              <div className={`bg-gradient-to-br ${selectedProgram.bgColor} mx-4 rounded-2xl p-6 text-center`}>
                <div className="text-6xl mb-3">{selectedProgram.imageUrl}</div>
                <h2 className="text-2xl font-black text-white mb-1">{selectedProgram.title}</h2>
                <p className="text-white/90 font-medium">{selectedProgram.name}</p>
              </div>
            </div>

            {/* 모달 내용 */}
            <div className="px-6 space-y-6">
              {/* 프로그램 정보 */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 flex-shrink-0 mt-0.5">
                    <svg className="w-full h-full text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">일시</p>
                    <p className="text-base font-bold text-gray-900">{selectedProgram.date}</p>
                    <p className="text-sm text-gray-700 font-medium">{selectedProgram.time}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 flex-shrink-0 mt-0.5">
                    <svg className="w-full h-full text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">장소</p>
                    <p className="text-base font-bold text-gray-900">{selectedProgram.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 flex-shrink-0 mt-0.5">
                    <svg className="w-full h-full text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">소요시간</p>
                    <p className="text-base font-bold text-gray-900">{selectedProgram.duration}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 flex-shrink-0 mt-0.5">
                    <svg className="w-full h-full text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">정원</p>
                    <p className="text-base font-bold text-gray-900">최대 {selectedProgram.maxParticipants}명</p>
                  </div>
                </div>
              </div>

              {/* 구분선 */}
              <div className="border-t border-gray-200"></div>

              {/* 프로그램 상세 */}
              <div>
                <h3 className="text-lg font-black text-gray-900 mb-3">프로그램 내용</h3>
                <ul className="space-y-2">
                  {selectedProgram.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-blue-500 font-bold mt-1">✓</span>
                      <span className="text-sm text-gray-700 font-medium leading-relaxed">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 구분선 */}
              <div className="border-t border-gray-200"></div>

              {/* 가격 및 결제 버튼 */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">참가 비용</span>
                  <span className="text-2xl font-black text-gray-900">
                    {selectedProgram.price.toLocaleString()}원
                  </span>
                </div>

                <button
                  onClick={() => setShowPayment(true)}
                  className={`w-full bg-gradient-to-r ${selectedProgram.bgColor} text-white font-bold py-4 rounded-2xl hover:shadow-lg transition-all`}
                >
                  결제하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 결제 모달 (토스페이먼츠) */}
      {selectedProgram && showPayment && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-end md:items-center justify-center">
          <div className="bg-white rounded-t-3xl md:rounded-3xl w-full md:max-w-lg max-h-[85vh] overflow-y-auto pb-24">
            {/* 모달 헤더 */}
            <div className="sticky top-0 bg-white rounded-t-3xl z-10 border-b border-gray-200">
              <div className="flex items-center justify-between p-4">
                <h2 className="text-xl font-black text-gray-900">결제하기</h2>
                <button
                  onClick={() => {
                    setShowPayment(false);
                    setSelectedProgram(null);
                  }}
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* 결제 내용 */}
            <div className="p-6 space-y-6">
              {/* 주문 정보 */}
              <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
                <h3 className="font-bold text-gray-900">주문 정보</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">프로그램</span>
                    <span className="font-bold text-gray-900">{selectedProgram.title}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">일시</span>
                    <span className="font-medium text-gray-900">{selectedProgram.date}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">강사</span>
                    <span className="font-medium text-gray-900">{selectedProgram.name}</span>
                  </div>
                </div>
              </div>

              {/* 결제 금액 */}
              <div className="space-y-3">
                <div className="flex justify-between text-base">
                  <span className="text-gray-600 font-medium">상품 금액</span>
                  <span className="font-bold text-gray-900">{selectedProgram.price.toLocaleString()}원</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">최종 결제 금액</span>
                    <span className="text-2xl font-black text-blue-600">
                      {selectedProgram.price.toLocaleString()}원
                    </span>
                  </div>
                </div>
              </div>

              {/* 결제 수단 선택 */}
              <div className="space-y-3">
                <h3 className="font-bold text-gray-900 mb-3">결제 수단</h3>

                {/* 신용/체크카드 */}
                <button
                  onClick={() => {
                    if (!iamportLoaded || typeof window === 'undefined' || !window.IMP) {
                      alert("결제 모듈을 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
                      return;
                    }

                    try {
                      const IMP = window.IMP;
                      IMP.init("imp10391932");

                      const orderId = `ORDER_${Date.now()}`;
                      const customerName = localStorage.getItem("userName") || "고객";
                      const userEmail = localStorage.getItem("userEmail") || "customer@example.com";

                      const pendingPayment = {
                        orderId: orderId,
                        programId: selectedProgram.id,
                        programTitle: selectedProgram.title,
                        programName: selectedProgram.name,
                        date: selectedProgram.date,
                        time: selectedProgram.time,
                        location: selectedProgram.location,
                        price: selectedProgram.price,
                      };
                      localStorage.setItem("pendingPayment", JSON.stringify(pendingPayment));

                      IMP.request_pay(
                        {
                          pg: "html5_inicis", // 이니시스 웹 표준 결제
                          pay_method: "card",
                          merchant_uid: orderId,
                          name: selectedProgram.title,
                          amount: selectedProgram.price,
                          buyer_email: userEmail,
                          buyer_name: customerName,
                          buyer_tel: "010-0000-0000",
                        },
                        (rsp: IamportResponse) => {
                          if (rsp.success) {
                            window.location.href = "/payment-success";
                          } else {
                            console.error("결제 실패:", rsp);
                            localStorage.removeItem("pendingPayment");
                            window.location.href = `/payment-fail?message=${encodeURIComponent(rsp.error_msg || "결제에 실패했습니다")}`;
                          }
                        }
                      );
                    } catch (error) {
                      console.error("결제 오류:", error);
                      alert("결제 중 오류가 발생했습니다. 다시 시도해주세요.");
                    }
                  }}
                  className="w-full bg-white border-2 border-gray-300 text-gray-900 font-bold py-4 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center justify-center gap-3"
                  disabled={!iamportLoaded}
                >
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  <span>신용/체크카드</span>
                </button>

                {/* 카카오페이 */}
                <button
                  onClick={() => {
                    if (!iamportLoaded || typeof window === 'undefined' || !window.IMP) {
                      alert("결제 모듈을 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
                      return;
                    }

                    try {
                      const IMP = window.IMP;
                      IMP.init("imp10391932");

                      const orderId = `ORDER_${Date.now()}`;
                      const customerName = localStorage.getItem("userName") || "고객";
                      const userEmail = localStorage.getItem("userEmail") || "customer@example.com";

                      const pendingPayment = {
                        orderId: orderId,
                        programId: selectedProgram.id,
                        programTitle: selectedProgram.title,
                        programName: selectedProgram.name,
                        date: selectedProgram.date,
                        time: selectedProgram.time,
                        location: selectedProgram.location,
                        price: selectedProgram.price,
                      };
                      localStorage.setItem("pendingPayment", JSON.stringify(pendingPayment));

                      IMP.request_pay(
                        {
                          pg: "kakaopay.TC0ONETIME",
                          pay_method: "card",
                          merchant_uid: orderId,
                          name: selectedProgram.title,
                          amount: selectedProgram.price,
                          buyer_email: userEmail,
                          buyer_name: customerName,
                          buyer_tel: "010-0000-0000",
                        },
                        (rsp: IamportResponse) => {
                          if (rsp.success) {
                            window.location.href = "/payment-success";
                          } else {
                            console.error("결제 실패:", rsp);
                            localStorage.removeItem("pendingPayment");
                            window.location.href = `/payment-fail?message=${encodeURIComponent(rsp.error_msg || "결제에 실패했습니다")}`;
                          }
                        }
                      );
                    } catch (error) {
                      console.error("결제 오류:", error);
                      alert("결제 중 오류가 발생했습니다. 다시 시도해주세요.");
                    }
                  }}
                  className="w-full bg-[#FEE500] text-[#3C1E1E] font-bold py-4 rounded-2xl hover:bg-[#FFD700] transition-all flex items-center justify-center gap-3"
                  disabled={!iamportLoaded}
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3C7.03 3 3 6.58 3 11c0 2.58 1.47 4.85 3.66 6.33L6 21l4.5-2.7c.49.08.99.12 1.5.12 4.97 0 9-3.58 9-8s-4.03-8-9-8z"/>
                  </svg>
                  <span>카카오페이</span>
                </button>

                {/* 네이버페이 */}
                <button
                  onClick={() => {
                    if (!iamportLoaded || typeof window === 'undefined' || !window.IMP) {
                      alert("결제 모듈을 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
                      return;
                    }

                    try {
                      const IMP = window.IMP;
                      IMP.init("imp10391932");

                      const orderId = `ORDER_${Date.now()}`;
                      const customerName = localStorage.getItem("userName") || "고객";
                      const userEmail = localStorage.getItem("userEmail") || "customer@example.com";

                      const pendingPayment = {
                        orderId: orderId,
                        programId: selectedProgram.id,
                        programTitle: selectedProgram.title,
                        programName: selectedProgram.name,
                        date: selectedProgram.date,
                        time: selectedProgram.time,
                        location: selectedProgram.location,
                        price: selectedProgram.price,
                      };
                      localStorage.setItem("pendingPayment", JSON.stringify(pendingPayment));

                      IMP.request_pay(
                        {
                          pg: "naverpay",
                          pay_method: "card",
                          merchant_uid: orderId,
                          name: selectedProgram.title,
                          amount: selectedProgram.price,
                          buyer_email: userEmail,
                          buyer_name: customerName,
                          buyer_tel: "010-0000-0000",
                        },
                        (rsp: IamportResponse) => {
                          if (rsp.success) {
                            window.location.href = "/payment-success";
                          } else {
                            console.error("결제 실패:", rsp);
                            localStorage.removeItem("pendingPayment");
                            window.location.href = `/payment-fail?message=${encodeURIComponent(rsp.error_msg || "결제에 실패했습니다")}`;
                          }
                        }
                      );
                    } catch (error) {
                      console.error("결제 오류:", error);
                      alert("결제 중 오류가 발생했습니다. 다시 시도해주세요.");
                    }
                  }}
                  className="w-full bg-[#03C75A] text-white font-bold py-4 rounded-2xl hover:bg-[#02B350] transition-all flex items-center justify-center gap-3"
                  disabled={!iamportLoaded}
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16.273 12.845L7.376 0H0v24h7.726V11.156L16.624 24H24V0h-7.727z"/>
                  </svg>
                  <span>네이버페이</span>
                </button>

                {/* 실시간 계좌이체 */}
                <button
                  onClick={() => {
                    if (!iamportLoaded || typeof window === 'undefined' || !window.IMP) {
                      alert("결제 모듈을 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
                      return;
                    }

                    try {
                      const IMP = window.IMP;
                      IMP.init("imp10391932");

                      const orderId = `ORDER_${Date.now()}`;
                      const customerName = localStorage.getItem("userName") || "고객";
                      const userEmail = localStorage.getItem("userEmail") || "customer@example.com";

                      const pendingPayment = {
                        orderId: orderId,
                        programId: selectedProgram.id,
                        programTitle: selectedProgram.title,
                        programName: selectedProgram.name,
                        date: selectedProgram.date,
                        time: selectedProgram.time,
                        location: selectedProgram.location,
                        price: selectedProgram.price,
                      };
                      localStorage.setItem("pendingPayment", JSON.stringify(pendingPayment));

                      IMP.request_pay(
                        {
                          pg: "html5_inicis",
                          pay_method: "trans", // 실시간 계좌이체
                          merchant_uid: orderId,
                          name: selectedProgram.title,
                          amount: selectedProgram.price,
                          buyer_email: userEmail,
                          buyer_name: customerName,
                          buyer_tel: "010-0000-0000",
                        },
                        (rsp: IamportResponse) => {
                          if (rsp.success) {
                            window.location.href = "/payment-success";
                          } else {
                            console.error("결제 실패:", rsp);
                            localStorage.removeItem("pendingPayment");
                            window.location.href = `/payment-fail?message=${encodeURIComponent(rsp.error_msg || "결제에 실패했습니다")}`;
                          }
                        }
                      );
                    } catch (error) {
                      console.error("결제 오류:", error);
                      alert("결제 중 오류가 발생했습니다. 다시 시도해주세요.");
                    }
                  }}
                  className="w-full bg-white border-2 border-gray-300 text-gray-900 font-bold py-4 rounded-2xl hover:border-green-500 hover:bg-green-50 transition-all flex items-center justify-center gap-3"
                  disabled={!iamportLoaded}
                >
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  <span>실시간 계좌이체</span>
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  결제 진행 시 아임포트의 안전한 결제창으로 이동합니다
                </p>
              </div>

              {/* 유의사항 */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
                <h4 className="font-bold text-gray-900 mb-2 text-sm">환불 및 취소 안내</h4>
                <ul className="space-y-1 text-xs text-gray-600">
                  <li>• 프로그램 7일 전: 100% 환불</li>
                  <li>• 프로그램 3일 전: 50% 환불</li>
                  <li>• 프로그램 1일 전: 환불 불가</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
