import { create } from 'zustand';

interface UploadState {
  // 상태 (state)
  selectedFile: File | null;
  title: string;
  isDragging: boolean;

  // 액션 (Actions)
  setSelectedFile: (file: File | null) => void;
  setTitle: (title: string) => void;
  setIsDragging: (isDragging: boolean) => void;

  // 복합 액션
  handleFile: (file: File) => void;
  resetUpload: () => void;
  resetStore: () => void;
}

/* 업로드 스토어 */
const initialState = {
  selectedFile: null,
  title: '',
  isDragging: false,
};

export const useUploadStore = create<UploadState>((set) => ({
  // 초기 상태
  selectedFile: null,
  title: '',
  isDragging: false,

  // 기본 액션
  setSelectedFile: (file) => set({ selectedFile: file }),
  setTitle: (title) => set({ title }),
  setIsDragging: (isDragging) => set({ isDragging }),

  // 복합 액션
  handleFile: (file) => {
    // 비디오 파일인지 확인
    if (file.type.startsWith('video/')) {
      set({ selectedFile: file });
    } else {
      alert('비디오 파일만 업로드 가능합니다.');
    }
  },

  // 업로드 관련 상태 리셋
  resetUpload: () => set({ selectedFile: null, title: '' }),

  // 모든 상태 초기화
  resetStore: () => set(initialState),
}));
