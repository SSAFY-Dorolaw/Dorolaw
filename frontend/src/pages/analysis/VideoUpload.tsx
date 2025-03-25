import { useState } from 'react';
import UploadArea from '@/features/analysis/UploadArea';

const VideoUpload = () => {
  const [isPublic, setIsPublic] = useState(false);
  const [isAgree, setIsAgree] = useState(false);

  const publicCheckbox = () => {
    setIsPublic(!isPublic);
  };

  const agreeCheckbox = () => {
    setIsAgree(!isAgree);
  };

  return (
    <main className="mt-[50px]">
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

      {/* 영상 업로드 드래그 */}
      <UploadArea />

      {/* 옵션 */}
      <section className="mx-auto flex w-[800px] items-center justify-between">
        <div className="flex items-center gap-5">
          <h2
            onClick={publicCheckbox}
            className="cursor-pointer text-body font-bold text-p5"
          >
            공개 여부
          </h2>
          <input
            type="checkbox"
            checked={isPublic}
            onChange={publicCheckbox}
            className="size-4 cursor-pointer bg-p5"
            style={{ accentColor: '#374151' }}
          />
        </div>
        <div className="flex items-center gap-5">
          <h2
            onClick={agreeCheckbox}
            className="cursor-pointer text-body font-bold text-p5"
          >
            개인정보 제공 동의
          </h2>
          <input
            type="checkbox"
            checked={isAgree}
            onChange={agreeCheckbox}
            className="size-4 cursor-pointer bg-p5"
            style={{ accentColor: '#374151' }}
          />
          <p className="text-caption text-red-500">* 필수</p>
        </div>
      </section>

      <button className="mx-auto my-9 block rounded-[10px] bg-p5 px-6 py-2 text-g1">
        분석 요청하기
      </button>
    </main>
  );
};

export default VideoUpload;
