"use client";

import { Virtuoso } from "react-virtuoso";

import Intersection from "@/components/intersection";
import useVirtuosoSnapshot from "@/hooks/snapshot";
import { IPost } from "@/types/api-response";

import { PostItem } from "./post-item";

interface PostListProps {
  posts: IPost[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

export function PostList({
  posts,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: PostListProps) {
  const { virtuosoRef, snapshot } = useVirtuosoSnapshot("post-list-snapshot");

  return (
    <Virtuoso
      ref={virtuosoRef}
      restoreStateFrom={snapshot}
      useWindowScroll
      data={posts}
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
  );
}
