import Link from "next/link";

import { Suspense } from "@suspensive/react";
import { SuspenseInfiniteQuery } from "@suspensive/react-query";

import DefaultLoading from "@/app/_components/default-loading";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import ErrorResetBoundary from "@/lib/error-reset-boundary";
import { PostApi } from "@/query/post-api";

import { PostList } from "./_components/post-list";

export default async function Home() {
  const session = await auth();
  const isLogin = !!session?.user;

  return (
    <div className="flex flex-col w-full bg-gray50">
      {/* 헤더 */}
      <div className="sticky top-[56px] z-10 bg-white border-b border-gray200 px-[20px] py-[16px] flex items-center justify-between">
        <h1 className="font-heading20sb text-gray900">익명 게시판</h1>
        {isLogin && (
          <Button variant="default" asChild>
            <Link href="/write">작성</Link>
          </Button>
        )}
      </div>

      {/* 게시글 리스트 */}
      <ErrorResetBoundary>
        <SuspenseInfiniteQuery {...PostApi.getPostListInfiniteQueryOptions()}>
          {({ data, fetchNextPage, hasNextPage, isFetchingNextPage }) => (
            <PostList
              posts={data?.pages.flatMap((page) => page.data) || []}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              fetchNextPage={fetchNextPage}
            />
          )}
        </SuspenseInfiniteQuery>
      </ErrorResetBoundary>
    </div>
  );
}
