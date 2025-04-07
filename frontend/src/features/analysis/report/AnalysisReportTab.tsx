import { useParams } from 'react-router-dom';
import { useAnalysisDetail } from '@/features/analysis/model/queries';

function AnalysisReportTab() {
  const { faultAnalysisId } = useParams();
  const { data, isLoading, isError } = useAnalysisDetail(
    Number(faultAnalysisId),
  );

  if (isLoading) {
    return (
      <div className="mx-4 mt-5 flex aspect-[210/297] items-center justify-center bg-white p-4 drop-shadow-[0_0_2px_rgba(0,0,0,0.25)]">
        <p>분석 데이터를 불러오는 중입니다...</p>
      </div>
    );
  }

  if (isError || !data?.aiReport) {
    return (
      <div className="mx-4 mt-5 flex aspect-[210/297] items-center justify-center bg-white p-4 drop-shadow-[0_0_2px_rgba(0,0,0,0.25)]">
        <p>분석 데이터를 불러오는 데 실패했습니다.</p>
      </div>
    );
  }

  const { aiReport } = data;

  return (
    <>
      <div className="mx-4 mt-5 aspect-[210/297] bg-white p-4 drop-shadow-[0_0_2px_rgba(0,0,0,0.25)]">
        <h3 className="mb-3 text-lg font-bold">사고 분석 리포트</h3>

        <h4 className="mt-4 font-semibold">사고 개요 및 상황</h4>
        <p className="mb-2">
          <span className="font-medium">사고 위치:</span>{' '}
          {aiReport.accidentLocation} (
          {aiReport.accidentLocationCharacteristics})
        </p>
        <p className="mb-2">
          <span className="font-medium">사고 객체:</span>{' '}
          {aiReport.accidentObject}
        </p>
        <p className="mb-2">
          <span className="font-medium">사고 유형:</span> 타입{' '}
          {aiReport.accidentType} - {aiReport.directionOfA} 중이던 A차량과{' '}
          {aiReport.directionOfB} 중이던 B차량의 충돌
        </p>

        <h4 className="mt-4 font-semibold">과실비율 분석</h4>
        <p className="mb-2">
          <span className="font-medium">A차량:</span> {aiReport.faultRatioA}%
        </p>
        <p className="mb-2">
          <span className="font-medium">B차량:</span> {aiReport.faultRatioB}%
        </p>

        <h4 className="mt-4 font-semibold">분석 일자</h4>
        <p className="mb-2">
          <span className="font-medium">최초 분석:</span>{' '}
          {new Date(aiReport.createAt).toLocaleDateString()}
        </p>
        <p className="mb-2">
          <span className="font-medium">최종 업데이트:</span>{' '}
          {new Date(aiReport.updatedAt).toLocaleDateString()}
        </p>

        <div className="mt-6 border-t pt-4">
          <h4 className="font-semibold">참고 사항</h4>
          <p className="text-sm">
            본 과실비율은 AI 분석 결과로, 실제 결정은 현장 조사·전문가 의견 등에
            따라 달라질 수 있습니다. 교통 전문 변호사·보험사 보상담당자 등과
            추가 상담이 필요할 수 있습니다.
          </p>
        </div>
      </div>
      <div className="my-2 mt-5 flex justify-center">
        <button className="button-small mx-4 w-[128px] rounded-[10px] bg-p5 p-2 text-p1">
          PDF 다운로드
        </button>
      </div>
    </>
  );
}

export default AnalysisReportTab;
