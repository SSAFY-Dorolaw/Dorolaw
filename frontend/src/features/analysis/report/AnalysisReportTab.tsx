import { useRef } from 'react';
import generatePDF from 'react-to-pdf';
import { useParams } from 'react-router-dom';
import { useAnalysisDetail } from '@/features/analysis/model/queries';
import AccidentReport from './AnalysisReport';

type Orientation = 'portrait' | 'p' | 'landscape' | 'l';

function AnalysisReportTab() {
  const { faultAnalysisId } = useParams();
  const { data, isLoading, isError } = useAnalysisDetail(
    Number(faultAnalysisId),
  );

  // PDF로 변환할 보고서 영역 설정
  const reportRef = useRef<HTMLDivElement>(null);

  // PDF 생성 함수
  const downloadPDF = async () => {
    if (!reportRef.current) return;

    // PDF 옵션
    const options = {
      filename: `사고분석리포트_${faultAnalysisId}.pdf`,
      page: {
        format: 'A4',
        orientation: 'portrait' as Orientation,
        margins: { top: 20, right: 20, bottom: 20, left: 20 },
      },
      overrides: {
        // 메타데이터 (필요 없다고 판단되면 지울 예정)
        pdf: {
          title: `AI 과실 분석 리포트_${faultAnalysisId}`,
          author: '교통사고 분석 시스템',
          subject: '교통사고 과실비율 분석',
          creator: '교통사고 분석 시스템',
        },
      },
    };

    try {
      // PDF 생성 및 다운로드
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await generatePDF(reportRef, options);
    } catch (error) {
      console.error('PDF 생성 중 오류 발생: ', error);
    }
  };

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

  /* 보고서 추가 CSS는 뱅크샐러드 참고해보자 */

  return (
    <>
      <div ref={reportRef}>
        <AccidentReport aiReport={aiReport} />
      </div>
      <div className="my-2 mt-5 flex justify-center">
        <button
          className="button-small mx-4 w-[128px] rounded-[10px] bg-p5 p-2 text-p1"
          onClick={downloadPDF}
        >
          PDF 다운로드
        </button>
      </div>
    </>
  );
}

export default AnalysisReportTab;
