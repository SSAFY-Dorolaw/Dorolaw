import ArticleList from '@/features/board/ArticleList';
import CreateArticleButton from '@/features/board/CreateArticleButton';
import { useState } from 'react';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const Board = () => {
  const [isConsultTab, setIsConsultTab] = useState<boolean>(true);
  const navigate = useNavigate();
  return (
    <div className="flex max-w-[1200px] flex-col gap-4 xl:w-[1200px]">
      <header>
        <div className="flex flex-col">
          <h1>게시판</h1>
          <CreateArticleButton isConsultTab={isConsultTab} />
        </div>
      </header>
      <main>
        <nav>
          <div className="max-h-full">
            <header className="flex w-full rounded-t-[10px]">
              <div
                className="w-full rounded-t-[10px] text-center"
                onClick={() => setIsConsultTab(true)}
              >
                <h3
                  className={`${isConsultTab ? 'underline decoration-2 underline-offset-[calc(0.75em+2px)]' : 'text-p3'}`}
                >
                  의뢰 게시판
                </h3>
                <hr />
              </div>
              <div
                className="w-full rounded-t-[10px] text-center"
                onClick={() => setIsConsultTab(false)}
              >
                <h3
                  className={`${isConsultTab ? 'text-p3' : 'underline decoration-2 underline-offset-[calc(0.75em+2px)]'}`}
                >
                  AI 분석 게시판
                </h3>
                <hr />
              </div>
            </header>
            <ArticleList />
          </div>
        </nav>
      </main>
      <nav>
        <div className="mx-auto my-10 flex items-center justify-center gap-4">
          <IoChevronBack size={12} />
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <IoChevronForward size={12} />
        </div>
      </nav>
    </div>
  );
};

export default Board;
