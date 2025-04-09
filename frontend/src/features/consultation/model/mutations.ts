import apiClient from '@/shared/api/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

// 요청 파라미터를 객체로 변경
interface PostAnswerParams {
  requestId: number;
  content: string;
}

const postAnswer = async ({
  requestId,
  content,
}: PostAnswerParams): Promise<void> => {
  try {
    await apiClient.post(`/answers`, { requestId, content });
  } catch (error) {
    console.error('답변 등록 실패: ', error);
    throw error; // 에러를 다시 throw하여 onError 핸들러가 처리할 수 있게 함
  }
};

export const usePostAnswer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postAnswer,
    onSuccess: async (_, variables) => {
      // 성공 시 쿼리 무효화
      await queryClient.invalidateQueries({
        queryKey: ['request', variables.requestId],
      });
    },
    onError: (error: AxiosError) => {
      console.error('답변 등록 실패패', error);
    },
  });
};
