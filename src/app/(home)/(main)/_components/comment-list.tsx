import { Virtuoso } from "react-virtuoso";

import Intersection from "@/components/intersection";
import useVirtuosoSnapshot from "@/hooks/snapshot";
import { IComment } from "@/types/api-response";

import CommentItem from "./comment-item";

interface CommentListProps {
  comments: IComment[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

const CommentList = ({
  comments,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: CommentListProps) => {
  const { virtuosoRef, snapshot } = useVirtuosoSnapshot(
    "comment-list-snapshot"
  );

  return (
    <Virtuoso
      ref={virtuosoRef}
      restoreStateFrom={snapshot}
      data={comments}
      itemContent={(__: number, comment: IComment) => (
        <Intersection>
          <CommentItem data={comment} />
        </Intersection>
      )}
      components={{
        EmptyPlaceholder: () => (
          <div className="flex flex-col items-center justify-center text-center gap-[16px] h-[calc(100dvh-54px)] text-gray-400">
            댓글이 없어요! 첫 댓글을 작성해보세요.
          </div>
        ),
      }}
      endReached={() => {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }}
      className="h-[450px] min-h-[450px]"
    />
  );
};

export default CommentList;
