import Answer from '@/features/consultation/Answer';

function AnswerTab() {
  const answers: object[] = [{ id: 1, answer: 'asdflkjs' }];
  return (
    <>
      <div className="mx-4 my-2 flex gap-2 justify-self-start">
        <button className="button-small w-[128px] rounded-[10px] bg-p5 p-2 text-p1">
          광역시/도
        </button>
        <button className="button-small w-[128px] rounded-[10px] bg-p5 p-2 text-p1">
          시/군/구
        </button>
      </div>
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
    </>
  );
}

export default AnswerTab;
