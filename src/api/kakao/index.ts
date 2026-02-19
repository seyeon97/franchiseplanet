export type { KakaoAPI, KakaoUserDetail } from "./types";
export { kakaoLogin } from "./actions/login";
export { getKakaoUsers } from "./actions/users";

import { kakaoLogin } from "./actions/login";
import type { KakaoAPI } from "./types";

export const kakao: KakaoAPI = {
  login: kakaoLogin,
};
