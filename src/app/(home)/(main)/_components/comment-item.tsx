import { useState } from "react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Edit, Heart, Trash } from "lucide-react";

import useEvent from "@/hooks/event";
import { calculateFromNow } from "@/lib/dayjs";
import { PostApi } from "@/query/post-api";
import { IComment } from "@/types/api-response";

import { CommentEditDialog } from "./comment-edit-dialog";

interface CommentItemProps {
  data: IComment;
}

const CommentItem = ({ data }: CommentItemProps) => {
  const { data: session } = useSession();
  const user = session?.user;

  const isMe = Number(user?.id) === data.user.id;

  const { showConfirm } = useEvent();

  const queryClient = useQueryClient();

  const [likeCount, setLikeCount] = useState(data.likeCount);
  const [isLiked, setIsLiked] = useState(false);

  const [isCommentEditDialogOpen, setIsCommentEditDialogOpen] = useState(false);

  const { mutate: likeComment } = useMutation({
    mutationFn: () => PostApi.likeComment(data.id),
    onSuccess: () => {
      setLikeCount((prev) => prev + 1);
      setIsLiked(true);
    },
    onError: () => {
      toast.error("문제가 발생했어요");
    },
  });

  const { mutate: unlikeComment } = useMutation({
    mutationFn: () => PostApi.unlikeComment(data.id),
    onSuccess: () => {
      setLikeCount((prev) => prev - 1);
      setIsLiked(false);
    },
    onError: () => {
      toast.error("문제가 발생했어요");
    },
  });

  const { mutate: editComment } = useMutation({
    mutationFn: (content: string) =>
      PostApi.editComment(data.postId, data.id, content),
    onSuccess: () => {
      toast.success("댓글이 수정되었어요");
    },
    onError: () => {
      toast.error("문제가 발생했어요");
    },
  });

  const { mutate: deleteComment } = useMutation({
    mutationFn: () => PostApi.deleteComment(data.postId, data.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", data.postId] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("댓글이 삭제되었어요");
    },
    onError: () => {
      toast.error("문제가 발생했어요");
    },
  });

  const handleLike = () => {
    if (isLiked) {
      unlikeComment();
    } else {
      likeComment();
    }
  };

  const handleEdit = () => {
    setIsCommentEditDialogOpen(true);
  };

  const handleDelete = () => {
    showConfirm({
      title: "댓글 삭제",
      content: "댓글을 삭제하시겠습니까?",
      onConfirm: () => {
        deleteComment();
      },
    });
  };

  return (
    <>
      <div className="flex flex-col gap-[8px] p-[16px] rounded-[8px] bg-gray-50">
        <div className="flex items-center justify-between">
          <span className="font-heading14sb text-gray-900">
            {data.user.username}
          </span>
          <span className="font-body12r text-gray-500">
            {calculateFromNow(data.createdAt)}
          </span>
        </div>
        <p className="font-body14r text-gray-800 whitespace-pre-wrap">
          {data.content}
        </p>
        <div className="flex items-center justify-between gap-[16px]">
          <button
            onClick={handleLike}
            className="flex items-center gap-[4px] py-[6px] rounded-[8px] bg-gray50 hover:bg-gray100 transition-colors"
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

          {isMe ? (
            <div className="flex items-center gap-[12px]">
              <button
                onClick={handleEdit}
                className="flex items-center gap-[4px] py-[6px] rounded-[8px] bg-gray50 hover:bg-gray100 transition-colors"
              >
                <Edit className="size-4" />
              </button>

              <button
                onClick={handleDelete}
                className="flex items-center gap-[4px] py-[6px] rounded-[8px] bg-gray50 hover:bg-gray100 transition-colors"
              >
                <Trash className="size-4" />
              </button>
            </div>
          ) : null}
        </div>
      </div>

      <CommentEditDialog
        open={isCommentEditDialogOpen}
        onOpenChange={setIsCommentEditDialogOpen}
        comment={data}
      />
    </>
  );
};

export default CommentItem;
