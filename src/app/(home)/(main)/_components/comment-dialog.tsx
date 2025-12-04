"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SendHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import ErrorResetBoundary from "@/lib/error-reset-boundary";
import { PostApi } from "@/query/post-api";

import CommentList from "./comment-list";

interface CommentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  postId: string;
}

export function CommentDialog({
  open,
  onOpenChange,
  postId,
}: CommentDialogProps) {
  const { status } = useSession();
  const isLogin = status === "authenticated";

  const [comment, setComment] = useState("");
  const queryClient = useQueryClient();

  const createCommentMutation = useMutation({
    mutationFn: PostApi.createComment,
    onSuccess: () => {
      setComment("");
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    createCommentMutation.mutate({
      postId,
      content: comment,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[600px] max-h-[80vh] flex flex-col p-0">
        <DialogHeader className="p-[24px] pb-[16px] border-b border-gray-200">
          <DialogTitle className="font-heading18sb text-gray-900">
            댓글
          </DialogTitle>
        </DialogHeader>

        {/* 댓글 목록 */}
        <ErrorResetBoundary
          suspenseFallback={
            <div className="h-[450px] flex items-center justify-center">
              <Spinner className="size-8 text-gray700" />
            </div>
          }
        >
          <CommentList postId={postId} />
        </ErrorResetBoundary>

        {/* 댓글 입력 */}
        <form
          onSubmit={handleSubmit}
          className="p-[24px] pt-[16px] border-t border-gray-200"
        >
          <div className="flex gap-[8px]">
            <input
              type="text"
              placeholder={
                isLogin
                  ? "댓글을 입력하세요..."
                  : "로그인 후 댓글을 입력할 수 있습니다."
              }
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="flex-1 px-[16px] py-[12px] rounded-[8px] border border-gray-300 font-body14r text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-900"
              disabled={createCommentMutation.isPending || !isLogin}
            />
            <Button
              type="submit"
              disabled={
                !comment.trim() || createCommentMutation.isPending || !isLogin
              }
              className="h-[48px] w-[48px] shrink-0 rounded-[8px] bg-gray-900 hover:bg-gray-800 disabled:bg-gray-300"
            >
              <SendHorizontal className="size-5 text-white" />
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
