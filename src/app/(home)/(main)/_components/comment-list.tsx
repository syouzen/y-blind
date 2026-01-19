import { Virtuoso } from "react-virtuoso";

import { SuspenseInfiniteQuery } from "@suspensive/react-query";

import Intersection from "@/components/intersection";
import useVirtuosoSnapshot from "@/hooks/snapshot";
import { PostApi } from "@/query/post-api";
import { IComment } from "@/types/api-response";

import CommentItem from "./comment-item";

interface CommentListProps {
  postId: number;
}

const CommentList = ({ postId }: CommentListProps) => {
  const { virtuosoRef, snapshot } = useVirtuosoSnapshot(
    "comment-list-snapshot"
  );

  return (
    <SuspenseInfiniteQuery
      {...PostApi.getCommentListInfiniteQueryOptions(postId)}
    >
      {({ data, fetchNextPage, hasNextPage, isFetchingNextPage }) => (
        <Virtuoso
          ref={virtuosoRef}
          restoreStateFrom={snapshot}
          data={data?.pages.flatMap((page) => page) || []}
          itemContent={(__: number, comment: IComment) => (
            <Intersection>
              <CommentItem data={comment} />
            </Intersection>
          )}
          components={{
            EmptyPlaceholder: () => (
              <div className="flex flex-col items-center justify-center text-center gap-[16px] h-[450px] min-h-[450px] text-gray-400">
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
      )}
    </SuspenseInfiniteQuery>
  );
};

export default CommentList;
