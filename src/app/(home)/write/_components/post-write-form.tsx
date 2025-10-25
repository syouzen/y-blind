"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const formSchema = z.object({
  content: z
    .string()
    .min(1, {
      message: "내용을 입력해주세요.",
    })
    .max(5000, {
      message: "내용은 5000자 이내로 입력해주세요.",
    }),
});

export default function PostWriteForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("게시물 작성:", values.content);
    // TODO: API 호출 후 목록으로 이동
    router.push("/");
  };

  const contentLength = form.watch("content")?.length || 0;

  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["blockquote", "code-block"],
        [{ color: [] }, { background: [] }],
        ["link"],
        ["clean"],
      ],
    }),
    []
  );

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "blockquote",
    "code-block",
    "color",
    "background",
    "link",
  ];

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
                  <div className="border border-solid border-gray200 rounded-[8px] overflow-hidden">
                    <ReactQuill
                      theme="snow"
                      value={field.value}
                      onChange={field.onChange}
                      modules={modules}
                      formats={formats}
                      placeholder="당신의 속마음을 적어주세요..."
                      className="quill-editor"
                    />
                  </div>
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
            작성 완료
          </Button>
        </form>
      </Form>
    </div>
  );
}
