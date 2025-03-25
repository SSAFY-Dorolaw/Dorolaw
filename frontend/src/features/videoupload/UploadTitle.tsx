const UploadTitle = () => {
  return (
    <div>
      {/* 제목 */}
      <section className="mx-auto w-[800px]">
        <div className="flex items-center gap-5">
          <h2 className="text-h2 font-bold text-p5">제목</h2>
          <p className="text-caption text-red-500">* 필수</p>
        </div>
        <input
          type="text"
          placeholder="제목을 입력하세요"
          className="mt-3 h-[35px] w-full rounded-[5px] pl-[10px]"
        />
      </section>

      {/* 업로드 타이틀 */}
      <section className="mx-auto flex w-[800px] items-center justify-between px-0">
        <div className="mt-[30px]">
          <div className="flex items-center gap-5">
            <h2 className="text-h2 font-bold text-p5">사고 영상 업로드</h2>
            <p className="text-caption text-red-500">* 필수</p>
          </div>
          <p className="text-g3">
            사진/영상 업로드 시 AI가 과실 비율을 분석합니다.
          </p>
        </div>
        <button className="rounded-[10px] bg-p5 px-6 py-2 text-g1">
          파일 업로드
        </button>
      </section>
    </div>
  );
};

export default UploadTitle;
