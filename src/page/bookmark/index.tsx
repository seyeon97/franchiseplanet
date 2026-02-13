"use client";

import { useRouter } from "next/navigation";

export default function BookmarkView() {
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
            <h1 className="text-xl font-black text-gray-900">내 자산</h1>
            <div className="w-10" />
          </div>
        </div>

        <div className="p-4">
          <div className="text-center py-16">
            <div className="mb-4 flex justify-center">
              <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none">
                <defs>
                  <linearGradient id="gradient-bookmark" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#3182F6' }} />
                    <stop offset="100%" style={{ stopColor: '#00C896' }} />
                  </linearGradient>
                </defs>
                <path d="M20 21V5C20 4.46957 19.7893 3.96086 19.4142 3.58579C19.0391 3.21071 18.5304 3 18 3H8C7.46957 3 6.96086 3.21071 6.58579 3.58579C6.21071 3.96086 6 4.46957 6 5V21L13 18L20 21Z" fill="url(#gradient-bookmark)" stroke="url(#gradient-bookmark)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-lg font-bold text-gray-900 mb-2">내 브랜드</p>
            <p className="text-sm text-gray-500">관심 브랜드와 저장한 칼럼이 표시됩니다</p>
          </div>
        </div>
      </div>
    </div>
  );
}
