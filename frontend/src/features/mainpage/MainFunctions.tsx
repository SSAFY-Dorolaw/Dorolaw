const MainFunctions = () => {
  return (
    <section className="mt-10 flex justify-between">
      <article className="flex h-[320px] w-[384px] items-center justify-center rounded-[10px] bg-white">
        <div className="flex flex-col items-center text-center">
          <img src="/accident_analysis.png" alt="사고 분석" />
          <h3 className="mb-2 text-h2 font-bold">AI 사고 분석</h3>
          <p className="text-h3">
            사고 영상을 업로드하면 <br /> AI가 과실 비율을 분석합니다.
          </p>
        </div>
      </article>
      <article className="flex h-[320px] w-[384px] items-center justify-center rounded-[10px] bg-white">
        <div className="flex flex-col items-center text-center">
          <img src="/lawyer.png" alt="변호사 상담" />
          <h3 className="mb-2 text-h2 font-bold">변호사 상담 신청</h3>
          <p className="text-h3">
            상담이 필요한 사고라면 <br /> 전문 변호사와 연결해드립니다.
          </p>
        </div>
      </article>
      <article className="flex h-[320px] w-[384px] items-center justify-center rounded-[10px] bg-white">
        <div className="flex flex-col items-center text-center">
          <img src="/board.png" alt="의뢰/분석 게시판" />
          <h3 className="mb-2 text-h2 font-bold">의뢰/분석 게시판</h3>
          <p className="text-h3">
            다른 사람들의 사고 분석 결과와 <br /> 변호사 답변을 참고해보세요.
          </p>
        </div>
      </article>
    </section>
  );
};

export default MainFunctions;
