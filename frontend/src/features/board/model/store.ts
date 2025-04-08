import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BoardStore } from '@/features/board/model/types';

/* 게시판 상태 스토어 생성 */
// persist 미들웨어를 사용하여 브라우저 세션 간에도 상태 유지
export const useBoardStore = create<BoardStore>()(
  persist(
    (set) => ({
      // 초기 상태
      isConsultTab: false, // 기본값은 AI 분석 게시판
      consultPage: 0,
      analysisPage: 0,

      // 액션 정의
      setIsConsultTab: (value) => set({ isConsultTab: value }),
      setConsultPage: (page) => set({ consultPage: page }),
      setAnalysisPage: (page) => set({ analysisPage: page }),
    }),
    {
      name: 'board-store', // localStorage에 저장될 키 이름
      // 필요하다면 특정 상태만 유지하도록 설정 가능
      partialize: (state) => ({
        isConsultTab: state.isConsultTab,
        consultPage: state.consultPage,
        analysisPage: state.analysisPage,
      }),
    },
  ),
);
