import { Edit } from 'lucide-react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useAuthStore } from '@/entities/auth/model/store';
import { useParams } from 'react-router-dom';
import { useRequestDetail } from '@/features/consultation/model/queries';

const ConsultInfo = () => {
  const clientId = useAuthStore((state) => state.clientId); // 로그인 시 받아온 clientId
  const { requestId } = useParams(); // URL에서 requestId 파라미터 가져오기

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

  console.log(data);

  return (
    <div className="col-span-7 mb-10">
      <div className="flex w-full justify-start gap-2">
        <h2>{data?.title}</h2>
        <div className="typo-button-small my-auto h-fit rounded-[10px] bg-p2 px-2">
          상담완료
        </div>
      </div>
      <div className="icongroup flex justify-end gap-2">
        <Edit strokeWidth={3} size={24} />
        <RiDeleteBin6Line strokeWidth={1} size={24} />
      </div>
      <div className="video my-4 aspect-video w-full bg-white"></div>
      <div>
        <div className="rate flex flex-col gap-4">
          <div>
            <h3>받은 과실비율</h3>
            <p className="mt-2">
              {data?.aiReport.faultRatioA} : {data?.aiReport.faultRatioB}
            </p>
          </div>
          <div>
            <h3>영상 외 추가정보</h3>
            <p className="mt-2">{data?.description}</p>
          </div>
          <div>
            <h3>궁금한 점</h3>
            <p className="mt-2">{data?.question}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultInfo;
