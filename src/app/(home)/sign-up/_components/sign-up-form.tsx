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
import { signSchema } from "@/lib/scheme";
import { AuthApi } from "@/query/auth-api";
import { ISignUpPayload } from "@/types/api-payload";

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

  const form = useForm<z.infer<typeof signSchema>>({
    resolver: zodResolver(signSchema),
    defaultValues: {
      username: "",
      pw: "",
    },
  });

  const onSignUp = (values: z.infer<typeof signSchema>) => {
    signUp({
      username: values.username,
      pw: values.pw,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex flex-col items-center justify-center gap-[24px] w-full max-w-[400px]">
        <h1 className="text-2xl font-bold">회원가입</h1>
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
