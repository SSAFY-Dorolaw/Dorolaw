import React from 'react';
import ConsultItem from '@/features/board/ConsultItem';
import { useNavigate } from 'react-router-dom';

interface article {
  requestId: number;
  title: string;
  status: string;
  memberId: number;
  createdAt: string;
}

function ConsultList() {
  const navigate = useNavigate();
  const articleList: article[] = [
    {
      requestId: 1,
      title: '교차로 내 차선변경 접촉사고',
      status: 'PENDING',
      memberId: 1,
      createdAt: '2025-03-25T14:00:02',
    },
    {
      requestId: 2,
      title: 'TEST',
      status: 'PENDING',
      memberId: 1,
      createdAt: '2025-03-25T14:00:02',
    },
    {
      requestId: 3,
      title: 'TEST',
      status: 'PENDING',
      memberId: 1,
      createdAt: '2025-03-25T14:00:02',
    },
    {
      requestId: 4,
      title: 'TEST',
      status: 'PENDING',
      memberId: 1,
      createdAt: '2025-03-25T14:00:02',
    },
    {
      requestId: 5,
      title: 'TEST',
      status: 'PENDING',
      memberId: 1,
      createdAt: '2025-03-25T14:00:02',
    },
    {
      requestId: 6,
      title: 'TEST',
      status: 'PENDING',
      memberId: 1,
      createdAt: '2025-03-25T14:00:02',
    },
    {
      requestId: 7,
      title: 'TEST',
      status: 'PENDING',
      memberId: 1,
      createdAt: '2025-03-25T14:00:02',
    },
  ];

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between gap-2 border-b py-2 text-center font-bold">
        <div className="w-12 shrink-0 text-center">No.</div>
        <div className="grow px-2">제목</div>
        <div className="w-20 shrink-0 text-center">상태</div>
        <div className="w-24 shrink-0 text-center">글쓴이</div>
        <div className="w-24 shrink-0 text-center">작성시간</div>
      </div>

      {/* Article List */}
      {articleList.map((article) => (
        <React.Fragment key={article.requestId}>
          <ConsultItem
            key={article.requestId}
            requestId={article.requestId}
            title={article.title}
            status={article.status}
            memberId={article.memberId}
            createdAt={article.createdAt}
            onClick={() => void navigate('/consultation/detail')}
          />
          <hr />
        </React.Fragment>
      ))}
    </div>
  );
}

export default ConsultList;
