import { useState } from 'react';

const ModifyQuestion = () => {
  const [question, setQuestion] = useState('');

  return (
    <div>
      <textarea
        placeholder="추가적으로 변호사에게 궁금한 점을 물어보세요"
        className="mt-3 h-[160px] w-full rounded-[5px] pl-[10px] pt-[10px]"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
    </div>
  );
};

export default ModifyQuestion;
