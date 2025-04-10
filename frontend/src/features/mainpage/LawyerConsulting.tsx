const LawyerConsulting = () => {
  return (
    <section className="m-20 flex justify-between">
      <article>
        <img src="/lawyer_card.png" alt="변호사 프로필" />
      </article>
      <article className="flex items-center">
        <div>
          <div className="flex">
            <img src="/law.png" alt="법 저울" className="mr-3" />
            <h2 className="my-0 text-h1 font-bold">변호사 상담 신청</h2>
          </div>
          <div>
            <h3 className="text-h3 font-bold">
              AI 분석 리포트와 함께, 변호사의 전문적인 답변을 받아보세요.
            </h3>
          </div>
          <div>
            <p className="text-bodymedium font-bold">
              AI 분석 리포트를 바탕으로, 사고에 대한 <br />
              전문 변호사의 답변을 받아보실 수 있습니다. <br />
              <br />
              답변은 인증된 교통 전문 변호사들이 작성하며, <br />
              여러 변호사의 답변을 비교한 뒤 <br />
              전화 또는 대면 상담을 예약할 수 있습니다. <br />
              <br />
              사건에 대한 보다 깊은 조언이 필요하다면 상담을 신청해보세요.
            </p>
          </div>
        </div>
      </article>
    </section>
  );
};

export default LawyerConsulting;
