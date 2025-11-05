"use client";

import { Virtuoso } from "react-virtuoso";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import Intersection from "@/components/intersection";
import useVirtuosoSnapshot from "@/hooks/snapshot";
import { PostApi } from "@/query/post-api";
import { IPost } from "@/types/api-response";

import { PostItem } from "./post-item";

export function PostList() {
  const { virtuosoRef, snapshot } = useVirtuosoSnapshot("post-list-snapshot");

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery({
      queryKey: ["posts"],
      queryFn: ({ pageParam = 1 }) =>
        PostApi.getPostList({ page: pageParam, limit: 10 }),
      getNextPageParam: (lastPage) => lastPage.page + 1,
      initialPageParam: 1,
    });

  const posts = data ? data.pages.flatMap((page) => page.data) : [];

  return (
    <div className="flex flex-col">
      {/* NOTE : infinite scroll */}
      {posts.map((post) => (
        <Intersection key={post.id}>
          <PostItem {...post} />
        </Intersection>
      ))}

      <Virtuoso
        ref={virtuosoRef}
        restoreStateFrom={snapshot}
        useWindowScroll
        data={posts}
        itemContent={(__: number, post: IPost) => (
          <Intersection className="px-[16px]">
            <PostItem {...post} />
          </Intersection>
        )}
        components={{
          EmptyPlaceholder: () => (
            <div className="flex flex-col items-center justify-center text-center gap-[16px] h-[calc(100dvh-54px)] text-gray-400">
              운동친구 찾기 글이 없어요
            </div>
          ),
        }}
        endReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        className="h-full my-[16px]"
      />
    </div>
  );
}
