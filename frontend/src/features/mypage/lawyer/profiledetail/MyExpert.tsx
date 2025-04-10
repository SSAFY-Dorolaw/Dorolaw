import { LawyerTag } from '@/entities/lawyers/model/types';

interface ExpertProps {
  lawyerTags: LawyerTag[];
  greetingMessage: string;
}

const MyExpert = ({ lawyerTags, greetingMessage }: ExpertProps) => {
  return (
    <div className="mx-4 my-8 flex justify-between">
      <div className="flex w-[300px] flex-col">
        <div className="flex items-center gap-2">
          <h3 className="m-0 text-body font-bold">관심 분야</h3>
        </div>
        <div className="flex gap-2">
          {lawyerTags?.map((elem, index) => (
            <p key={index} className="mt-[10px] text-bodysmall text-p4">
              #{elem.lawyer_specialties}
            </p>
          ))}
        </div>
      </div>

      <div className="flex max-w-[400px] flex-col">
        <h3 className="m-0 text-body font-bold">인삿말</h3>
        <div className="mt-2 flex">
          <span className="max-w-[300px] text-caption font-medium">
            {greetingMessage}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MyExpert;
