import { FaUserCircle } from 'react-icons/fa';

function Answer() {
  return (
    <div>
      <hr />
      <header className="flex h-[54px] items-center px-4">
        <div className="profile">
          <FaUserCircle size={32} />
        </div>
        <div className="typo-body mx-2">김승소 변호사</div>
        <div className="reservation">
          <button className="ml-3 rounded-[10px] bg-p5 px-2 text-bodysmall text-p1">
            상담 예약
          </button>
          <hr />
        </div>
      </header>
      <article className="px-4 pb-4">
        고민이 많이 되실 거 같습니다. 상담과 자료 검토가 필요한
        상황입니다.의뢰인님의 문제 상황을 보았을 때 적극적인 법률상담을 추천
        드립니다. 해결 방향 빠르고 확실한 해결방향을 제공하겠습니다.전화 혹은
        방문 상담을 진행하시는 걸 추천드립니다. 부담 없이 전화주셔도 됩니다.
        제공 서비스 Step1. 무료 전화 상담을 진행합니다.Step2. 상담 진행 후 소송
        진행 여부 등을 협의합니다.Step3. 의뢰인 맞춤형으로 소송 등을
        진행합니다.김승소 변호사 대성 국제 법률 사무소 01012345678 유사 사건
        경험 변호사 경력 30년으로 풍부한 노하우를 제공합니다.그동안 쉴틈없이
        매주 법원을 2회 이상 들려 소송 진행 등을 해 왔습니다.형사 민사 가릴 거
        없이 거의 모든 종류의 사건을 다루어보았고, 관련 자문을
        진행하였습니다.또한 의뢰인님의 경우와 같은 유사 사건 경험도 상당수
        처리하였습니다.
      </article>
    </div>
  );
}

export default Answer;
