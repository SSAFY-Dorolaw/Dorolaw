import { useState } from 'react';

const OptionCheckbox = () => {
  const [isPublic, setIsPublic] = useState(false);
  const [isAgree, setIsAgree] = useState(false);

  const publicCheckbox = () => {
    setIsPublic(!isPublic);
  };

  const agreeCheckbox = () => {
    setIsAgree(!isAgree);
  };

  return (
    <div>
      <section className="mx-auto flex w-[800px] items-center justify-between">
        <div className="flex items-center gap-5">
          <h2
            onClick={publicCheckbox}
            className="cursor-pointer text-body font-bold text-p5"
          >
            공개 여부
          </h2>
          <input
            type="checkbox"
            checked={isPublic}
            onChange={publicCheckbox}
            className="size-4 cursor-pointer bg-p5"
            style={{ accentColor: '#374151' }}
          />
        </div>
        <div className="flex items-center gap-5">
          <h2
            onClick={agreeCheckbox}
            className="cursor-pointer text-body font-bold text-p5"
          >
            개인정보 제공 동의
          </h2>
          <input
            type="checkbox"
            checked={isAgree}
            onChange={agreeCheckbox}
            className="size-4 cursor-pointer bg-p5"
            style={{ accentColor: '#374151' }}
          />
          <p className="text-caption text-red-500">* 필수</p>
        </div>
      </section>
    </div>
  );
};

export default OptionCheckbox;
