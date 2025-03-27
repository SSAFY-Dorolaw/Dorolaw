interface ArticleItemProps {
  writer: string;
  title: string;
  tag1: string;
  tag2: string;
  answercount: number;
  recentanswer: string;
  lawyer: string;
  onClick?: () => void;
}

function ArticleItem({
  writer,
  title,
  tag1,
  tag2,
  answercount,
  recentanswer,
  lawyer,
  onClick,
}: ArticleItemProps) {
  return (
    <div
      className="cursor-pointer rounded-[10px] border border-p2 bg-white p-4"
      onClick={onClick}
    >
      <div className="mt-2">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <div className="border-grey size-[24px] rounded-full border bg-black"></div>
            <p className="typo-body-small">{writer}</p>
          </div>
          <div className="mx-10">
            <p className="typo-body-small">답변 {answercount}</p>
          </div>
        </div>
        <div className="flex items-center gap-10">
          <h2>{title}</h2>
          <div className="mx-10 flex gap-4">
            <p>{tag1}</p>
            <p>{tag2}</p>
          </div>
        </div>
      </div>
      <hr />
      <div>
        <div className="px-4 pt-4">
          <div className="flex items-center gap-2">
            <div className="border-grey size-[24px] rounded-full border bg-white"></div>
            <p className="typo-body-small">{lawyer}</p>
          </div>
          <div className="mr-10 mt-2">
            <p className="typo-body line-clamp-2">{recentanswer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ArticleItem;
