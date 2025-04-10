import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AuthStore } from '@/entities/auth/model/types';

// 로컬 스토리지에서 토큰을 직접 가져오는 함수
export const getTokenFromStorage = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => {
      // 초기화 시 로컬 스토리지에서 토큰을 가져와 상태 설정
      const initialToken = getTokenFromStorage();

      return {
        isLogin: !!initialToken, // 토큰 존재 여부로 로그인 상태 결정
        accessToken: initialToken, // 초기 토큰 설정
        clientId: null, // 로그인한 사용자 정보
        role: null,

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
          set({
            isLogin: false,
            accessToken: null,
            clientId: null,
            role: null,
          });
        },

        // clientId 설정 함수
        setClientId: (id: number | null) => {
          set({ clientId: id });
        },

        // lawyerId 설정 함수
        setRole: (role: 'GENERAL' | 'LAWYER' | 'CERTIFIED_LAWYER' | null) => {
          set({ role: role });
        },

        // 토큰 직접 설정하는 함수
        setToken: (token: string | null) => {
          if (typeof window !== 'undefined' && token) {
            localStorage.setItem('token', token);
          } else if (typeof window !== 'undefined' && !token) {
            localStorage.removeItem('token');
          }

          set({
            accessToken: token,
            isLogin: !!token,
          });
        },
      };
    },
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      // 로컬 스토리지에서 먼저 불러올 항목 지정
    },
  ),
);
