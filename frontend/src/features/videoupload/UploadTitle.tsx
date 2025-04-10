import { useUploadStore } from '@/features/videoupload/model/uploadStore';
import { useRef, forwardRef, useImperativeHandle, useEffect } from 'react';

// 외부에서 접근할 수 있는 메서드를 정의하는 인터페이스
export interface UploadTitleRef {
  getSelectedFile: () => File | null;
  getTitle: () => string;
}

const UploadTitle = forwardRef<UploadTitleRef>((props, ref) => {
  const {
    selectedFile,
    title,
    setTitle,
    handleFile,
    setSelectedFile,
    resetStore,
  } = useUploadStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 컴포넌트가 마운트될 때 상태 초기화
  useEffect(() => {
    if (typeof resetStore === 'function') {
      resetStore();
    } else {
      setTitle('');
      setSelectedFile(null);
    }
  }, []);

  // 외부에서 ref를 통해 selectedFile에 접근할 수 있도록 함
  useImperativeHandle(ref, () => ({
    getSelectedFile: () => selectedFile,
    getTitle: () => title,
  }));

  const uploadButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const fileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요"
          className="mt-3 h-[35px] w-full rounded-[5px] border border-p2 pl-[10px]"
        />
      </section>

      {/* 업로드 타이틀 */}
      <section className="mx-auto flex w-[800px] items-center justify-between px-0">
        <div className="mt-[30px]">
          <div className="flex items-center gap-5">
            <h2 className="text-h2 font-bold text-p5">사고 영상 업로드</h2>
            <p className="text-caption text-red-500">* 필수</p>
          </div>
          {/* 선택된 파일 표시 및 삭제 */}
          {selectedFile ? (
            <p className="mt-5 flex items-center">
              <span>파일명: {selectedFile.name}</span>
              <span
                className="ml-3 cursor-pointer text-red-700"
                onClick={removeFile}
              >
                x
              </span>
            </p>
          ) : (
            <div className="text-g3">
              <p>영상을 업로드하면 AI가 과실 비율을 분석합니다.</p>
              <p className="mt-1 text-sm text-p4">
                ※ 최대 용량 100MB, MP4 형식만 지원
              </p>
            </div>
          )}
        </div>

        {/* 숨겨진 file input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={fileChange}
          accept="video/*"
          className="hidden"
        />

        <button
          onClick={uploadButtonClick}
          className="rounded-[10px] bg-p5 px-6 py-2 text-g1"
        >
          파일 업로드
        </button>
      </section>
    </div>
  );
});

UploadTitle.displayName = 'UploadTitle';

export default UploadTitle;
