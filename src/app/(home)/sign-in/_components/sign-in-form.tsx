"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

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

export default function SignInForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      pw: "",
    },
  });

  const onLogin = (values: z.infer<typeof formSchema>) => {
    signIn("credentials", {
      username: values.username,
      pw: values.pw,
    });
  };

  const onSocialLogin = async (provider: string) => {
    signIn(provider);
  };

  const onSignup = () => {
    router.push("/sign-up");
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex flex-col items-center justify-center gap-[24px] w-full max-w-[400px]">
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
