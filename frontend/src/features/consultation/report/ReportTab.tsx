import { useParams } from 'react-router-dom';
import { useRef } from 'react';
import { useRequestDetail } from '@/features/consultation/model/queries';
import generatePDF from 'react-to-pdf';
import Report from './Report';

type Orientation = 'portrait' | 'p' | 'landscape' | 'l';

function ReportTab() {
  const { requestId } = useParams();
  const { data, isLoading, isError } = useRequestDetail(Number(requestId));

  // PDF로 변환할 보고서 영역 설정
  const reportRef = useRef<HTMLDivElement>(null);

  // PDF 생성 함수
  const downloadPDF = async () => {
    if (!reportRef.current) return;

    // 모든 요소의 원래 스타일을 저장할 Map
    const originalStylesMap = new Map<
      HTMLElement,
      Partial<CSSStyleDeclaration>
    >();

    // 스타일 저장 및 적용 함수
    const saveAndApplyPrintStyles = (element: HTMLElement) => {
      // 원래 스타일 저장
      originalStylesMap.set(element, {
        position: element.style.position,
        height: element.style.height,
        maxHeight: element.style.maxHeight,
        overflow: element.style.overflow,
        width: element.style.width,
      });

      // 프린트용 스타일 적용
      element.style.position = 'relative';
      element.style.height = 'auto';
      element.style.maxHeight = 'none';
      element.style.overflow = 'visible';
      element.style.width = '100%';

      // 하위 요소들에도 적용
      Array.from(element.children).forEach((child) => {
        if (child instanceof HTMLElement) {
          saveAndApplyPrintStyles(child);
        }
      });
    };

    // 원래 스타일 복원 함수
    const restoreOriginalStyles = (element: HTMLElement) => {
      const originalStyles = originalStylesMap.get(element);
      if (originalStyles) {
        Object.assign(element.style, originalStyles);
      }

      // 하위 요소들의 스타일도 복원
      Array.from(element.children).forEach((child) => {
        if (child instanceof HTMLElement) {
          restoreOriginalStyles(child);
        }
      });
    };

    try {
      // PDF 생성 전 스타일 저장 및 적용
      saveAndApplyPrintStyles(reportRef.current);

      // PDF 옵션 (기존과 동일)
      const options = {
        // ...existing options...
      };

      // PDF 생성 및 다운로드
      await generatePDF(reportRef, options);

      // 모든 요소의 스타일 복원
      restoreOriginalStyles(reportRef.current);
    } catch (error) {
      console.error('PDF 생성 중 오류 발생: ', error);
      // 오류 발생시에도 스타일 복원
      restoreOriginalStyles(reportRef.current);
    } finally {
      // Map 초기화
      originalStylesMap.clear();
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
      <section className="mx-4 mt-5 flex aspect-[210/297] items-center justify-center bg-white p-4 drop-shadow-[0_0_2px_rgba(0,0,0,0.25)]">
        <p>상담 데이터를 불러오는 데 실패했습니다.</p>
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
        <Report aiReport={aiReport} />
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

export default ReportTab;
