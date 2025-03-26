import star from '@/shared/assets/images/star.png';

const LawyerProfileDetail = () => {
  return (
    <div>
      {/* 헤더 섹션 */}
      <div className="rounded-t-lg bg-gray-100 p-4">
        <h2 className="my-3 text-center text-h1 font-bold">
          백 마디 말보다 한 번의 결과로 증명하겠습니다
        </h2>
      </div>

      {/* 프로필 정보 */}
      <div>
        {/* 변호사 이력 */}
        <div className="mx-[50px] mb-8 flex justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h3 className="m-0 text-h3 font-bold">김승소 변호사</h3>
              <div className="flex items-center">
                <img src={star} alt="별점" className="ml-6 size-4" />
                <span className="ml-2 text-caption text-g4">4.8</span>
              </div>
            </div>
            <p className="mt-2 text-bodysmall text-gray-500">로로 법률사무소</p>
            <p className="text-caption text-gray-500">
              서울특별시 강남구 테헤란로 212 14층 1401호
            </p>
          </div>

          <div className="mt-2 flex flex-col">
            <div className="mb-2 flex">
              <span className="w-16 text-sm text-g4">분야</span>
              <span className="text-sm font-medium">접촉사고, 뺑소니</span>
            </div>
            <div className="mb-2 flex">
              <span className="w-16 text-sm text-g4">자격</span>
              <span className="text-sm font-medium">42회 사법시험 (2000)</span>
            </div>
            <div className="mb-2 flex">
              <span className="w-16 text-sm text-g4">학력</span>
              <span className="text-sm font-medium">
                서울대학교 법학대학원 박사
              </span>
            </div>
          </div>
        </div>
        <hr />

        {/* 관심 태그 */}
        <div className="mx-[50px] my-8 flex justify-between">
          <div className="flex w-[300px] flex-col">
            <div className="flex items-center gap-2">
              <h3 className="m-0 text-body font-bold">관심 분야</h3>
            </div>
            <div className="flex">
              <p className="mr-10 mt-[10px] text-bodysmall">#접촉사고</p>
              <p className="mt-[10px] text-bodysmall">#뺑소니</p>
            </div>
          </div>

          <div className="flex max-w-[400px] flex-col">
            <div className="mb-2 flex">
              <span className="max-w-[300px] text-caption font-medium">
                김승소 변호사님은 대한변호사협회 형사법 전문분야 등록을 하였고
                국선변호인, 대형 로펌, 사업 경험을 보유한 변호사입니다.
              </span>
            </div>
          </div>
        </div>
        <hr />

        {/* 최근 상담 */}
        <div className="mx-[50px] my-8">
          <div className="flex flex-col">
            <div className="flex cursor-pointer items-center gap-2">
              <h3 className="m-0 text-body font-bold">최근 상담</h3>
              <p className="ml-3 text-caption text-g3">456</p>
              <p className="ml-1 text-caption text-g3">더보기</p>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4 bg-p1">
              <div className="flex flex-col">
                <p className="max-w-[20ch] cursor-pointer truncate text-bodysmall">
                  교차로에서 차선변경 중 접촉사고
                </p>
                <p className="max-w-[20ch] cursor-pointer truncate text-caption text-p4">
                  저는 정상 주행을 하고 있었는데
                </p>
                <span className="mt-2 text-caption text-p4">오늘</span>
              </div>
              <div className="flex flex-col">
                <p className="max-w-[20ch] cursor-pointer truncate text-bodysmall">
                  아파트 지하주차장 뺑소니
                </p>
                <p className="max-w-[20ch] cursor-pointer truncate text-caption text-p4">
                  정상 주차된 제 차를 긁고 도망갔어요
                </p>
                <span className="mt-2 text-caption text-p4">어제</span>
              </div>
              <div className="flex flex-col">
                <p className="max-w-[20ch] cursor-pointer truncate text-bodysmall">
                  시내버스와 접촉사고
                </p>
                <p className="max-w-[20ch] cursor-pointer truncate text-caption text-p4">
                  버스가 갑자기 3개 차선을 넘어와서
                </p>
                <span className="mt-2 text-caption text-p4">3일 전</span>
              </div>
            </div>
          </div>
        </div>
        <hr />

        {/* 상담 후기 */}
        <div className="mx-[50px] my-8">
          <div className="flex flex-col">
            <div className="flex cursor-pointer items-center gap-2">
              <h3 className="m-0 text-body font-bold">최근 후기</h3>
              <p className="ml-3 text-caption text-g3">345</p>
              <p className="ml-1 text-caption text-g3">더보기</p>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4 bg-p1">
              <div className="flex flex-col">
                <p className="max-w-[20ch] cursor-pointer truncate text-bodysmall">
                  정말 감사드려요 변호사님
                </p>
                <p className="max-w-[20ch] cursor-pointer truncate text-caption text-p4">
                  상담도 친절히 해주시고 위로도 해주시고
                </p>
                <span className="mt-2 text-caption text-p4">오늘</span>
              </div>
              <div className="flex flex-col">
                <p className="max-w-[20ch] cursor-pointer truncate text-bodysmall">
                  강력 추천드립니다
                </p>
                <p className="max-w-[20ch] cursor-pointer truncate text-caption text-p4">
                  보험사 직원들이랑은 다르게 정말
                </p>
                <span className="mt-2 text-caption text-p4">3일 전</span>
              </div>
              <div className="flex flex-col">
                <p className="max-w-[15ch] cursor-pointer truncate text-bodysmall">
                  전적으로 변호사님을 믿으셔야 합니다.
                </p>
                <p className="max-w-[15ch] cursor-pointer truncate text-caption text-p4">
                  변호사님 덕분에 10% 잡힌 과실을 없앨 수 있었어요
                </p>
                <span className="mt-2 text-caption text-p4">3일 전</span>
              </div>
            </div>
          </div>
        </div>
        <hr />

        {/* 지도 */}
        <div className="mx-[50px] my-8">
          <div className="flex flex-col">
            <div className="flex cursor-pointer items-center gap-2">
              <h3 className="m-0 text-body font-bold">오시는 길</h3>
            </div>
          </div>
          <div>
            <h4>지도</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyerProfileDetail;
