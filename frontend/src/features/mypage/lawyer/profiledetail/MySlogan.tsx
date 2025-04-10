interface SloganProps {
  oneLineIntro: string;
}

const MySlogan = ({ oneLineIntro }: SloganProps) => {
  return (
    <div className="rounded-t-lg px-4">
      <h1 className="mb-10 text-left text-h1 font-bold">{oneLineIntro}</h1>
    </div>
  );
};

export default MySlogan;
