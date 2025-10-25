"use client";

import { useState } from "react";

import { Heart, MessageCircle } from "lucide-react";

import { CommentDialog } from "./comment-dialog";

interface PostItemProps {
  id: string;
  userName: string;
  createdAt: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

export function PostItem({
  id,
  userName,
  createdAt,
  content,
  likeCount: initialLikeCount,
  commentCount,
}: PostItemProps) {
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [isLiked, setIsLiked] = useState(false);
  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikeCount((prev) => prev - 1);
      setIsLiked(false);
    } else {
      setLikeCount((prev) => prev + 1);
      setIsLiked(true);
    }
  };

  return (
    <div className="flex flex-col gap-[12px] p-[16px] bg-white border-b border-gray200">
      {/* 사용자 정보 */}
      <div className="flex items-center justify-between">
        <span className="font-heading14sb text-gray900">{userName}</span>
        <span className="font-body12r text-gray500">{createdAt}</span>
      </div>

      {/* 글 내용 */}
      <p className="font-body14r text-gray800 whitespace-pre-wrap">{content}</p>

      {/* 액션 버튼들 */}
      <div className="flex items-center gap-[16px]">
        <button
          onClick={handleLike}
          className="flex items-center gap-[4px] px-[12px] py-[6px] rounded-[8px] bg-gray50 hover:bg-gray100 transition-colors"
        >
          <span
            className={`text-[16px] ${isLiked ? "text-red500" : "text-gray600"}`}
          >
            {isLiked ? (
              <Heart className="size-4" fill="red" color="red" />
            ) : (
              <Heart className="size-4" />
            )}
          </span>
          <span className="font-body12m text-gray700">{likeCount}</span>
        </button>

        {/* NOTE 댓글 버튼 : 클릭 시 댓글 시트 노출 */}
        <button
          onClick={() => setIsCommentDialogOpen(true)}
          className="flex items-center gap-[4px] px-[12px] py-[6px] rounded-[8px] bg-gray50 hover:bg-gray100 transition-colors"
        >
          <MessageCircle className="size-4" />
          <span className="font-body12m text-gray700">{commentCount}</span>
        </button>
      </div>

      {/* 댓글 Dialog */}
      <CommentDialog
        open={isCommentDialogOpen}
        onOpenChange={setIsCommentDialogOpen}
        postId={id}
      />
    </div>
  );
}
