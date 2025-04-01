import { create } from 'zustand';
import Cookies from 'js-cookie';

interface AuthStore {
  isLogin: boolean;
  accessToken: string | null;
  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => {
  const token = Cookies.get('accessToken') as string | null;

  return {
    isLogin: !!token, // 초기 로그인 상태
    accessToken: token, // 토큰 상태

    login: (token: string) => {
      // 클라이언트에서 쿠키 설정
      Cookies.set('accessToken', token);
      set({ isLogin: true, accessToken: token });
    },

    logout: () => {
      // 쿠키에서 토큰 제거
      Cookies.remove('accessToken');
      set({ isLogin: false, accessToken: null });
    },
  };
});
