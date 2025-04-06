import Answer from '@/features/consultation/Answer';

function AnswerTab() {
  const answers: object[] = [{ id: 1, answer: 'asdflkjs' }];
  return (
    <div>
      {answers.length === 0 ? (
        <div className="mx-4 grid aspect-[210/297] place-items-center bg-white">
          <div className="typo-body">아직 답변이 없습니다.</div>
        </div>
      ) : (
        <div className="mx-4 grid aspect-[210/297] place-items-center overflow-y-auto bg-white">
          <Answer></Answer>
          <Answer></Answer>
          <Answer></Answer>
          <Answer></Answer>
          <Answer></Answer>
          <Answer></Answer>
          <Answer></Answer>
          <Answer></Answer>
          <Answer></Answer>
        </div>
      )}
    </div>
  );
}

export default AnswerTab;
