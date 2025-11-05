import { IComment } from "@/types/api-response";

interface CommentItemProps {
  data: IComment;
}

const CommentItem = ({ data }: CommentItemProps) => {
  return (
    <div className="flex flex-col gap-[8px] p-[16px] rounded-[8px] bg-gray-50">
      <div className="flex items-center justify-between">
        <span className="font-heading14sb text-gray-900">{data.userName}</span>
      </div>
    </div>
  );
};

export default CommentItem;
