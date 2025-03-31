// src/shared/api/api-client.ts
import axios, { AxiosRequestConfig } from 'axios';

/* 기본 설정을 위한 axios 인스턴스 생성 */
const apiClient = axios.create({
  baseURL: '/api', // 또는 실제 API 서버 URL (예: process.env.REACT_APP_API_URL)
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30초
});

/* 요청 인터셉터 */
apiClient.interceptors.request.use(
  (config) => {
    // 토큰이 필요한 경우 여기에 추가
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: Error) => {
    return Promise.reject(error);
  },
);

/* 응답 인터셉터 */
apiClient.interceptors.response.use(
  (response) => {
    // 응답 데이터 처리가 필요한 경우
    return response;
  },
  (error: Error) => {
    // 에러 처리 (예: 401 에러 시 로그아웃 처리 등)
    return Promise.reject(error);
  },
);

export default apiClient;
