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
            <div className="mb-4 flex justify-center">
              <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none">
                <defs>
                  <linearGradient id="gradient-inquiry" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#3182F6' }} />
                    <stop offset="100%" style={{ stopColor: '#00C896' }} />
                  </linearGradient>
                </defs>
                <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" fill="url(#gradient-inquiry)" stroke="url(#gradient-inquiry)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-lg font-bold text-gray-900 mb-2">고객센터</p>
            <p className="text-sm text-gray-500">문의 · 제휴 · 공지사항</p>
          </div>
        </div>
      </div>
    </div>
  );
}
