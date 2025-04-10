import { useState } from 'react';

interface ModifyTitleProps {
  title: string | undefined;
}

const ModifyTitle = ({ title }: ModifyTitleProps) => {
  const [edittedTitle, setEdittedTitle] = useState<string | undefined>(title);

  return (
    <div className="my-3 w-full">
      <input
        type="text"
        value={edittedTitle}
        onChange={(e) => setEdittedTitle(e.target.value)}
        className="mt-3 h-[35px] w-full rounded-[5px] border border-p2 pl-[10px]"
      />
    </div>
  );
};

export default ModifyTitle;
