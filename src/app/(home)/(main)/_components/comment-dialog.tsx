"use client";

import { useState } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SendHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { PostApi } from "@/query/post-api";
import { IComment } from "@/types/api-response";

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
  const [comment, setComment] = useState("");
  const queryClient = useQueryClient();

  const { data: commentData, isLoading } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () =>
      PostApi.getCommentList({
        postId,
        offset: 0,
        limit: 100,
      }),
    enabled: open,
  });

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

  const comments = commentData?.data ?? [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[600px] max-h-[80vh] flex flex-col p-0">
        <DialogHeader className="p-[24px] pb-[16px] border-b border-gray-200">
          <DialogTitle className="font-heading18sb text-gray-900">
            댓글 {comments.length}개
          </DialogTitle>
        </DialogHeader>

        {/* 댓글 목록 */}
        <div className="flex-1 overflow-y-auto p-[24px] pt-[16px]">
          {isLoading ? (
            <div className="flex items-center justify-center py-[40px]">
              <Spinner className="size-8 text-gray700" />
            </div>
          ) : comments.length === 0 ? (
            <div className="flex items-center justify-center py-[40px]">
              <span className="font-body14r text-gray-500">
                첫 댓글을 작성해보세요!
              </span>
            </div>
          ) : (
            <div className="flex flex-col gap-[16px]">
              {comments.map((comment: IComment) => (
                <div
                  key={comment.id}
                  className="flex flex-col gap-[8px] p-[16px] rounded-[8px] bg-gray-50"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-heading14sb text-gray-900">
                      {comment.userName}
                    </span>
                    <span className="font-body12r text-gray-500">
                      {comment.createdAt}
                    </span>
                  </div>
                  <p className="font-body14r text-gray-800 whitespace-pre-wrap">
                    {comment.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 댓글 입력 */}
        <form
          onSubmit={handleSubmit}
          className="p-[24px] pt-[16px] border-t border-gray-200"
        >
          <div className="flex gap-[8px]">
            <input
              type="text"
              placeholder="댓글을 입력하세요..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="flex-1 px-[16px] py-[12px] rounded-[8px] border border-gray-300 font-body14r text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-900"
              disabled={createCommentMutation.isPending}
            />
            <Button
              type="submit"
              disabled={!comment.trim() || createCommentMutation.isPending}
              className="px-[16px] py-[12px] rounded-[8px] bg-gray-900 hover:bg-gray-800 disabled:bg-gray-300"
            >
              <SendHorizontal className="size-5 text-white" />
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
