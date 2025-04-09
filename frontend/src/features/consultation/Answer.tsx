import { FaUserCircle } from 'react-icons/fa';
import { Answers } from './model/types';
import { formatDate } from '@/shared/lib/utils/dateFormatter';
import { useNavigate } from 'react-router-dom';

interface AnswerProps {
  answer: Answers;
  requestId: number;
  isMyRequest: boolean;
  isMyAnswer: boolean;
}

function Answer({ answer, requestId, isMyRequest, isMyAnswer }: AnswerProps) {
  const navigate = useNavigate();
  return (
    <div className="w-full">
      <hr />
      <header className="flex h-[54px] items-center px-4">
        <div className="profile">
          <FaUserCircle size={32} />
        </div>
        <div className="typo-body mx-2">변호사 #{answer.lawyerId}</div>
        <div className="reservation ml-2">
          {isMyRequest ? (
            <button
              className="rounded-[10px] bg-p5 px-2 text-bodysmall text-p1"
              onClick={() =>
                void navigate(`/lawyer/profile/${answer.lawyerId}/${requestId}`)
              }
            >
              상담 예약
            </button>
          ) : (
            <></>
          )}
        </div>
        <div className="ml-auto text-xs text-gray-500">
          {formatDate(answer.createdAt)}
        </div>
      </header>
      <article className="whitespace-pre-wrap p-4">
        <p>{answer.content}</p>
      </article>
    </div>
  );
}

export default Answer;
