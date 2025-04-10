import Answer from '@/features/consultation/Answer';
import { useNavigate, useParams } from 'react-router-dom';
import { useRequestDetail } from '@/features/consultation/model/queries';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { usePostAnswer } from '@/features/consultation/model/mutations';
import { useAuthStore } from '@/entities/auth/model/store';

// 목업 데이터 정의
// const mockAnswers: Answers[] = [
//   {
//     answerId: 1,
//     lawyerId: 1,
//     content:
//       '안녕하세요, 법률 사무소입니다. 제공해주신 영상과 상황을 검토해 보았습니다.\n\n사고 상황을 살펴본 결과, 고객님의 과실 비율은 실제로 0%에 가깝습니다. 주정차 상태에서의 추돌 사고는 후행 차량의 주의 의무 위반이 명백하기 때문입니다.\n\n보험사에서 제시한 과실비율(5:1)은 합리적이지 않으며, 법적 대응을 통해 과실비율을 조정받을 수 있습니다. 추가 상담이 필요하시면 연락 주시기 바랍니다.',
//     createdAt: '2025-03-26T14:36:20',
//   },
//   {
//     answerId: 2,
//     lawyerId: 2,
//     content:
//       '귀하의 상황은 전형적인 100:0 사례로 보입니다. 정차 중 후방 추돌은 특별한 사정이 없는 한 후행 차량의 100% 과실입니다. 음주운전이라는 정황은 더욱 귀하의 입장에 유리한 증거입니다.\n\n보험사가 제시한 과실비율은 수용하지 마시고, 법률 자문을 통해 적절히 대응하시는 것을 권장드립니다. 필요하시면 구체적인 법적 대응 방법을 안내해 드리겠습니다.',
//     createdAt: '2025-03-27T10:15:00',
//   },
// ];

function AnswerTab() {
  const navigate = useNavigate();
  const { requestId } = useParams();
  const [answer, setAnswer] = useState('');
  const { data, isPending, isError } = useRequestDetail(Number(requestId));
  const clientId = useAuthStore((state) => state.clientId);
  const role = useAuthStore((state) => state.role);
  const postAnswer = usePostAnswer();

  const [showPopup, setShowPopup] = useState(false);

  const postPopup = () => {
    console.log('팝업 열기');
    setShowPopup(true);
  };

  const closePopup = () => {
    console.log('팝업 열기');
    setShowPopup(false);
  };

  const handleSubmit = () => {
    if (!data?.title || !data?.memberId) return;
    if (!answer) {
      alert('답변을 입력해주세요.');
      return;
    }

    postAnswer.mutate(
      {
        requestId: Number(requestId),
        content: answer,
        title: data.title,
        memberId: data.memberId,
      },
      {
        onSuccess: () => {
          closePopup();
          setAnswer('');
        },
      },
    );
  };

  if (isPending) {
    return (
      <div className="mx-4 mt-5 flex aspect-[210/297] items-center justify-center bg-white">
        <p>답변 데이터를 불러오는 중입니다...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-4 mt-5 flex aspect-[210/297] items-center justify-center bg-white">
        <p>답변 데이터를 불러오는 데 실패했습니다.</p>
      </div>
    );
  }

  // API에서 답변을 가져오거나, 없을 경우 목업 데이터 사용
  // const answers =
  //   data?.answers && data.answers.length > 0 ? data.answers : mockAnswers;
  return (
    <div className="mx-4 mt-5">
      {data.answers.length === 0 ? (
        <div className="grid aspect-[210/297] place-items-center bg-white">
          <div className="typo-body">아직 답변이 없습니다.</div>
        </div>
      ) : (
        <div className="aspect-[210/297] overflow-y-auto bg-white">
          {data.answers.map((answer) => (
            <Answer
              key={answer.answerId}
              answer={answer}
              requestId={Number(requestId)}
              isMyRequest={clientId === data.memberId}
              isMyAnswer={clientId === answer.lawyerId}
            />
          ))}
        </div>
      )}
      {showPopup &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="mx-4 w-full max-w-md rounded-lg bg-white p-6">
              <div className="mb-4 flex items-center justify-between">
                <div></div>
                <h2>의뢰 답변하기</h2>
                <button
                  onClick={closePopup}
                  className="self-justify-end text-xl text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="mb-6 rounded-lg bg-white p-6 shadow">
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="의뢰인에게 상세하게 답변해주세요"
                  className="h-32 w-full rounded-lg border border-p2 p-3"
                />
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={handleSubmit}
                  className="rounded-lg bg-p5 px-6 py-1 text-body text-white hover:bg-p4"
                >
                  확인
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}

      {role === 'CERTIFIED_LAWYER' ? (
        <nav className="my-2 mt-5 flex justify-center">
          <button
            className="button-small mx-4 rounded-[10px] bg-p5 p-2 px-6 text-p1 transition hover:text-y5"
            onClick={postPopup}
          >
            답변하기
          </button>
        </nav>
      ) : role === 'LAWYER' ? (
        <nav className="my-2 mt-5 flex justify-center">
          <button
            className="button-small mx-4 rounded-[10px] bg-p5 p-2 px-6 text-p1 transition hover:text-y5"
            onClick={() => void navigate('/lawyer/authentication')}
          >
            변호사 인증하기
          </button>
        </nav>
      ) : (
        <></>
      )}
    </div>
  );
}

export default AnswerTab;
