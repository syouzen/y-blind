"use client";

import { Virtuoso } from "react-virtuoso";

import { SuspenseInfiniteQuery } from "@suspensive/react-query";

import Intersection from "@/components/intersection";
import useVirtuosoSnapshot from "@/hooks/snapshot";
import { PostApi } from "@/query/post-api";
import { IPost } from "@/types/api-response";

import { PostItem } from "./post-item";

export function PostList() {
  const { virtuosoRef, snapshot } = useVirtuosoSnapshot("post-list-snapshot");

  return (
    <SuspenseInfiniteQuery {...PostApi.getPostListInfiniteQueryOptions()}>
      {({ data, fetchNextPage, hasNextPage, isFetchingNextPage }) => (
        <Virtuoso
          ref={virtuosoRef}
          restoreStateFrom={snapshot}
          useWindowScroll
          data={data?.pages.flatMap((page) => page.data) || []}
          itemContent={(__: number, post: IPost) => (
            <Intersection>
              <PostItem data={post} />
            </Intersection>
          )}
          components={{
            EmptyPlaceholder: () => (
              <div className="flex flex-col items-center justify-center text-center gap-[16px] h-[calc(100dvh-54px)] text-gray-400">
                게시글이 없어요! 첫 게시글을 작성해보세요.
              </div>
            ),
          }}
          endReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          className="h-full"
        />
      )}
    </SuspenseInfiniteQuery>
  );
}
