import axios from 'axios';
import { AlarmsResponse } from './types';

// API 기본 URL
const API_URL = import.meta.env.VITE_API_URL;

/**
 * 사용자의 알림 목록을 가져오는 함수
 * @param memberId 사용자 ID
 * @returns 알림 목록
 */
export const fetchUserAlarms = async (
  memberId: number,
): Promise<AlarmsResponse> => {
  try {
    const response = await axios.get<AlarmsResponse>(
      `${API_URL}/alarms/myList/${memberId}`,
    );
    // console.log('알림 목록 조회 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('알림 목록 조회 실패:', error);
    throw error;
  }
};
