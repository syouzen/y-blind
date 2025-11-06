import { Virtuoso } from "react-virtuoso";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import Intersection from "@/components/intersection";
import useVirtuosoSnapshot from "@/hooks/snapshot";
import { PostApi } from "@/query/post-api";
import { IComment } from "@/types/api-response";

import CommentItem from "./comment-item";

interface CommentListProps {
  postId: string;
}

const CommentList = ({ postId }: CommentListProps) => {
  const { virtuosoRef, snapshot } = useVirtuosoSnapshot(
    "comment-list-snapshot"
  );

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery({
      queryKey: ["comments", postId],
      queryFn: ({ pageParam = 1 }) =>
        PostApi.getCommentList({
          postId,
          page: pageParam,
          limit: 50,
        }),
      getNextPageParam: (lastPage) => {
        if (lastPage.page < lastPage.totalPages) {
          return lastPage.page + 1;
        }
        return null;
      },
      initialPageParam: 1,
    });

  const comments = data ? data.pages.flatMap((page) => page.data) : [];

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
      className="h-[450px] max-h-[450px]"
    />
  );
};

export default CommentList;
