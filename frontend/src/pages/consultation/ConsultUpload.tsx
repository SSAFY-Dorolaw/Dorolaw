import { useState } from 'react';

import UploadArea from '@/features/analysis/UploadArea';
import UploadTitle from '@/features/videoupload/UploadTitle';
import OptionCheckbox from '@/features/videoupload/OptionCheckbox';
import AdditionalInfo from '@/features/videoupload/AdditionalInfo';

const ConsultUpload = () => {
  return (
    <main className="mt-[50px]">
      <UploadTitle />

      {/* 영상 업로드 드래그 */}
      <UploadArea />

      {/* 추가 정보 작성 */}
      <AdditionalInfo />

      {/* 옵션 */}
      <OptionCheckbox />

      {/* 버튼 */}
      <button className="mx-auto my-9 block rounded-[10px] bg-p5 px-6 py-2 text-g1">
        의뢰 제출하기
      </button>
    </main>
  );
};

export default ConsultUpload;
