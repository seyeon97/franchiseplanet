export interface KakaoAPI {
  /** 카카오 인증 코드로 로그인하여 사용자 정보 반환 */
  login: (code: string) => Promise<KakaoUserDetail>;
}

export type KakaoUserDetail = {
  nickname: string;
  email: string;
  profileImage: string;
};
