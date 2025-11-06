import { calculateFromNow } from "@/lib/dayjs";
import { IComment } from "@/types/api-response";

interface CommentItemProps {
  data: IComment;
}

const CommentItem = ({ data }: CommentItemProps) => {
  return (
    <div className="flex flex-col gap-[8px] p-[16px] rounded-[8px] bg-gray-50">
      <div className="flex items-center justify-between">
        <span className="font-heading14sb text-gray-900">{data.userName}</span>
        <span className="font-body12r text-gray-500">
          {calculateFromNow(data.createdAt)}
        </span>
      </div>
      <p className="font-body14r text-gray-800 whitespace-pre-wrap">
        {data.content}
      </p>
    </div>
  );
};

export default CommentItem;
