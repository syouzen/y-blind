import Link from "next/link";

import { Button } from "@/components/ui/button";

import { PostList } from "./_components/post-list";

// 예시 데이터
const MOCK_POSTS = [
  {
    id: "1",
    userName: "익명의 기획자",
    createdAt: "2시간 전",
    content: "개발자가 말을 드럽게 안들어요.",
    likeCount: 24,
    commentCount: 8,
  },
  {
    id: "2",
    userName: "익명의 개발자",
    createdAt: "10시간 전",
    content: "기획자 말을 못듣는 개발자인 것 같아요.",
    likeCount: 89,
    commentCount: 31,
  },
  {
    id: "3",
    userName: "익명의 디자이너",
    createdAt: "10시간 전",
    content: "디자이너 말을 못듣는 개발자가 많아요.",
    likeCount: 89,
    commentCount: 31,
  },
];

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
      <PostList posts={MOCK_POSTS} />
    </div>
  );
}
