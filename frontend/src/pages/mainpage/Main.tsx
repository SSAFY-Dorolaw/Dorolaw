import MainHeader from '@/features/mainpage/MainHeader';
import MainFunctions from '@/features/mainpage/MainFunctions';
import Guideline from '@/features/mainpage/Guideline';
import AiAnalysis from '@/features/mainpage/AiAnalysis';
import LawyerConsulting from '@/features/mainpage/LawyerConsulting';

const Main = () => {
  return (
    <>
      {/* 상단 이미지 & 버튼 */}
      <MainHeader />

      {/* 메인 컨텐츠 */}
      <main className="w-[1200px]">
        {/* 핵심 3가지 기능 소개 */}
        <MainFunctions />

        {/* 이용 방법 */}
        <Guideline />

        {/* AI 사고 분석 */}
        <AiAnalysis />

        {/* 변호사 상담 신청 */}
        <LawyerConsulting />

        {/* 변호사이신가요? */}
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
      </main>
    </>
  );
};

export default Main;
