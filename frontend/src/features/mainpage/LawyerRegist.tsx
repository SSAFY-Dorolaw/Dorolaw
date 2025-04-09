import { useAuthStore } from '@/entities/auth/model/store';
import { useNavigate } from 'react-router-dom';

const LawyerRegist = () => {
  const navigate = useNavigate();

  const isLawyer = useAuthStore((state) => state.role);

  const lawyerRegist = () => {
    if (isLawyer === 'GENERAL') {
      alert('변호사 계정으로 로그인해주세요.');
      return;
    }
    void navigate('/lawyer/authentication');
  };

  return (
    <>
      <section className="mx-[120px] flex justify-between">
        <article className="flex items-center">
          <div>
            <div className="flex">
              <h2 className="my-0 text-h1 font-bold">
                변호사로 참여하고 싶으신가요?
              </h2>
            </div>
            <br />
            <div>
              <p className="text-bodymedium font-bold">
                교통사고 전문 변호사로 등록하고, 의뢰인을 직접 만나보세요.{' '}
                <br />
                <br />
                AI 분석 리포트를 바탕으로 상담을 요청받고 <br />
                고객과 연결될 수 있습니다. <br />
                <br />
                상담 예약, 답변 관리, 일정 관리까지 한 번에!
              </p>
            </div>
          </div>
        </article>
        <article>
          <img src="/business_man.png" alt="비즈니스맨" />
        </article>
      </section>
      <section className="my-10 flex items-center justify-center">
        <button
          onClick={lawyerRegist}
          className="w-[200px] rounded-[10px] bg-y5 p-3 text-body font-bold text-black transition duration-300 hover:bg-y3"
        >
          변호사 등록하기
        </button>
      </section>
    </>
  );
};

export default LawyerRegist;
