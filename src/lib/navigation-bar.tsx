"use client";

import { usePathname, useRouter } from "next/navigation";

export default function NavigationBar() {
  const pathname = usePathname();
  const router = useRouter();

  const renderIcon = (id: string, isActive: boolean) => {
    const strokeColor = isActive ? '#ffffff' : '#3182F6';
    const strokeWidth = 2;

    switch (id) {
      case "home":
        return (
          <svg className="w-6 h-6" fill="none" stroke={strokeColor} viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={strokeWidth}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        );
      case "column":
        return (
          <svg className="w-6 h-6" fill="none" stroke={strokeColor} viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={strokeWidth}
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
            />
          </svg>
        );
      case "resources":
        return (
          <svg className="w-6 h-6" fill="none" stroke={strokeColor} viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={strokeWidth}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        );
      case "offline":
        return (
          <svg className="w-6 h-6" fill="none" stroke={strokeColor} viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={strokeWidth}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={strokeWidth}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        );
      case "more":
        return (
          <svg className="w-6 h-6" fill="none" stroke={strokeColor} viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={strokeWidth}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  const navItems = [
    { id: "home", label: "홈", path: "/" },
    { id: "column", label: "칼럼", path: "/column" },
    { id: "resources", label: "자료실", path: "/resources" },
    { id: "offline", label: "오프라인", path: "/offline" },
    { id: "more", label: "더보기", path: "/more" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/50 backdrop-blur-md border-t border-gray-200/50 z-50 safe-area-inset-bottom">
      <div className="max-w-2xl mx-auto px-2 py-2">
        <div className="grid grid-cols-5 gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <button
                key={item.id}
                onClick={() => router.push(item.path)}
                className={`flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all ${
                  isActive
                    ? ""
                    : "hover:bg-gray-50"
                }`}
                style={
                  isActive
                    ? {
                        backgroundImage: "linear-gradient(135deg, #3182F6 0%, #00C896 100%)",
                      }
                    : undefined
                }
              >
                <div className={`mb-1 ${isActive ? "scale-110" : ""} transition-transform`}>
                  {renderIcon(item.id, isActive)}
                </div>
                <span
                  className={`text-xs ${isActive ? "font-bold" : "font-medium"}`}
                  style={
                    isActive
                      ? {
                          color: "#ffffff",
                        }
                      : {
                          color: "#3182F6",
                        }
                  }
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
