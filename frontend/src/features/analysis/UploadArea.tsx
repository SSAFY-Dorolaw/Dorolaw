import { useRef, useState, useCallback } from 'react';

const UploadArea = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropAreaRef = useRef<HTMLDivElement>(null);

  const fileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file: File) => {
    // 비디오 파일인지 확인
    if (file.type.startsWith('video/')) {
      setSelectedFile(file);
    } else {
      alert('비디오 파일만 업로드 가능합니다.');
    }
  };

  // 드래그 이벤트 핸들러
  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragOver = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (!isDragging) {
        setIsDragging(true);
      }
    },
    [isDragging],
  );

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  }, []);

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
            <p>영상 썸네일</p>
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
