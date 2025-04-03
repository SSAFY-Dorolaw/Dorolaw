import { ClientRequests } from '@/features/mypage/client/model/types';

interface RequestItemProps extends ClientRequests {
  onClick: () => void;
}

function RequestItem({
  requestId,
  title,
  status,
  faultRatioA,
  faultRatioB,
  createdAt,
  onClick,
}: RequestItemProps) {
  return (
    <div
      className="cursor-pointer rounded-[10px] border border-p2 bg-white p-4 hover:bg-p1"
      onClick={onClick}
    >
      <div className="mt-2">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <div className="border-grey size-[24px] rounded-full border bg-black"></div>
            <p className="typo-body-small">{status}</p>
          </div>
          <div className="mx-10">
            <p className="typo-body-small">
              {faultRatioA} : {faultRatioB}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-10">
          <h2>{title}</h2>
          <div className="mx-10 flex gap-4">
            <p>{createdAt}</p>
          </div>
        </div>
      </div>
      <hr />
      <div>
        <div className="px-4 pt-4">
          <div className="flex items-center gap-2">
            <div className="border-grey size-[24px] rounded-full border bg-white"></div>
            {/* <p className="typo-body-small">{lawyer}</p> */}
          </div>
          <div className="mr-10 mt-2">
            {/* <p className="typo-body line-clamp-2">{recentanswer}</p> */}
          </div>
        </div>
      </div>
    </div>
  );
}
export default RequestItem;
