import DefaultLoading from "@/app/_components/default-loading";
import Intersection from "@/components/intersection";

import { PostItem } from "./post-item";

interface Post {
  id: string;
  userName: string;
  createdAt: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

// 예시 데이터
const MOCK_POSTS: Post[] = [
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

export function PostList() {
  if (MOCK_POSTS.length === 0) {
    return (
      <div className="flex items-center justify-center h-[200px]">
        <p className="font-body14r text-gray500">아직 게시글이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* NOTE : infinite scroll */}
      {MOCK_POSTS.map((post) => (
        <Intersection key={post.id}>
          <PostItem {...post} />
        </Intersection>
      ))}
    </div>
  );
}
