import UploadArea from '@/features/analysis/UploadArea';
import OptionCheckbox from '@/features/videoupload/OptionCheckbox';
import UploadTitle from '@/features/videoupload/UploadTitle';

const VideoUpload = () => {
  return (
    <main className="mt-[50px]">
      {/* 제목 & 업로드 타이틀 */}
      <UploadTitle />

      {/* 영상 업로드 드래그 */}
      <UploadArea />

      {/* 옵션 */}
      <OptionCheckbox />

      <button className="mx-auto my-9 block rounded-[10px] bg-p5 px-6 py-2 text-g1">
        분석 요청하기
      </button>
    </main>
  );
};

export default VideoUpload;
