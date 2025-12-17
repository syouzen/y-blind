"use client";

import { useState } from "react";
import { toast } from "react-toastify";

import { useMutation } from "@tanstack/react-query";
import { Heart, MessageCircle } from "lucide-react";

import { calculateFromNow } from "@/lib/dayjs";
import { PostApi } from "@/query/post-api";
import { IPost } from "@/types/api-response";

import { CommentDialog } from "./comment-dialog";

interface PostItemProps {
  data: IPost;
}

export function PostItem({ data }: PostItemProps) {
  const [likeCount, setLikeCount] = useState(data.likeCount);
  const [isLiked, setIsLiked] = useState(false);
  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);

  const { mutate: likePost } = useMutation({
    mutationFn: () => PostApi.likePost(data.id),
    onSuccess: () => {
      setLikeCount((prev) => prev + 1);
      setIsLiked(true);
    },
    onError: () => {
      toast.error("문제가 발생했어요");
    },
  });

  const { mutate: unlikePost } = useMutation({
    mutationFn: () => PostApi.unlikePost(data.id),
    onSuccess: () => {
      setLikeCount((prev) => prev - 1);
      setIsLiked(false);
    },
    onError: () => {
      toast.error("문제가 발생했어요");
    },
  });

  const handleLike = () => {
    if (isLiked) {
      unlikePost();
    } else {
      likePost();
    }
  };

  console.log(data);

  return (
    <div className="flex flex-col gap-[12px] p-[16px] bg-white border-b border-gray200">
      {/* 사용자 정보 */}
      <div className="flex items-center justify-between">
        <span className="font-heading14sb text-gray900">
          {data.user.username}
        </span>
        <span className="font-body12r text-gray500">
          {calculateFromNow(data.createdAt)}
        </span>
      </div>

      {/* 글 내용 */}
      <div
        className="ql-content text-gray800"
        dangerouslySetInnerHTML={{ __html: data.content }}
      />

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
          <span className="font-body12m text-gray700">{likeCount ?? 0}</span>
        </button>

        {/* NOTE 댓글 버튼 : 클릭 시 댓글 시트 노출 */}
        <button
          onClick={() => setIsCommentDialogOpen(true)}
          className="flex items-center gap-[4px] px-[12px] py-[6px] rounded-[8px] bg-gray50 hover:bg-gray100 transition-colors"
        >
          <MessageCircle className="size-4" />
          <span className="font-body12m text-gray700">
            {data.commentCount ?? 0}
          </span>
        </button>
      </div>

      {/* 댓글 Dialog */}
      <CommentDialog
        open={isCommentDialogOpen}
        onOpenChange={setIsCommentDialogOpen}
        postId={data.id}
      />
    </div>
  );
}
