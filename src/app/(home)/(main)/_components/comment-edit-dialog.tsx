"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SendHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PostApi } from "@/query/post-api";
import { IComment } from "@/types/api-response";

interface CommentEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  comment: IComment;
}

export function CommentEditDialog({
  open,
  onOpenChange,
  comment,
}: CommentEditDialogProps) {
  const queryClient = useQueryClient();

  const [content, setContent] = useState("");

  useEffect(() => {
    if (open) {
      setContent(comment.content);
    }
  }, [open, comment]);

  const { mutate: editComment, isPending } = useMutation({
    mutationFn: (content: string) =>
      PostApi.editComment(comment.postId, comment.id, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", comment.postId] });
      onOpenChange(false);
      toast.success("댓글이 수정되었어요");
    },
    onError: () => {
      toast.error("문제가 발생했어요");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    editComment(content);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[400px] max-h-[80vh] flex flex-col p-0">
        <DialogHeader className="p-[24px] pb-[16px] border-b border-gray-200">
          <DialogTitle className="font-heading18sb text-gray-900">
            댓글 수정하기
          </DialogTitle>
        </DialogHeader>

        {/* 댓글 입력 */}
        <form
          onSubmit={handleSubmit}
          className="p-[24px] pt-[16px] border-t border-gray-200"
        >
          <div className="flex gap-[8px]">
            <input
              type="text"
              placeholder={"댓글을 입력하세요..."}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="flex-1 px-[16px] py-[12px] rounded-[8px] border border-gray-300 font-body14r text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-900"
            />
            <Button
              type="submit"
              disabled={!content.trim() || isPending}
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
