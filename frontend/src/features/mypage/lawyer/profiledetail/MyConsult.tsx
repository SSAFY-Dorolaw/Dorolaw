import { useLawyerRequests } from '@/features/reservation/model/queries';
import { useNavigate } from 'react-router-dom';

interface ConsultProps {
  completedConsultationCount: number;
  lawyerId: number;
}

const MyConsult = ({ completedConsultationCount, lawyerId }: ConsultProps) => {
  const navigate = useNavigate();

  const { data, isPending, isError, isSuccess } = useLawyerRequests(lawyerId);

  if (isPending) return <div>로딩중</div>;
  if (isError) return <div>에러</div>;
  if (isSuccess)
    return (
      <div className="mx-[50px] my-8">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h3 className="m-0 text-body font-bold">최근 상담</h3>
            <p className="ml-3 text-caption text-g3">
              {completedConsultationCount}
            </p>
            <div className="flex cursor-pointer items-center gap-1 text-p4">
              {data?.length ? (
                <p
                  className="ml-1 text-caption text-g3"
                  onClick={() => void navigate('/lawyer/requests')}
                >
                  더보기
                </p>
              ) : (
                <></>
              )}
            </div>
          </div>

          {data.length ? (
            <div className="mt-4 grid grid-cols-3 gap-4 bg-p1">
              {data.slice(0, 3).map((request, index) => (
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
              ))}
            </div>
          ) : (
            <div className="typo-caption my-6 bg-p1 p-5 text-center text-p3">
              <p className="text-bodysemibold mb-2">상담 내역이 없습니다.</p>
            </div>
          )}
        </div>
        {/* </div> */}
      </div>
    );
};

export default MyConsult;
