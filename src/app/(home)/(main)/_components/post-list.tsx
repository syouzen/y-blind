import { PostItem } from "./post-item";

interface Post {
  id: string;
  userName: string;
  createdAt: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

interface PostListProps {
  posts: Post[];
}

export function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="flex items-center justify-center h-[200px]">
        <p className="font-body14r text-gray500">아직 게시글이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* NOTE : infinite scroll */}
      {posts.map((post) => (
        <PostItem key={post.id} {...post} />
      ))}
    </div>
  );
}
