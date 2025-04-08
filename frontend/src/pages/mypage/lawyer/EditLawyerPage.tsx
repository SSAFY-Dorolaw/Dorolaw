const EditLawyerPage = () => {
  return (
    <span className="mx-auto w-[800px]">
      <p className="mb-5 text-h3 font-bold">내 정보 수정</p>
      <hr className="h-px border-0 bg-gradient-to-r from-transparent via-black/75 to-transparent" />
      <table className="mt-5 flex justify-center">
        <tbody>
          <tr>
            <td className="w-[120px]">
              <label className="text-h3">이름</label>
            </td>
            <td className="flex items-center">
              <input type="text" className="h-[32px] w-[300px] text-body" />
              <p className="text-bodysmall">실명을 입력해주세요</p>
            </td>
          </tr>
          <tr>
            <td className="w-[120px]">
              <label className="text-h3">소속</label>
            </td>
            <td className="flex items-center">
              <input type="text" className="h-[32px] w-[300px] text-body" />
              <p className="text-bodysmall">
                현재 근무중인 법무법인 이름을 적어주세요
              </p>
            </td>
          </tr>
          <tr>
            <td className="w-[120px]">
              <label className="text-h3">주소</label>
            </td>
            <td className="flex items-center">
              <input type="text" className="h-[32px] w-[300px] text-body" />
              <p className="text-bodysmall">
                현재 근무 중인 법률사무소 주소를 검색해주세요
              </p>
            </td>
          </tr>
          <tr>
            <td className="w-[120px]">
              <label className="text-h3">슬로건</label>
            </td>
            <td className="flex items-center">
              <input type="text" className="h-[32px] w-[300px] text-body" />
              <p className="text-bodysmall">
                변호사님을 대표하는 슬로건을 25자 이내로 적어주세요
              </p>
            </td>
          </tr>
          <tr>
            <td className="w-[120px]">
              <label className="text-h3">관심 태그</label>
            </td>
            <td className="flex items-center">
              <select className="h-[32px] w-[300px] rounded border border-gray-300 px-2 text-body">
                <option value="">선택하세요</option>
                <option value="option1">회전교차로</option>
                <option value="option2">뺑소니</option>
                <option value="option3">사거리</option>
              </select>
              <p className="text-bodysmall">
                주로 수임하고 싶은 사고 유형을 선택해주세요
              </p>
            </td>
          </tr>
          <tr>
            <td className="w-[140px]">
              <label className="text-h3">상담 가능일</label>
            </td>
            <td className="flex items-center">
              <input
                type="text"
                className="h-[32px] w-[300px] text-body"
                placeholder="달력으로 해야하려나..?"
              />
              <p className="text-bodysmall">
                상담 가능한 날짜와 시간을 선택해주세요
              </p>
            </td>
          </tr>
        </tbody>
      </table>

      {/* 수정하기 버튼 */}
      <div className="mt-10 flex justify-center">
        <button className="rounded-[10px] bg-p5 px-4 py-1 text-body text-white">
          수정하기
        </button>
      </div>
    </span>
  );
};

export default EditLawyerPage;
