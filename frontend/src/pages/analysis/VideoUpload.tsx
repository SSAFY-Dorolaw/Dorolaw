import UploadArea from '@/features/analysis/UploadArea';

const VideoUpload = () => {
  return (
    <form className="mt-[76px]">
      {/* 업로드 타이틀 */}
      <div className="flex items-center justify-between w-[996px] mx-auto px-0">
        <div>
          <div className="flex items-center gap-5">
            <h2 className="text-h2 text-p5">사고 영상 업로드</h2>
            <p className="text-caption text-red-500">* 필수</p>
          </div>
          <p className="text-g3">
            사진/영상 업로드 시 AI가 과실 비율을 분석합니다.
          </p>
        </div>
        <button className="rounded-[10px] bg-p5 text-g1 px-6 py-2">
          파일 업로드
        </button>
      </div>
      {/* 영상 업로드 */}
      <UploadArea />
    </form>
  );
};

export default VideoUpload;
