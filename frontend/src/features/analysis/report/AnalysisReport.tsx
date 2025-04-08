import { useRef } from 'react';
import { AIReport } from '../model/types';
import { formatDate } from '@/shared/lib/utils/dateFormatter';

interface AccidentReportProps {
  aiReport: AIReport;
}

const AccidentReport = ({ aiReport }: AccidentReportProps) => {
  const reportRef = useRef<HTMLDivElement>(null);

  return (
    <article
      ref={reportRef}
      className="mx-4 mt-5 aspect-[210/297] overflow-y-auto bg-white p-6 drop-shadow-[0_0_2px_rgba(0,0,0,0.25)]"
    >
      <header>
        <h2 className="mb-5 text-xl font-bold">사고 상황 분석 리포트</h2>
        <time className="mb-3 block text-right text-sm text-gray-500">
          작성일: {formatDate(aiReport.createAt)}
        </time>
      </header>

      <section className="mb-6 rounded-lg bg-gray-50 p-4">
        <h3 className="mb-2 font-semibold">사고 유형 분석</h3>
        <dl className="grid grid-cols-2 gap-4">
          <div>
            <dt className="text-sm text-gray-500">사고 대상</dt>
            <dd className="font-medium">{aiReport.accidentObject}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">사고 장소</dt>
            <dd className="font-medium">{aiReport.accidentLocation}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">사고 특성</dt>
            <dd className="font-medium">
              {aiReport.accidentLocationCharacteristics}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">사고 유형</dt>
            <dd className="font-medium">유형 {aiReport.accidentType}</dd>
          </div>
        </dl>
      </section>

      <section className="mb-6">
        <h3 className="mb-2 font-semibold">차량 이동 방향</h3>
        <dl className="grid grid-cols-2 gap-4">
          <div>
            <dt className="text-sm text-gray-500">A차량(본인)</dt>
            <dd className="font-medium">{aiReport.directionOfA}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">B차량(상대방)</dt>
            <dd className="font-medium">{aiReport.directionOfB}</dd>
          </div>
        </dl>
      </section>

      <section className="mb-6">
        <h3 className="mb-2 font-semibold">AI 과실비율 분석</h3>
        <figure className="flex items-center justify-center rounded-lg bg-p5 p-4 text-center">
          <figcaption className="w-1/2 border-r border-gray-300 pr-4">
            <p className="text-sm text-y5">본인(A)</p>
            <p className="text-2xl font-bold text-p1">
              {aiReport.faultRatioA}%
            </p>
          </figcaption>
          <figcaption className="w-1/2 pl-4">
            <p className="text-sm text-y5">상대방(B)</p>
            <p className="text-2xl font-bold text-p1">
              {aiReport.faultRatioB}%
            </p>
          </figcaption>
        </figure>
      </section>

      <section className="mb-4">
        <h3 className="mb-2 font-semibold">분석 결과</h3>
        <p className="rounded-lg bg-gray-50 p-4 text-sm">
          본 사고는 {aiReport.accidentObject} 유형으로,{' '}
          {aiReport.accidentLocation}에서 발생한
          {aiReport.accidentLocationCharacteristics} 사고입니다. A차량(본인)은{' '}
          {aiReport.directionOfA}
          상태였으며, B차량(상대방)은 {aiReport.directionOfB} 상황이었습니다.
          이에 따라 AI 분석 결과 과실비율은 {aiReport.faultRatioA}:
          {aiReport.faultRatioB}로 산정되었습니다.
        </p>
      </section>

      <footer className="mt-6 border-t pt-4">
        <h3 className="font-semibold">참고 사항</h3>
        <p className="mt-2 text-sm text-gray-600">
          본 과실비율은 AI 분석 결과로, 실제 결정은 현장 조사·전문가 의견 등에
          따라 달라질 수 있습니다. 교통 전문 변호사·보험사 보상담당자 등과 추가
          상담이 필요할 수 있습니다.
        </p>
      </footer>
    </article>
  );
};

export default AccidentReport;
