import { create } from 'zustand';

interface AuthStore {
  isLogin: boolean;
  accessToken: string | null;
  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => {
  // 브라우저에서 localStorage에 접근
  const getToken = (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  };

  const token = getToken();

  return {
    isLogin: !!token, // 초기 로그인 상태
    accessToken: token, // 토큰 상태

    login: (token: string) => {
      // localStorage에 저장
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', token);
      }
      set({ isLogin: true, accessToken: token });
    },

    logout: () => {
      // localStorage에서 토큰 제거
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
      }
      set({ isLogin: false, accessToken: null });
    },
  };
});
