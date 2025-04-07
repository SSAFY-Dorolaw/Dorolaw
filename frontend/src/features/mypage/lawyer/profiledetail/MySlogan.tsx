interface SloganProps {
  oneLineIntro: string;
}

const MySlogan = ({ oneLineIntro }: SloganProps) => {
  return (
    <div className="rounded-t-lg bg-gray-100 p-4">
      <h2 className="my-3 text-center text-h1 font-bold">{oneLineIntro}</h2>
    </div>
  );
};

export default MySlogan;
