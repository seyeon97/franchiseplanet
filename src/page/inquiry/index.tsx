"use client";

import { useRouter } from "next/navigation";

export default function InquiryView() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white pb-20">
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
            <h1 className="text-xl font-black text-gray-900">고객센터</h1>
            <div className="w-10" />
          </div>
        </div>

        <div className="p-4">
          <div className="text-center py-16">
            <div className="text-6xl mb-4">💬</div>
            <p className="text-lg font-bold text-gray-900 mb-2">고객센터</p>
            <p className="text-sm text-gray-500">문의 · 제휴 · 공지사항</p>
          </div>
        </div>
      </div>
    </div>
  );
}
