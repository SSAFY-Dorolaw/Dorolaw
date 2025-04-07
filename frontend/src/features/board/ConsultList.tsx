import React from 'react';
import ConsultItem from '@/features/board/ConsultItem';
import { useNavigate } from 'react-router-dom';
import { Contents, SuccessResponse } from '@/features/board/model/types';

// currentPage를 props로 받도록 함
interface ConsultListProps {
  data?: SuccessResponse;
}

const ConsultList = ({ data }: ConsultListProps) => {
  const navigate = useNavigate();

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
