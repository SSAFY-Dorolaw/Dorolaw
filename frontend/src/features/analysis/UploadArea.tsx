import React, { useState } from 'react';

const UploadArea = () => {
  return (
    <div className="flex justify-center items-center w-[996px] h-[683px] mx-auto">
      <div className="w-full h-[600px] border-2 border-dashed rounded-lg flex flex-col justify-center items-center p-6 text-center">
        <p className="text-lg font-medium text-gray-700">
          파일을 이곳에 드롭하세요.
        </p>
      </div>
    </div>
  );
};

export default UploadArea;
