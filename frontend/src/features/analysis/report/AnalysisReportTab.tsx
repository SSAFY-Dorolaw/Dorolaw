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

    // PDF 생성 전 임시 스타일 적용
    const originalStyles = { ...reportRef.current.style };

    // 스타일 강제 적용
    const applyPrintStyles = (element: HTMLElement) => {
      element.style.position = 'relative';
      element.style.height = 'auto';
      element.style.maxHeight = 'none';
      element.style.overflow = 'visible';
      element.style.width = '100%';

      // 내부 요소에도 스타일 적용
      Array.from(element.children).forEach((child) => {
        if (child instanceof HTMLElement) {
          child.style.overflow = 'visible';
          child.style.height = 'auto';
          if (child.children.length > 0) {
            applyPrintStyles(child);
          }
        }
      });
    };

    // 스타일 적용
    applyPrintStyles(reportRef.current);

    // PDF 옵션
    const options = {
      filename: `사고 분석 리포트_${faultAnalysisId}.pdf`,
      page: {
        format: 'A4',
        orientation: 'portrait' as Orientation,
        margins: { top: 20, right: 20, bottom: 20, left: 20 },
      },
      overrides: {
        pdf: {
          title: `AI 과실 분석 리포트_${faultAnalysisId}`,
          author: '교통사고 분석 시스템',
          subject: '교통사고 과실비율 분석',
          creator: '교통사고 분석 시스템',
        },
        canvas: {
          // 보이지 않는 컨텐츠도 포함하여 캡처
          useCORS: true,
          scrollX: 0,
          scrollY: 0,
        },
        // 전체 페이지 렌더링 설정
        html2canvas: {
          scrollY: 0,
          scrollX: 0,
          windowWidth: 794, // A4 너비(픽셀)
          windowHeight: 1123, // A4 높이(픽셀)
          useCORS: true,
          logging: true,
          scale: 1.5,
        },
      },
      method: 'save', // 'open' 대신 'save'로 변경하여 바로 다운로드
    };

    try {
      // PDF 생성 및 다운로드
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await generatePDF(reportRef, options);

      // 원래 스타일 복원
      Object.assign(reportRef.current.style, originalStyles);
    } catch (error) {
      console.error('PDF 생성 중 오류 발생: ', error);
      // 원래 스타일 복원
      Object.assign(reportRef.current.style, originalStyles);
    }
  };

  if (isLoading) {
    return (
      <section className="mx-4 mt-5 flex aspect-[210/297] items-center justify-center bg-white p-4 drop-shadow-[0_0_2px_rgba(0,0,0,0.25)]">
        <p>분석 데이터를 불러오는 중입니다...</p>
      </section>
    );
  }

  if (isError || !data?.aiReport) {
    return (
      <section className="mx-4 mt-5 flex aspect-[210/297] items-center justify-center bg-white p-4 drop-shadow-[0_0_2px_rgba(0,0,0,0.25)]">
        <p>분석 데이터를 불러오는 데 실패했습니다.</p>
      </section>
    );
  }

  const { aiReport } = data;

  return (
    <>
      <article
        ref={reportRef}
        data-report
        style={{
          position: 'relative',
          width: '100%',
          height: 'auto',
          overflow: 'visible',
        }}
      >
        <AccidentReport aiReport={aiReport} />
      </article>
      <nav className="my-2 mt-5 flex justify-center">
        <button
          className="button-small mx-4 w-[128px] rounded-[10px] bg-p5 p-2 text-p1"
          onClick={downloadPDF}
        >
          PDF 다운로드
        </button>
      </nav>
    </>
  );
}

export default AnalysisReportTab;
