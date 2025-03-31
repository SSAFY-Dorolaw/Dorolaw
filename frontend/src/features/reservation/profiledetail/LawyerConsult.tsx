const LawyerConsult = () => {
  return (
    <div className="mx-[50px] my-8">
      <div className="flex flex-col">
        <div className="flex cursor-pointer items-center gap-2">
          <h3 className="m-0 text-body font-bold">최근 상담</h3>
          <p className="ml-3 text-caption text-g3">456</p>
          <p className="ml-1 text-caption text-g3">더보기</p>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4 bg-p1">
          <div className="flex flex-col">
            <p className="max-w-[20ch] cursor-pointer truncate text-bodysmall">
              교차로에서 차선변경 중 접촉사고
            </p>
            <p className="max-w-[20ch] cursor-pointer truncate text-caption text-p4">
              저는 정상 주행을 하고 있었는데
            </p>
            <span className="mt-2 text-caption text-p4">오늘</span>
          </div>
          <div className="flex flex-col">
            <p className="max-w-[20ch] cursor-pointer truncate text-bodysmall">
              아파트 지하주차장 뺑소니
            </p>
            <p className="max-w-[20ch] cursor-pointer truncate text-caption text-p4">
              정상 주차된 제 차를 긁고 도망갔어요
            </p>
            <span className="mt-2 text-caption text-p4">어제</span>
          </div>
          <div className="flex flex-col">
            <p className="max-w-[20ch] cursor-pointer truncate text-bodysmall">
              시내버스와 접촉사고
            </p>
            <p className="max-w-[20ch] cursor-pointer truncate text-caption text-p4">
              버스가 갑자기 3개 차선을 넘어와서
            </p>
            <span className="mt-2 text-caption text-p4">3일 전</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyerConsult;
