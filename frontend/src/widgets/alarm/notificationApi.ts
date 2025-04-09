import axios from 'axios';
import { AlarmsResponse } from './types';

// API 기본 URL
const API_URL = import.meta.env.VITE_API_URL;

// 인증 토큰 가져오기
const getAuthToken = (): string | null => {
  return localStorage.getItem('accessToken'); // 프로젝트의 토큰 저장 방식에 맞게 수정
};

/**
 * 사용자의 알림 목록을 가져오는 함수
 * @param memberId 사용자 ID
 * @returns 알림 목록
 */
export const fetchUserAlarms = async (
  memberId: number,
): Promise<AlarmsResponse> => {
  try {
    const token = getAuthToken();
    const response = await axios.get<AlarmsResponse>(
      `${API_URL}/alarms/myList/${memberId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('알림 목록 조회 실패:', error);
    throw error;
  }
};

/**
 * 특정 알림을 읽음 처리하는 함수
 * @param alarmId 알림 ID
 * @returns 성공 여부
 */
export const markAlarmAsRead = async (alarmId: number): Promise<boolean> => {
  try {
    const token = getAuthToken();
    await axios.put(
      `${API_URL}/alarms/read/${alarmId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return true;
  } catch (error) {
    console.error('알림 읽음 처리 실패:', error);
    throw error;
  }
};

/**
 * 사용자의 모든 알림을 읽음 처리하는 함수
 * @returns 성공 여부
 */
export const markAllAlarmsAsRead = async (): Promise<boolean> => {
  try {
    const token = getAuthToken();
    await axios.put(
      `${API_URL}/alarms/read-all`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return true;
  } catch (error) {
    console.error('모든 알림 읽음 처리 실패:', error);
    throw error;
  }
};
