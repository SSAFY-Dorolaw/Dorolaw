import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
const Pagenation = () => {
  return (
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
  );
};

export default Pagenation;
