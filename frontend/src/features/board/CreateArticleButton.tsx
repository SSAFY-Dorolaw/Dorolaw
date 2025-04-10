import { useNavigate } from 'react-router-dom';

interface CreateArticleButtonProps {
  isConsultTab: boolean;
}

function CreateArticleButton({ isConsultTab }: CreateArticleButtonProps) {
  const navigate = useNavigate();
  return (
    <button
      className="typo-button self-end rounded-[10px] bg-p5 px-10 py-2 text-p1"
      onClick={() =>
        void navigate(`/upload/${isConsultTab ? 'consultation' : 'report'}`)
      }
    >
      {isConsultTab ? '사건 의뢰하기' : '과실 분석하기'}
    </button>
  );
}

export default CreateArticleButton;
