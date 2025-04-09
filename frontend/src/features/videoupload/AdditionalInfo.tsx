import { useEffect, useState } from 'react';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';

interface AdditionalInfoProps {
  onChange: (additionalData: {
    faultRatio: string;
    description: string;
    question: string;
  }) => void;
}

const AdditionalInfo = ({ onChange }: AdditionalInfoProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [faultRatio, setFaultRatio] = useState(''); // 과실 비율
  const [description, setDescription] = useState(''); // 영상 외 추가정보
  const [question, setQuestion] = useState('');

  // 데이터 변경될 때마다 부모 컴포넌트에 전달
  useEffect(() => {
    onChange({
      faultRatio,
      description,
      question,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [faultRatio, description, question]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleFaultRatioChange = (value: string) => {
    setFaultRatio(value);
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
              <div className="mt-3">
                <Select onValueChange={handleFaultRatioChange}>
                  <SelectTrigger className="w-[120px] border border-gray-300">
                    <SelectValue placeholder="과실비율 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 11 }, (_, i) => i * 10).map(
                      (value) => (
                        <SelectItem
                          key={value}
                          value={`${value}:${100 - value}`}
                        >
                          {value} : {100 - value}
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-6">
              <label className="text-body">영상 외 추가정보</label>
              <textarea
                placeholder="영상에 나와있지 않은 추가 정보를 자세히 입력해주세요"
                className="mt-3 h-[160px] w-full rounded-[5px] border border-p2 pl-[10px] pt-[10px]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mt-6">
              <label className="text-body">궁금한 점</label>
              <textarea
                placeholder="추가적으로 변호사에게 궁금한 점을 물어보세요"
                className="mt-3 h-[160px] w-full rounded-[5px] border border-p2 pl-[10px] pt-[10px]"
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
