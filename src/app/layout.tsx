import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Noto_Sans_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { RootLayout } from "@/page/layout/root-layout";
import { ReactGrabInit } from "@/lib/components/react-grab-init";
import { SandboxBridge } from "@/lib/components/sandbox-bridge";

const pretendard = localFont({
  src: [
    {
      path: "../../node_modules/pretendard/dist/web/static/woff2/Pretendard-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../node_modules/pretendard/dist/web/static/woff2/Pretendard-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../node_modules/pretendard/dist/web/static/woff2/Pretendard-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../node_modules/pretendard/dist/web/static/woff2/Pretendard-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../node_modules/pretendard/dist/web/static/woff2/Pretendard-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../node_modules/pretendard/dist/web/static/woff2/Pretendard-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-pretendard",
});

const notoSansMono = Noto_Sans_Mono({
  variable: "--font-noto-sans-mono",
  subsets: ["latin"],
});

// Disable prerendering for all pages
export const dynamic = "force-dynamic";

// Set maximum execution time for server actions and routes (5 minutes)
export const maxDuration = 300;

// Viewport settings - prevent zoom on mobile input focus
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

/**
 * SEO & Open Graph Metadata
 *
 * TODO: Customize these values for your service
 * 아래 값들을 귀하의 서비스에 맞게 수정하세요
 *
 * metadataBase는 헤더에서 hostname을 가져와 동적으로 설정됩니다
 */
export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const hostname = headersList.get("host") || "localhost:3000";
  const protocol = "https";

  return {
    metadataBase: new URL(`${protocol}://${hostname}`),

    title: {
      default: "프랜차이즈플래닛 - 제대로 알고 시작하세요",
      template: "%s | 프랜차이즈플래닛", // Page titles will be "Page Title | 프랜차이즈플래닛"
    },
    description:
      "실패 10%, 평균, 위기 10% - 실제 매출 데이터로 협상직전 창업을 도와드립니다. 프랜차이즈 창업의 모든 것을 한눈에!",

    // Open Graph metadata for social sharing
    openGraph: {
      type: "website",
      locale: "ko_KR",
      title: "프랜차이즈플래닛 - 제대로 알고 시작하세요",
      description:
        "실패 10%, 평균, 위기 10% - 실제 매출 데이터로 협상직전 창업을 도와드립니다. 프랜차이즈 창업의 모든 것을 한눈에!",
      siteName: "프랜차이즈플래닛",
      images: [
        {
          url: "/og.png", // 히어로 섹션 이미지 사용
          width: 1200,
          height: 630,
          alt: "프랜차이즈플래닛 - 제대로 알고 시작하세요",
        },
      ],
    },

    // 아이콘 설정 - 버전 쿼리스트링으로 브라우저 캐시 무력화
    icons: {
      icon: "/favicon-fp.png?v=3",
      apple: "/favicon-fp.png?v=3",
    },

    // Twitter Card metadata
    twitter: {
      card: "summary_large_image",
      title: "프랜차이즈플래닛 - 제대로 알고 시작하세요",
      description:
        "실패 10%, 평균, 위기 10% - 실제 매출 데이터로 협상직전 창업을 도와드립니다. 프랜차이즈 창업의 모든 것을 한눈에!",
      images: ["/og.png"], // 히어로 섹션 이미지 사용
    },

    // Additional metadata
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${pretendard.variable} ${notoSansMono.variable} antialiased`}
      >
        <RootLayout>{children}</RootLayout>
        <ReactGrabInit />
        <SandboxBridge />
      </body>
    </html>
  );
}
