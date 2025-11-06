"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import ErrorResetBoundary from "@/lib/error-reset-boundary";

import { PostList } from "./_components/post-list";

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-gray50">
      {/* 헤더 */}
      <div className="sticky top-[56px] z-10 bg-white border-b border-gray200 px-[20px] py-[16px] flex items-center justify-between">
        <h1 className="font-heading20sb text-gray900">익명 게시판</h1>
        <Button variant="default" asChild>
          <Link href="/write">작성</Link>
        </Button>
      </div>

      {/* 게시글 리스트 */}
      <ErrorResetBoundary>
        <PostList />
      </ErrorResetBoundary>
    </div>
  );
}
