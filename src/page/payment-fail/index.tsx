"use client";

import { useRouter } from "next/navigation";

export default function PaymentFailView() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-xl">
        {/* 실패 아이콘 */}
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>

        {/* 제목 */}
        <h1 className="text-3xl font-black text-gray-900 text-center mb-3">
          결제 실패
        </h1>

        {/* 설명 */}
        <p className="text-base text-gray-600 text-center mb-8 leading-relaxed">
          결제 처리 중 오류가 발생했습니다.
          <br />
          다시 시도해 주세요.
        </p>

        {/* 안내 메시지 */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6">
          <div className="flex items-start gap-2">
            <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-900 mb-1">결제 실패 사유</p>
              <ul className="text-xs text-gray-700 leading-relaxed space-y-1">
                <li>• 카드 한도 초과</li>
                <li>• 잘못된 카드 정보</li>
                <li>• 결제 취소</li>
                <li>• 네트워크 오류</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 버튼 */}
        <div className="space-y-3">
          <button
            onClick={() => router.push("/offline")}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-4 rounded-2xl hover:shadow-lg transition-all"
          >
            다시 결제하기
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
