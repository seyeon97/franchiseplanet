"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentSuccessView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(true);
  const [paymentInfo, setPaymentInfo] = useState({
    programTitle: "",
    date: "",
    location: "",
    price: "0",
  });

  useEffect(() => {
    // localStorage에서 대기중인 결제 정보 가져오기
    const pendingPaymentStr = localStorage.getItem("pendingPayment");

    if (pendingPaymentStr) {
      try {
        const pendingPayment = JSON.parse(pendingPaymentStr);

        // 화면에 표시할 정보 설정
        setPaymentInfo({
          programTitle: pendingPayment.programTitle,
          date: pendingPayment.date,
          location: pendingPayment.location,
          price: pendingPayment.price.toString(),
        });

        // 결제 내역을 localStorage에 저장
        const paymentHistory = JSON.parse(localStorage.getItem("paymentHistory") || "[]");
        const newPayment = {
          id: `payment_${Date.now()}`,
          programTitle: pendingPayment.programTitle,
          programName: pendingPayment.programName,
          date: pendingPayment.date,
          time: pendingPayment.time,
          location: pendingPayment.location,
          price: pendingPayment.price,
          paymentDate: new Date().toLocaleDateString('ko-KR'),
          status: "예정",
        };
        paymentHistory.unshift(newPayment);
        localStorage.setItem("paymentHistory", JSON.stringify(paymentHistory));

        // 대기중인 결제 정보 삭제
        localStorage.removeItem("pendingPayment");
      } catch (error) {
        console.error("결제 정보 처리 오류:", error);
      }
    }

    setIsProcessing(false);
  }, [searchParams]);

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-bold text-gray-900">결제 처리중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-xl">
        {/* 성공 아이콘 */}
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mx-auto mb-6 animate-bounce">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* 제목 */}
        <h1 className="text-3xl font-black text-gray-900 text-center mb-3">
          결제 완료!
        </h1>

        {/* 설명 */}
        <p className="text-base text-gray-600 text-center mb-8 leading-relaxed">
          <span className="font-bold text-gray-900">{paymentInfo.programTitle}</span> 프로그램이
          <br />
          성공적으로 결제되었습니다
        </p>

        {/* 결제 정보 */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 mb-6 border border-blue-100">
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <span className="text-sm text-gray-600 font-medium">프로그램</span>
              <span className="font-bold text-gray-900 text-right">{paymentInfo.programTitle}</span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-sm text-gray-600 font-medium">일시</span>
              <span className="font-bold text-gray-900 text-right">{paymentInfo.date}</span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-sm text-gray-600 font-medium">장소</span>
              <span className="font-bold text-gray-900 text-right">{paymentInfo.location}</span>
            </div>
            <div className="border-t border-blue-200 pt-3 mt-3">
              <div className="flex justify-between items-center">
                <span className="text-base font-bold text-gray-900">결제 금액</span>
                <span className="text-2xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  {parseInt(paymentInfo.price).toLocaleString()}원
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 안내 메시지 */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 mb-6">
          <div className="flex items-start gap-2">
            <svg className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-900 mb-1">예약 확인</p>
              <p className="text-xs text-gray-700 leading-relaxed">
                프로그램 일정과 장소를 꼭 확인해주세요. 자세한 정보는 결제 내역에서 확인할 수 있습니다.
              </p>
            </div>
          </div>
        </div>

        {/* 버튼 */}
        <div className="space-y-3">
          <button
            onClick={() => router.push("/payment-history")}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-4 rounded-2xl hover:shadow-lg transition-all"
          >
            결제 내역 보기
          </button>
          <button
            onClick={() => router.push("/")}
            className="w-full bg-gray-100 text-gray-700 font-bold py-3 rounded-2xl hover:bg-gray-200 transition-all"
          >
            홈으로 가기
          </button>
        </div>
      </div>
    </div>
  );
}
