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
              <div className="flex items-center text-yellow-400">
                <img
                  src="@/shared/assets/images/star.png"
                  alt="별점"
                  className="ml-6 size-4"
                />
                <span className="text-sm text-gray-700">4.8</span>
              </div>
            </div>
            <p className="text-bodysmall text-gray-500">로로 법률사무소</p>
            <p className="text-caption text-gray-500">
              서울특별시 강남구 테헤란로 212
            </p>
          </div>

          <div className="flex flex-col">
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
              <h3 className="m-0 text-bodymedium font-bold">관심 분야</h3>
            </div>
            <p className="text-bodysmall text-gray-500">태그</p>
          </div>

          <div className="flex max-w-[400px] flex-col">
            <div className="mb-2 flex">
              <span className="max-w-[300px] text-sm font-medium">
                김승소 변호사님은 대한변호사협회 형사법 전문분야 등록을 하였고
                국선변호인, 대형 로펌, 사업 경험을 보유한 변호사입니다.
              </span>
            </div>
          </div>
        </div>
        <hr />

        {/* 상담 사례 */}
        <div>사례</div>

        {/* 후기 */}
        <div>후기</div>

        {/* 지도 */}
        <div>
          <p>map</p>
        </div>
      </div>
    </div>
  );
};

export default LawyerProfileDetail;
