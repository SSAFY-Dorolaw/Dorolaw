import { Edit } from 'lucide-react';
import { RiDeleteBin6Line } from 'react-icons/ri';

function ConsultInfo() {
  return (
    <div className="col-span-7 mb-10">
      <div className="flex w-full justify-start gap-2">
        <h2>제목</h2>
        <div className="typo-button-small my-auto h-fit rounded-[10px] bg-p2 px-2">
          상담완료
        </div>
      </div>
      <div className="icongroup flex justify-end gap-2">
        <Edit strokeWidth={3} size={24} />
        <RiDeleteBin6Line strokeWidth={1} size={24} />
      </div>
      <div className="video my-4 aspect-video w-full bg-white"></div>
      <div>
        <div className="rate flex flex-col gap-4">
          <div>
            <h3>받은 과실비율</h3>
            <p className="mt-2">7:3</p>
          </div>
          <div>
            <h3>영상 외 추가정보</h3>
            <p className="mt-2">
              제 차량은 제한 속도(시속 50km) 이하로 진행 중이었고, 신호는
              녹색이었습니다. 상대 차량이 우회전 차선에 있던 상태에서 급하게 제
              차선 쪽으로 진입해 오는 모습이 보입니다. 사고 발생 시점에서 상대
              차량이 깜빡이를 켰는지 여부는 영상을 재확인했을 때 정확하지
              않습니다. 사고 직후 양측 차량이 정차한 위치와 주위 교통 흐름도
              영상에 어느 정도 나타납니다.사고 발생 시점에서 상대 차량이
              깜빡이를 켰는지 여부는 영상을 재확인했을 때 정확하지 않습니다.
              사고 직후 양측 차량이 정차한 위치와 주위 교통 흐름도 영상에 어느
              정도 나타납니다.
            </p>
          </div>
          <div>
            <h3>궁금한 점</h3>
            <p className="mt-2">
              일반적으로 우회전 차량이 진입 시 주의 의무가 더 크다고 알고
              있는데, 이 경우에도 보통 100:0 과실이 적용되기는 어렵다고
              들었습니다. 제 경우에는 어느 정도 과실이 인정될 가능성이 있을까요?
              그리고 속도 위반이 없었더라도, ‘전방 주시 태만’ 등의 사유가 제
              과실 비율에 영향을 미칠 수 있는지 궁금합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConsultInfo;
