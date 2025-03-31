const LawyerExpert = () => {
  return (
    <div className="mx-[50px] my-8 flex justify-between">
      <div className="flex w-[300px] flex-col">
        <div className="flex items-center gap-2">
          <h3 className="m-0 text-body font-bold">관심 분야</h3>
        </div>
        <div className="flex">
          <p className="mr-10 mt-[10px] text-bodysmall">#접촉사고</p>
          <p className="mt-[10px] text-bodysmall">#뺑소니</p>
        </div>
      </div>

      <div className="flex max-w-[400px] flex-col">
        <div className="mb-2 flex">
          <span className="max-w-[300px] text-caption font-medium">
            김승소 변호사님은 대한변호사협회 형사법 전문분야 등록을 하였고
            국선변호인, 대형 로펌, 사업 경험을 보유한 변호사입니다.
          </span>
        </div>
      </div>
    </div>
  );
};

export default LawyerExpert;
