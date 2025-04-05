import { useState } from 'react';

const ModifyTitle = () => {
  const [title, setTitle] = useState<string>('');

  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mt-3 h-[35px] w-full rounded-[5px] pl-[10px]"
      />
    </div>
  );
};

export default ModifyTitle;
