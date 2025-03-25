import { useState } from 'react';

const AdditionalInfo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [faultRatio, setFaultRatio] = useState('');
  const [AdditionalInfo, setAdditionalInfo] = useState('');
  const [question, setQuestion] = useState('');

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <section className="mx-auto mb-10 w-[800px]">
        <div className="flex items-center gap-5">
          <h2
            onClick={toggleOpen}
            className="cursor-pointer text-h2 font-bold text-p5"
          >
            추가 정보 입력
          </h2>
          <p onClick={toggleOpen} className="cursor-pointer">
            {isOpen ? '▲' : '▼'}
          </p>
        </div>
        {isOpen && (
          <div>
            <div className="mt-6 flex flex-col">
              <label className="text-body">받은 과실비율</label>
              <p className="text-g3">
                [나의 과실 : 상대 과실] 순서로 선택해주세요
              </p>
              <select
                className="mt-3 h-[35px] w-[90px] rounded-[5px] border border-gray-300 pl-[10px]"
                value={faultRatio}
                onChange={(e) => setFaultRatio(e.target.value)}
              >
                {Array.from({ length: 11 }, (_, i) => i * 10).map((value) => (
                  <option key={value} value={value}>
                    {value} : {100 - value}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-6">
              <label className="text-body">영상 외 추가정보</label>
              <textarea
                placeholder="영상에 나와있지 않은 추가 정보를 자세하기 입력해주세요"
                className="mt-3 h-[160px] w-full rounded-[5px] pl-[10px] pt-[10px]"
                value={AdditionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
              />
            </div>
            <div className="mt-6">
              <label className="text-body">궁금한 점</label>
              <textarea
                placeholder="추가적으로 변호사에게 궁금한 점을 물어보세요"
                className="mt-3 h-[160px] w-full rounded-[5px] pl-[10px] pt-[10px]"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default AdditionalInfo;
