import { useLawyerRequests } from '@/features/mypage/lawyer/model/queries';
import { useNavigate } from 'react-router-dom';

interface ConsultProps {
  completedConsultationCount: number;
}

const MyConsult = ({ completedConsultationCount }: ConsultProps) => {
  const navigate = useNavigate();

  const { data, isPending, isSuccess, isError } = useLawyerRequests();

  if (isPending) return <div>로딩중</div>;
  if (isError) return <div>에러</div>;
  if (isSuccess)
    return (
      <div className="mx-[50px] my-8">
        <div className="flex flex-col">
          <div className="flex cursor-pointer items-center gap-2">
            <h3 className="m-0 text-body font-bold">최근 상담</h3>
            <p className="ml-3 text-caption text-g3">
              {completedConsultationCount}
            </p>
            <p
              className="cursor-point ml-1 text-caption text-g3"
              onClick={() => void navigate('/lawyer/requests')}
            >
              더보기
            </p>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4 bg-p1">
            {data.length ? (
              data.map((request, index) => (
                <div key={index} className="flex flex-col">
                  <p className="max-w-[20ch] cursor-pointer truncate text-bodysmall">
                    {request.title}
                  </p>
                  <p className="max-w-[20ch] cursor-pointer truncate text-caption text-p4">
                    {request.requestAnsweredContent}
                  </p>
                  <span className="mt-2 text-caption text-p4">
                    {request.answeredAt}
                  </span>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    );
};

export default MyConsult;
