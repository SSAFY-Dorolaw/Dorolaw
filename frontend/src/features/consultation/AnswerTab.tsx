import Answer from '@/features/consultation/Answer';
import { useParams } from 'react-router-dom';
import { useRequestDetail } from '@/features/consultation/model/queries';
import { Answers } from './model/types';

// 목업 데이터 정의
const mockAnswers: Answers[] = [
  {
    answerId: 1,
    lawyerId: 1,
    content:
      '안녕하세요, 법률 사무소입니다. 제공해주신 영상과 상황을 검토해 보았습니다.\n\n사고 상황을 살펴본 결과, 고객님의 과실 비율은 실제로 0%에 가깝습니다. 주정차 상태에서의 추돌 사고는 후행 차량의 주의 의무 위반이 명백하기 때문입니다.\n\n보험사에서 제시한 과실비율(5:1)은 합리적이지 않으며, 법적 대응을 통해 과실비율을 조정받을 수 있습니다. 추가 상담이 필요하시면 연락 주시기 바랍니다.',
    createdAt: '2025-03-26T14:36:20',
  },
  {
    answerId: 2,
    lawyerId: 2,
    content:
      '귀하의 상황은 전형적인 100:0 사례로 보입니다. 정차 중 후방 추돌은 특별한 사정이 없는 한 후행 차량의 100% 과실입니다. 음주운전이라는 정황은 더욱 귀하의 입장에 유리한 증거입니다.\n\n보험사가 제시한 과실비율은 수용하지 마시고, 법률 자문을 통해 적절히 대응하시는 것을 권장드립니다. 필요하시면 구체적인 법적 대응 방법을 안내해 드리겠습니다.',
    createdAt: '2025-03-27T10:15:00',
  },
];

function AnswerTab() {
  const { requestId } = useParams();
  const { data, isLoading, isError } = useRequestDetail(Number(requestId));

  if (isLoading) {
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
  const answers =
    data?.answers && data.answers.length > 0 ? data.answers : mockAnswers;

  return (
    <div className="mx-4 mt-5">
      {answers.length === 0 ? (
        <div className="grid aspect-[210/297] place-items-center bg-white">
          <div className="typo-body">아직 답변이 없습니다.</div>
        </div>
      ) : (
        <div className="aspect-[210/297] overflow-y-auto bg-white">
          {answers.map((answer) => (
            <Answer key={answer.answerId} answer={answer} />
          ))}
        </div>
      )}
    </div>
  );
}

export default AnswerTab;
