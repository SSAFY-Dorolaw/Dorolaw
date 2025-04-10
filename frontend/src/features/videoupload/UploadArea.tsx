import { useUploadStore } from '@/features/videoupload/model/uploadStore';
import { useRef, useCallback } from 'react';

const UploadArea = () => {
  // zustand 스토어에서 상태와 액션 가져오기
  const { selectedFile, isDragging, setIsDragging, handleFile } =
    useUploadStore();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropAreaRef = useRef<HTMLDivElement>(null);

  const fileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  // 드래그 이벤트 핸들러
  const handleDragEnter = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
    },
    [setIsDragging],
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (!isDragging) {
        setIsDragging(true);
      }
    },
    [isDragging, setIsDragging],
  );

  const handleDragLeave = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
    },
    [setIsDragging],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        handleFile(files[0]);
      }
    },
    [setIsDragging, handleFile],
  );

  return (
    <div className="mx-auto mt-3 flex h-[420px] w-[800px]  items-center justify-center">
      <div
        ref={dropAreaRef}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`flex h-[420px] w-full flex-col items-center justify-center rounded-lg border-2 border-dashed text-center transition-colors ${
          isDragging
            ? 'border-p5 bg-p5/10'
            : 'border-gray-300 hover:border-p5 hover:bg-gray-50'
        }`}
      >
        {selectedFile ? (
          <div className="flex flex-col items-center">
            <p>업로드 완료</p>
          </div>
        ) : (
          <>
            <svg
              className="mb-6 size-20 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="mb-4 text-lg font-medium text-gray-700">
              사고 영상 파일을 이곳에 드롭하세요.
            </p>
          </>
        )}
      </div>

      {/* 숨겨진 파일 입력 */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={fileChange}
        accept="video/*"
        className="hidden"
      />
    </div>
  );
};

export default UploadArea;
