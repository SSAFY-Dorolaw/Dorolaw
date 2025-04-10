import { Edit } from 'lucide-react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useAuthStore } from '@/entities/auth/model/store';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useDeleteAnalysis,
  useAnalysisDetail,
} from '@/features/analysis/model/queries';
import { useState } from 'react';
import ModifyTitle from '../consultation/modify/ModifyTitle';
import ModifyFaultRatio from '../consultation/modify/ModifyFaultRatio';
import { useQueryClient } from '@tanstack/react-query';

const AnalysisInfo = () => {
  const [editMode, setEditMode] = useState(false);
  const loginUser = useAuthStore((state) => state.clientId); // 로그인 시 받아온 clientId
  const { faultAnalysisId } = useParams(); // URL에서 requestId 파라미터 가져오기
  const navigate = useNavigate();
  const deleteAnalysisMutation = useDeleteAnalysis();
  const queryClient = useQueryClient();
  const API_URL = import.meta.env.VITE_API_URL;

  // API 호출
  const { data, isLoading, isError } = useAnalysisDetail(
    Number(faultAnalysisId),
  );

  if (isLoading) {
    return (
      <div className="col-span-7 mb-10 flex items-center justify-center">
        데이터 호출 중
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="col-span-7 mb-10 flex items-center justify-center">
        <p>오류 발생</p>
      </div>
    );
  }

  // 로그인 한 사용자가 작성한 글인지 체크
  const isWriter = loginUser === data?.memberId;

  // 게시글 수정모드
  const editPost = () => {
    setEditMode(!editMode);
  };

  // 게시글 삭제
  const deletePost = () => {
    if (!faultAnalysisId) return;

    // 사용자에게 삭제 확인 메시지 표시
    if (window.confirm('게시글을 삭제하시겠습니까?')) {
      deleteAnalysisMutation.mutate(Number(faultAnalysisId), {
        onSuccess: () => {
          alert('게시글이 삭제되었습니다.');

          // 쿼리 클라이언트에 직접 접근하여 무효와 완료 확인
          void queryClient.invalidateQueries({ queryKey: ['analysisDetail'] });

          // 게시글 목록 페이지로 이동
          void navigate('/board/analysis'); // 삭제한 페이지로 뒤로가기 못하도록 막음
          // 이동 후 새로고침 하면 삭제 여부 반영됨
        },
        onError: (error) => {
          console.error('게시글 삭제 실패:', error);
          alert('게시글 삭제에 실패했습니다. 다시 시도해주세요.');
        },
      });
    }
  };

  return (
    <div className="col-span-7 mb-20">
      <div className="space-y-2 rounded-lg bg-white p-6 shadow-md">
        {/* 제목 및 상태 */}
        <div className="flex w-full items-center gap-4">
          {!editMode ? (
            <>
              <h2 className="text-2xl font-bold text-gray-800">
                {data?.title}
              </h2>
              <div className="typo-button-small my-auto h-fit rounded-[10px] bg-p2 px-2 text-gray-700">
                분석완료
              </div>
            </>
          ) : (
            <ModifyTitle title={data?.title} />
          )}
        </div>
        {isWriter && (
          <div className="icongroup flex justify-end gap-2">
            <Edit
              strokeWidth={3}
              size={24}
              className="cursor-pointer hover:text-green-500"
              onClick={editPost}
            />
            <RiDeleteBin6Line
              strokeWidth={1}
              size={24}
              className="cursor-pointer hover:text-red-500"
              onClick={deletePost}
            />
          </div>
        )}

        {/* 영상 재생 부분 */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800">업로드된 영상</h3>
          <div className="video mb-4 aspect-video w-full bg-gray-100">
            {data?.fileName ? (
              <video
                src={`${API_URL}/videos/${data.fileName}`}
                controls
                className="size-full rounded-xl object-contain"
                controlsList="nodownload"
              >
                브라우저가 비디오 태그를 지원하지 않습니다.
              </video>
            ) : (
              <div className="flex size-full items-center justify-center text-gray-500">
                업로드된 영상이 없습니다.
              </div>
            )}
          </div>
        </div>

        {/* 받은 과실비율 */}
        <div>
          <h3 className="mt-20 text-xl font-semibold text-gray-800">
            받은 과실비율
          </h3>
          <div className="mb-8 mt-4 flex flex-col gap-4">
            {!editMode ? (
              <div className="flex gap-4">
                <p className="text-lg text-gray-700">
                  A차량: {data?.aiReport?.faultRatioA}%
                </p>
                <p className="text-lg text-gray-700">
                  B차량: {data?.aiReport?.faultRatioB}%
                </p>
              </div>
            ) : (
              <ModifyFaultRatio />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisInfo;
