"use client";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AuthApi } from "@/query/auth-api";
import { ISignUpPayload } from "@/types/api-payload";

const formSchema = z.object({
  username: z
    .string()
    .min(1, {
      message: "아이디를 입력해주세요.",
    })
    .max(12, {
      message: "아이디는 12자 이내로 입력해주세요.",
    })
    .regex(/^[a-z0-9_-]+$/, {
      message: "아이디는 영문 소문자, 숫자, _, -만 사용할 수 있습니다.",
    }),
  pw: z
    .string()
    .min(8, {
      message: "비밀번호는 최소 8자 이상이어야 합니다.",
    })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
      message:
        "비밀번호는 대문자, 소문자, 숫자, 특수문자를 각각 1개 이상 포함해야 합니다.",
    }),
});

export default function SignUpForm() {
  const router = useRouter();

  const { mutate: signUp } = useMutation({
    mutationFn: (payload: ISignUpPayload) => AuthApi.signUp(payload),
    onSuccess: () => {
      router.push("/sign-in");
    },
    onError: () => {
      toast.error("회원가입에 실패했어요");
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      pw: "",
    },
  });

  const onSignUp = (values: z.infer<typeof formSchema>) => {
    signUp({
      username: values.username,
      pw: values.pw,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex flex-col items-center justify-center gap-[24px] w-full max-w-[400px]">
        <h1 className="text-2xl font-bold">로그인</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSignUp)}
            className="w-full space-y-[16px]"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>아이디</FormLabel>
                  <FormControl>
                    <Input placeholder="아이디를 입력하세요" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pw"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>비밀번호</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="비밀번호를 입력하세요"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              회원가입
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
