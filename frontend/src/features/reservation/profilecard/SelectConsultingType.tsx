import { Phone, ChevronUp, ChevronDown } from 'lucide-react';

interface ConsultingTypeProps {
  selectedConsulting: string;
  onSelectConsulting: (option: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const SelectConsultingType = ({
  selectedConsulting,
  onSelectConsulting,
  isOpen,
  onToggle,
}: ConsultingTypeProps) => {
  const consultingOption = (option: string) => {
    onSelectConsulting(option);
  };

  return (
    <div>
      {/* 전화상담 선택 */}
      <div className="flex cursor-pointer justify-between" onClick={onToggle}>
        <div className="my-5 flex items-center">
          <Phone className="size-6" />
          <p className="ml-5 text-h3 font-bold text-p5">
            {selectedConsulting || '상담 종류 선택'}
          </p>
        </div>
        <div className="flex items-center">
          {isOpen ? (
            <ChevronUp className="mr-2 mt-1 size-6" />
          ) : (
            <ChevronDown className="mr-2 mt-1 size-6" />
          )}
        </div>
      </div>
      {isOpen && (
        <div className="mb-3 ml-3 mr-5 flex justify-between">
          <button
            className={`rounded-lg border-2 border-black px-3 py-1.5 font-bold ${
              selectedConsulting === '15분 전화상담'
                ? 'bg-p2'
                : 'hover:bg-p2 hover:text-black'
            }`}
            onClick={() => consultingOption('15분 전화상담')}
          >
            15분 전화상담
          </button>
          <button
            className={`rounded-lg border-2 border-black px-3 py-1.5 font-bold ${
              selectedConsulting === '20분 화상상담'
                ? 'bg-p2'
                : 'hover:bg-p2 hover:text-black'
            }`}
            onClick={() => consultingOption('20분 화상상담')}
          >
            20분 화상상담
          </button>
          <button
            className={`rounded-lg border-2 border-black px-3 py-1.5 font-bold ${
              selectedConsulting === '30분 방문상담'
                ? 'bg-p2'
                : 'hover:bg-p2 hover:text-black'
            }`}
            onClick={() => consultingOption('30분 방문상담')}
          >
            30분 방문상담
          </button>
        </div>
      )}
    </div>
  );
};

export default SelectConsultingType;
