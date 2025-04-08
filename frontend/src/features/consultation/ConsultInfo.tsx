import { Edit } from 'lucide-react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useAuthStore } from '@/entities/auth/model/store';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useRequestDetail,
  useDeleteRequest,
} from '@/features/consultation/model/queries';
import { useState } from 'react';
import ModifyTitle from './modify/ModifyTitle';
import ModifyFaultRatio from './modify/ModifyFaultRatio';
import ModifyAdditionalInfo from './modify/ModifyAdditionalInfo';
import ModifyQuestion from './modify/ModifyQuestion';
import { useQueryClient } from '@tanstack/react-query';

const ConsultInfo = () => {
  const [editMode, setEditMode] = useState(false);
  const loginUser = useAuthStore((state) => state.clientId); // 로그인 시 받아온 clientId
  const { requestId } = useParams(); // URL에서 requestId 파라미터 가져오기
  const navigate = useNavigate();
  const deleteRequestMutation = useDeleteRequest();
  const queryClient = useQueryClient();

  // API 호출
  const {
    data,
    isLoading: queryLoading,
    isError,
  } = useRequestDetail(Number(requestId));

  if (queryLoading) {
    return (
      <div className="col-span-7 mb-10 flex items-center justify-center">
        데이터 호출 중
      </div>
    );
  }

  if (isError) {
    return (
      <div className="col-span-7 mb-10 flex items-center justify-center">
        <p>오류 발생</p>
      </div>
    );
  }

  // 로그인 한 사용자가 작성한 글인지 체크
  const isWriter = loginUser === data?.memberId;

  // 영상 데이터 조회
  console.log(data?.fileName);

  // 게시글 수정모드
  const editPost = () => {
    setEditMode(!editMode);
  };

  // 게시글 삭제
  const deletePost = () => {
    if (!requestId) return;

    // 사용자에게 삭제 확인 메시지 표시
    if (window.confirm('게시글을 삭제하시겠습니까?')) {
      deleteRequestMutation.mutate(Number(requestId), {
        onSuccess: () => {
          alert('게시글이 삭제되었습니다.');

          // 쿼리 클라이언트에 직접 접근하여 무효와 완료 확인
          void queryClient.invalidateQueries({ queryKey: ['requests'] });

          // 게시글 목록 페이지로 이동
          void navigate('/board'); // 삭제한 페이지로 뒤로가기 못하도록 막음
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
    <div className="col-span-7 mb-10">
      <div className="flex w-full justify-start gap-2">
        {!editMode ? (
          <>
            <h2>{data?.title}</h2>
            <div className="typo-button-small my-auto h-fit rounded-[10px] bg-p2 px-2">
              상담완료
            </div>
          </>
        ) : (
          <ModifyTitle />
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
      <div className="video my-4 aspect-video w-full bg-white">
        {data?.fileName ? (
          <video
            src={`https://j12a501.p.ssafy.io/api/videos/${data.fileName}`}
            controls
            className="size-full object-contain"
          >
            브라우저가 비디오 태그를 지원하지 않습니다.
          </video>
        ) : (
          <div className="flex size-full items-center justify-center text-gray-500">
            업로드된 영상이 없습니다.
          </div>
        )}
      </div>

      {/* 추가 정보 3가지 */}
      <div>
        <div className="rate flex flex-col gap-4">
          <div>
            <h3>받은 과실비율</h3>
            {!editMode ? (
              <p className="mt-2">{data?.insuranceFaultRatio}</p>
            ) : (
              <ModifyFaultRatio />
            )}
          </div>
          <div>
            <h3>영상 외 추가정보</h3>
            {!editMode ? (
              <p className="mt-2">{data?.description}</p>
            ) : (
              <ModifyAdditionalInfo />
            )}
          </div>
          <div>
            <h3>궁금한 점</h3>
            {!editMode ? (
              <p className="mt-2">{data?.question}</p>
            ) : (
              <ModifyQuestion />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultInfo;
