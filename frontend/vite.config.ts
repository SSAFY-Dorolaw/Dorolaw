import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  // 서비스 워커 파일을 빌드 디렉토리에 복사
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
