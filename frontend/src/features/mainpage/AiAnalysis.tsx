const AiAnalysis = () => {
  return (
    <section className="mx-20 flex justify-between pt-5">
      <article className="flex items-center">
        <div>
          <div className="flex">
            <img src="/car.png" alt="자동차" className="mr-3" />
            <h2 className="my-0 text-h1 font-bold">AI 사고 분석</h2>
          </div>
          <div>
            <h3 className="text-h3 font-bold">
              영상 업로드만으로 과실 비율 분석 리포트를 받아보세요.
            </h3>
          </div>
          <div>
            <p className="text-bodymedium font-bold">
              교통사고 블랙박스 또는 CCTV 영상을 업로드하면 <br />
              AI가 자동으로 분석하여 사고 대상, 과실 비율 등을 포함한 <br />
              전문 리포트를 제공합니다. <br />
              <br />
              단순 분석이 필요할 때는 상담 없이 리포트만 받아보세요.
            </p>
          </div>
        </div>
      </article>
      <article>
        <img src="/analysis_report.png" alt="분석 리포트" />
      </article>
    </section>
  );
};

export default AiAnalysis;
