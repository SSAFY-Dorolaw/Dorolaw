const UploadArea = () => {
  return (
    <div className="mx-auto flex h-[480px] w-[800px]  items-center justify-center">
      <div className="flex h-[420px] w-full flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 text-center">
        <p className="text-lg font-medium text-gray-700">
          파일을 이곳에 드롭하세요.
        </p>
      </div>
    </div>
  );
};

export default UploadArea;
