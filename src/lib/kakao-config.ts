/**
 * Kakao Client-side Configuration
 *
 * 카카오 JavaScript SDK 설정값
 * 클라이언트에서 사용 가능한 공개 키만 포함합니다.
 */

export const kakaoConfig = {
  // Kakao Developers에서 발급받은 JavaScript 키를 여기에 입력하세요
  // https://developers.kakao.com/console/app
  javascriptKey: "YOUR_KAKAO_JAVASCRIPT_KEY_HERE",
  // 로그인 후 리다이렉트 URI (Kakao Developers 콘솔에 등록 필요)
  redirectUri:
    typeof window !== "undefined"
      ? `${window.location.origin}/login`
      : "http://localhost:3000/login",
};
