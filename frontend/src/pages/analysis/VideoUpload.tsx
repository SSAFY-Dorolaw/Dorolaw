import UploadArea from '@/features/analysis/UploadArea';

const VideoUpload = () => {
  return (
    <main className="mt-[50px]">
      {/* 업로드 타이틀 */}
      <div className="mx-auto flex w-[800px] items-center justify-between px-0">
        <div>
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
      </div>
      {/* 영상 업로드 드래그 */}
      <UploadArea />
      {/* 옵션 */}
      <div className="mx-auto flex w-[800px] items-center justify-between">
        <div className="flex items-center gap-5">
          <h2 className="text-body font-bold text-p5">공개 여부</h2>
          <input
            type="checkbox"
            className="size-4 bg-p5"
            style={{ accentColor: '#374151' }}
          />
          <p className="text-caption text-red-500">* 필수</p>
        </div>
        <div className="flex items-center gap-5">
          <h2 className="text-body font-bold text-p5">개인정보 제공 동의</h2>
          <input
            type="checkbox"
            className="size-4 bg-p5"
            style={{ accentColor: '#374151' }}
          />
          <p className="text-caption text-red-500">* 필수</p>
        </div>
      </div>
      <button className="mx-auto my-9 block rounded-[10px] bg-p5 px-6 py-2 text-g1">
        분석 요청하기
      </button>
    </main>
  );
};

export default VideoUpload;
