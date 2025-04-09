import { useState } from 'react';

interface ModifyQuestionProps {
  content: string | undefined;
}

const ModifyQuestion = ({ content }: ModifyQuestionProps) => {
  const [question, setQuestion] = useState(content);

  return (
    <div>
      <textarea
        className="mt-3 h-[160px] w-full rounded-[5px] pl-[10px] pt-[10px]"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
    </div>
  );
};

export default ModifyQuestion;
