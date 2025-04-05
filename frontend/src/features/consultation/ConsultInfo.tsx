import { Edit } from 'lucide-react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useAuthStore } from '@/entities/auth/model/store';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useRequestDetail,
  useDeleteRequest,
} from '@/features/consultation/model/queries';
// import ModifyTitle from './modify/ModifyTitle';
// import ModifyFaultRatio from './modify/ModifyFaultRatio';
// import ModifyAdditionalInfo from './modify/ModifyAdditionalInfo';
// import ModifyQuestion from './modify/ModifyQuestion';

const ConsultInfo = () => {
  const loginUser = useAuthStore((state) => state.clientId); // 로그인 시 받아온 clientId
  const { requestId } = useParams(); // URL에서 requestId 파라미터 가져오기
  const navigate = useNavigate();
  const deleteRequestMutation = useDeleteRequest();

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

  console.log(data?.fileName); // 디버깅

  // 로그인 한 사용자가 작성한 글인지 체크
  const isWriter = loginUser === data?.memberId;

  // 영상 데이터 조회

  // 게시글 수정모드
  // const editPost = () => {

  // }

  // 게시글 삭제
  const deletePost = () => {
    if (!requestId) return;

    // 사용자에게 삭제 확인 메시지 표시
    if (window.confirm('게시글을 삭제하시겠습니까?')) {
      deleteRequestMutation.mutate(Number(requestId), {
        onSuccess: () => {
          alert('게시글이 삭제되었습니다.');
          // 게시글 목록 페이지로 이동
          void navigate('/consultation');
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
        <h2>{data?.title}</h2>
        <div className="typo-button-small my-auto h-fit rounded-[10px] bg-p2 px-2">
          상담완료
        </div>
      </div>
      {/* <ModifyTitle /> */}
      {isWriter && (
        <div className="icongroup flex justify-end gap-2">
          <Edit
            strokeWidth={3}
            size={24}
            className="cursor-pointer hover:text-green-500"
            // onClick={editPost}
          />
          <RiDeleteBin6Line
            strokeWidth={1}
            size={24}
            className="cursor-pointer hover:text-red-500"
            onClick={deletePost}
          />
        </div>
      )}
      <div className="video my-4 aspect-video w-full bg-white"></div>
      <div>
        <div className="rate flex flex-col gap-4">
          <div>
            <h3>받은 과실비율</h3>
            <p className="mt-2">
              {data?.aiReport.faultRatioA} : {data?.aiReport.faultRatioB}
            </p>
            {/* <ModifyFaultRatio /> */}
          </div>
          <div>
            <h3>영상 외 추가정보</h3>
            <p className="mt-2">{data?.description}</p>
            {/* <ModifyAdditionalInfo /> */}
          </div>
          <div>
            <h3>궁금한 점</h3>
            <p className="mt-2">{data?.question}</p>
            {/* <ModifyQuestion /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultInfo;
