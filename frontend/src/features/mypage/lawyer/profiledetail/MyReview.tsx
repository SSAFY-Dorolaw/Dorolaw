const MyReview = () => {
  return (
    <div className="mx-[50px] my-8">
      <div className="flex flex-col">
        <div className="flex cursor-pointer items-center gap-2">
          <h3 className="m-0 text-body font-bold">최근 후기</h3>
          <p className="ml-3 text-caption text-g3">345</p>
          <p className="ml-1 text-caption text-g3">더보기</p>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4 bg-p1">
          <div className="flex flex-col">
            <p className="max-w-[20ch] cursor-pointer truncate text-bodysmall">
              정말 감사드려요 변호사님
            </p>
            <p className="max-w-[20ch] cursor-pointer truncate text-caption text-p4">
              상담도 친절히 해주시고 위로도 해주시고
            </p>
            <span className="mt-2 text-caption text-p4">오늘</span>
          </div>
          <div className="flex flex-col">
            <p className="max-w-[20ch] cursor-pointer truncate text-bodysmall">
              강력 추천드립니다
            </p>
            <p className="max-w-[20ch] cursor-pointer truncate text-caption text-p4">
              보험사 직원들이랑은 다르게 정말
            </p>
            <span className="mt-2 text-caption text-p4">3일 전</span>
          </div>
          <div className="flex flex-col">
            <p className="max-w-[15ch] cursor-pointer truncate text-bodysmall">
              전적으로 변호사님을 믿으셔야 합니다.
            </p>
            <p className="max-w-[15ch] cursor-pointer truncate text-caption text-p4">
              변호사님 덕분에 10% 잡힌 과실을 없앨 수 있었어요
            </p>
            <span className="mt-2 text-caption text-p4">3일 전</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyReview;
