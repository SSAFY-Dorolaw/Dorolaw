import { useState } from 'react';

const ModifyFaultRatio = () => {
  const [faultRatio, setFaultRatio] = useState(''); // 과실 비율
  return (
    <div>
      <select
        className="mt-3 h-[35px] w-[110px] rounded-[5px] border border-gray-300 pl-[10px]"
        value={faultRatio}
        onChange={(e) => setFaultRatio(e.target.value)}
      >
        <option>선택하세요</option>
        {Array.from({ length: 11 }, (_, i) => i * 10).map((value) => (
          <option key={value} value={`${value}:${100 - value}`}>
            {value} : {100 - value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ModifyFaultRatio;
