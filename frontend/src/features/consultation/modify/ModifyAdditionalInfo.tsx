import { useState } from 'react';

const ModifyAdditionalInfo = () => {
  const [description, setDescription] = useState(''); // 영상 외 추가정보

  return (
    <div>
      <textarea
        className="mt-3 h-[160px] w-full rounded-[5px] pl-[10px] pt-[10px]"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </div>
  );
};

export default ModifyAdditionalInfo;
