"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { postSchema } from "@/lib/scheme";
import { PostApi } from "@/query/post-api";

export default function PostEditForm({ postId }: { postId: number }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: post, isSuccess } = useQuery({
    ...PostApi.getPostQueryOptions(postId),
    enabled: !!postId,
  });

  useEffect(() => {
    if (isSuccess && post) {
      form.reset({
        content: post.content,
      });
    }
  }, [post]);

  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      content: "",
    },
  });

  const { mutate: editPost } = useMutation({
    mutationFn: ({ postId, content }: { postId: number; content: string }) =>
      PostApi.editPost(postId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      router.push("/");
      toast.success("게시물을 수정했어요");
    },
    onError: () => {
      toast.error("게시물 수정에 실패했어요");
    },
  });

  const onSubmit = (values: z.infer<typeof postSchema>) => {
    editPost({ postId, content: values.content });
  };

  const contentLength = form.watch("content")?.length || 0;

  return (
    <div className="flex flex-col w-full h-full bg-white">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col px-[16px] gap-[16px] py-[16px]"
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="flex-1 flex flex-col">
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="당신의 속마음을 적어주세요..."
                    className="w-full min-h-[200px] p-[16px] border border-solid border-gray200 rounded-[8px] resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 하단 액션 영역 */}
          <Button
            type="submit"
            className="w-full"
            disabled={!form.formState.isValid || contentLength === 0}
          >
            수정 완료
          </Button>
        </form>
      </Form>
    </div>
  );
}
