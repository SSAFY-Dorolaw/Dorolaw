import { useState } from 'react';

const AdditionalInfo = () => {
  const [isOpen, setIsOpen] = useState(false);

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
            <p>추가정보들</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default AdditionalInfo;
