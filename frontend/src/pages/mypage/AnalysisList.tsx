function AnalysisList() {
  function SingleAnalysis() {
    return (
      <section>
        <div className="mb-2 aspect-video bg-black"></div>
        <section className="w-full overflow-hidden text-left">
          <div className="flex justify-start gap-4 leading-4">
            <p className="font-semibold">제목</p>
            <p className="truncate">끔찍한사고영상</p>
          </div>
          <div className="flex justify-start gap-4 leading-4">
            <p className="font-semibold">과실비율</p>
            <p className="truncate">70 : 30</p>
          </div>
          <div className="flex justify-start gap-4 leading-4">
            <p className="font-semibold">분석 날짜</p>
            <p className="truncate">2025.03.17</p>
          </div>
          <div className="flex justify-start gap-4 leading-4">
            <p className="font-semibold">태그</p>
            <p className="truncate">교차로</p>
            <p className="truncate">뺑소니</p>
          </div>
          <div className="flex justify-start gap-4 leading-4">
            <p className="font-semibold">공개범위</p>
            <p className="truncate">비공개</p>
          </div>
        </section>
      </section>
    );
  }

  return (
    <div className="flex flex-col items-start">
      <header>
        <h3>과실비율 분석 내역</h3>
      </header>
      <main>
        <div className="mb-10 grid w-screen max-w-[1200px] grid-cols-4 justify-between gap-x-2 gap-y-4 text-center">
          <SingleAnalysis />
          <SingleAnalysis />
          <SingleAnalysis />
          <SingleAnalysis />
          <SingleAnalysis />
          <SingleAnalysis />
          <SingleAnalysis />
          <SingleAnalysis />
          <SingleAnalysis />
          <SingleAnalysis />
          <SingleAnalysis />
          <SingleAnalysis />
          <SingleAnalysis />
        </div>
      </main>
    </div>
  );
}

export default AnalysisList;
