// filepath: c:\Users\SSAFY\dev\repo\S12P21A501\frontend\src\features\consultation\report\ReportTab.tsx
import { useParams } from 'react-router-dom';
import { useRequestDetail } from '@/features/consultation/model/queries';

function ReportTab() {
  const { requestId } = useParams();
  const { data, isLoading, isError } = useRequestDetail(Number(requestId));

  if (isLoading) {
    return (
      <div className="mx-4 mt-5 flex aspect-[210/297] items-center justify-center bg-white p-4 drop-shadow-[0_0_2px_rgba(0,0,0,0.25)]">
        <p>상담 데이터를 불러오는 중입니다...</p>
      </div>
    );
  }

  if (isError || !data?.aiReport) {
    return (
      <div className="mx-4 mt-5 flex aspect-[210/297] items-center justify-center bg-white p-4 drop-shadow-[0_0_2px_rgba(0,0,0,0.25)]">
        <p>상담 데이터를 불러오는 데 실패했습니다.</p>
      </div>
    );
  }

  const { aiReport } = data;

  return (
    <>
      <div className="mx-4 mt-5 aspect-[210/297] bg-white p-4 drop-shadow-[0_0_2px_rgba(0,0,0,0.25)]">
        <h3 className="mb-3 text-lg font-bold">상담 분석 리포트</h3>

        {/* 상담 관련 데이터 표시 */}
        {/* ... */}
      </div>
      <div className="my-2 mt-5 flex justify-center">
        <button className="button-small mx-4 w-[128px] rounded-[10px] bg-p5 p-2 text-p1">
          PDF 다운로드
        </button>
      </div>
    </>
  );
}

export default ReportTab;
