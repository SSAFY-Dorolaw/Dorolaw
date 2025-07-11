import { useNavigate } from 'react-router-dom';

const MainHeader = () => {
  const navigate = useNavigate();
  const goToReport = () => {
    void navigate('/upload/report');
  };
  const goToConsultation = () => {
    void navigate('/upload/consultation');
  };
  return (
    <nav className="inset-x-0 h-[calc(100dvh-128px)] w-screen leading-[0]">
      <img
        className="size-full object-cover"
        src="/main_img.png"
        alt="메인이미지"
      />
      {/* 이미지 위에 오버레이 텍스트 */}
      <div
        className="absolute inset-0 mt-10 flex flex-col items-center justify-center pt-20 text-white"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <section className="mb-10 mt-[-100px]">
          {/* 위쪽으로 이동시키기 위해 negative margin 추가 */}
          <h1 className="mb-5 text-center text-5xl font-bold leading-normal">
            사고 영상, AI가 먼저 분석하고
            <br />
            변호사가 도와드립니다.
          </h1>
          <p className="mb-8 text-center text-2xl font-bold">
            블랙박스 | CCTV 영상 업로드로 <br />
            AI 과실 비율 분석, 변호사 상담까지 연결!
          </p>
        </section>
        {/* 버튼 컨테이너 */}
        <nav
          className="flex space-x-6"
          data-aos="zoom-in"
          data-aos-duration="1000"
          data-aos-delay="200"
        >
          {/* 첫 번째 버튼 */}
          <button
            onClick={goToReport}
            className="mr-5 w-[330px] rounded-[10px] bg-y5 p-8 text-h3 font-bold text-black transition-transform duration-300 hover:scale-[104%] hover:bg-y3"
          >
            AI 과실비율 분석 시작하기
          </button>
          {/* 두 번째 버튼 */}
          <button
            onClick={goToConsultation}
            className="w-[330px] rounded-[10px] bg-y5 px-8 py-9 text-h3 font-bold text-black transition-transform duration-300 hover:scale-[104%] hover:bg-y3"
          >
            변호사 상담 신청하기
          </button>
        </nav>
      </div>
    </nav>
  );
};

export default MainHeader;
