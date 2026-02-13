"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface PaymentHistory {
  id: string;
  programTitle: string;
  programName: string;
  date: string;
  time: string;
  location: string;
  price: number;
  paymentDate: string;
  status: "완료" | "예정" | "취소";
}

export default function PaymentHistoryView() {
  const router = useRouter();
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistory[]>([]);

  useEffect(() => {
    // localStorage에서 결제 내역 불러오기
    const history = localStorage.getItem("paymentHistory");
    if (history) {
      setPaymentHistory(JSON.parse(history));
    }
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "완료":
        return "text-green-600 bg-green-50";
      case "예정":
        return "text-blue-600 bg-blue-50";
      case "취소":
        return "text-gray-600 bg-gray-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-2xl mx-auto">
        {/* 헤더 */}
        <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
          <div className="flex items-center justify-between px-4 py-4">
            <button
              onClick={() => router.back()}
              className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center"
            >
              <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-xl font-black text-gray-900">결제 내역</h1>
            <div className="w-10" />
          </div>
        </div>

        {/* 결제 내역 리스트 */}
        <div className="p-4 space-y-3">
          {paymentHistory.length === 0 ? (
            <div className="text-center py-16">
              <div className="mb-4 flex justify-center">
                <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none">
                  <defs>
                    <linearGradient id="gradient-payment" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#3182F6' }} />
                      <stop offset="100%" style={{ stopColor: '#00C896' }} />
                    </linearGradient>
                  </defs>
                  <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3v-8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" stroke="url(#gradient-payment)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="text-lg font-bold text-gray-900 mb-2">결제 내역이 없습니다</p>
              <p className="text-sm text-gray-500">오프라인 임장 프로그램을 신청해보세요</p>
            </div>
          ) : (
            paymentHistory.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                {/* 상태 및 결제일 */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">
                    결제일: {item.paymentDate}
                  </span>
                </div>

                {/* 프로그램 정보 */}
                <h3 className="text-lg font-black text-gray-900 mb-2">{item.programTitle}</h3>
                <p className="text-sm text-gray-600 font-medium mb-3">{item.programName}</p>

                {/* 상세 정보 */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-700 font-medium">{item.date} {item.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-gray-700 font-medium">{item.location}</span>
                  </div>
                </div>

                {/* 구분선 */}
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 font-medium">결제 금액</span>
                    <span className="text-xl font-black text-gray-900">{item.price.toLocaleString()}원</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
