import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AuthStore } from '@/entities/auth/model/types';

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => {
      // 브라우저에서 localStorage에 접근
      const getToken = (): string | null => {
        if (typeof window !== 'undefined') {
          return localStorage.getItem('token');
        }
        return null;
      };

      const token = getToken();
      console.log(token);

      return {
        isLogin: !!token, // 초기 로그인 상태
        accessToken: token, // 토큰 상태
        clientId: null, // 로그인한 사용자 정보

        login: (token: string) => {
          // localStorage에 저장
          if (typeof window !== 'undefined') {
            localStorage.setItem('token', token);
          }
          set({ isLogin: true, accessToken: token });
        },

        logout: () => {
          if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
          }
          set({ isLogin: false, accessToken: null, clientId: null });
        },

        // clientId 설정 함수
        setClientId: (id: number | null) => {
          set({ clientId: id });
        },
      };
    },
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
