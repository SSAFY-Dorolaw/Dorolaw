import React from 'react';
import ConsultItem from '@/features/board/ConsultItem';
import { useConsultListQuery } from './api';
import { useNavigate } from 'react-router-dom';
import { Contents } from '@/features/board/model/types';

// currentPage를 props로 받도록 함
interface ConsultListProps {
  currentPage: number;
}

const ConsultList = ({ currentPage = 0 }: ConsultListProps) => {
  const navigate = useNavigate();

  /* Tanstack Query로 데이터 가져오기 */
  const { data, isLoading, isError } = useConsultListQuery(currentPage);

  /**
   * < 에러 방지를 위해 적어야 하는 내용들 >
   * Tanstack Query로 데이터 가져올 때,
   * data가 로드되기 전에는 타입이 undefined
   * 아래 내용들을 적지 않으면 타입 에러 발생 (렌더링도 안 됨)
   */

  // 로딩 중 표시
  if (isLoading) {
    return (
      <div className="mt-10 py-8 text-center">
        <p>데이터를 불러오는 중입니다...</p>
      </div>
    );
  }

  // 에러 발생 시 표시
  if (isError) {
    return (
      <div className="mt-10 py-8 text-center text-red-500">
        <p>데이터를 불러오는 중 오류가 발생했습니다.</p>
      </div>
    );
  }

  // 데이터가 없다면
  if (!data?.content || data.content.length === 0) {
    return (
      <div className="mt-10 py-8 text-center">
        <p>표시할 데이터가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between gap-2 border-b py-2 text-center font-bold">
        <div className="w-12 shrink-0 text-center">No.</div>
        <div className="grow px-2">제목</div>
        <div className="w-20 shrink-0 text-center">상태</div>
        <div className="w-24 shrink-0 text-center">글쓴이</div>
        <div className="w-24 shrink-0 text-center">작성시간</div>
      </div>

      {/* Consulting List */}
      {data.content.map((consulting: Contents) => (
        <React.Fragment key={consulting.requestId}>
          <ConsultItem
            key={consulting.requestId}
            requestId={consulting.requestId}
            title={consulting.title}
            status={consulting.status}
            memberId={consulting.memberId}
            createdAt={consulting.createdAt}
            onClick={() =>
              void navigate(`/consultation/${consulting.requestId}`)
            }
          />
          <hr />
        </React.Fragment>
      ))}
    </div>
  );
};

export default ConsultList;
