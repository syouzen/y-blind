"use client";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { signIn as nextAuthSignIn } from "next-auth/react";

import { zodResolver } from "@hookform/resolvers/zod";
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

export default function SignInForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof signSchema>>({
    resolver: zodResolver(signSchema),
    defaultValues: {
      username: "",
      pw: "",
    },
  });

  const onLogin = async (values: z.infer<typeof signSchema>) => {
    try {
      const result = await nextAuthSignIn("credentials", {
        username: values.username,
        pw: values.pw,
        redirect: false,
      });

      if (result?.error) {
        toast.error("아이디 / 비밀번호를 확인해주세요.");
      } else {
        router.push("/");
      }
    } catch {
      toast.error("아이디 / 비밀번호를 확인해주세요.");
    }
  };

  const onSocialLogin = async (provider: string) => {
    await nextAuthSignIn(provider, {
      callbackUrl: "/",
    });
  };

  const onSignup = () => {
    router.push("/sign-up");
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex flex-col items-center justify-center gap-[12px] w-full max-w-[400px]">
        <h1 className="text-2xl font-bold">로그인</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onLogin)}
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
              로그인
            </Button>
          </form>
        </Form>

        <Button
          type="button"
          className="w-full bg-[#FEE500] text-black hover:bg-[#FEE500]/50"
          onClick={() => onSocialLogin("kakao")}
        >
          카카오로 3초만에 로그인
        </Button>

        <button
          type="button"
          className="w-full bg-transparent font-body14r text-black underline hover:opacity-80"
          onClick={onSignup}
        >
          회원가입
        </button>
      </div>
    </div>
  );
}
