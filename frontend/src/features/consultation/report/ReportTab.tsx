import { useParams } from 'react-router-dom';
import { useRef } from 'react';
import { useRequestDetail } from '@/features/consultation/model/queries';
import generatePDF from 'react-to-pdf';
import AccidentReport from '@/features/analysis/report/AnalysisReport';

type Orientation = 'portrait' | 'p' | 'landscape' | 'l';

function ReportTab() {
  const { requestId } = useParams();
  const { data, isLoading, isError } = useRequestDetail(Number(requestId));

  // PDF로 변환할 보고서 영역 설정
  const reportRef = useRef<HTMLDivElement>(null);

  // PDF 생성 함수
  const downloadPDF = async () => {
    if (!reportRef.current) return;

    // PDF 옵션
    const options = {
      filename: `변호사 상담용 사고 분석 리포트_${requestId}.pdf`,
      page: {
        format: 'A4',
        orientation: 'portrait' as Orientation,
        margins: { top: 20, right: 20, bottom: 20, left: 20 },
      },
      overrides: {
        pdf: {
          title: `AI 과실 분석 리포트_${requestId}`,
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

export default ReportTab;
