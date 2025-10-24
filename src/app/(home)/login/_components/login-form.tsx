"use client";

import { Button, TextInput } from "flowbite-react";

import Image from "@/components/image";

export default function LoginForm() {
  const onLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const id = formData.get("id") as string;
    const password = formData.get("password") as string;
    console.log(id, password);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Image
        src="/images/logo.png"
        alt="YBLIND"
        width={0}
        height={0}
        style={{ width: "50%", height: "auto", objectFit: "cover" }}
        className="py-[32px]"
        sizes="100vw"
      />
      <div className="flex flex-col items-center justify-center gap-[8px] w-full">
        <form
          className="flex w-full flex-col gap-[16px] px-[32px]"
          onSubmit={onLogin}
        >
          <div className="flex flex-col gap-[8px]">
            <span className="font-body16sb text-gray900">아이디</span>
            <TextInput
              id="id"
              name="id"
              type="text"
              placeholder="아이디를 입력해주세요"
              required
            />
          </div>
          <div className="flex flex-col gap-[8px]">
            <span className="font-body16sb text-gray900">비밀번호</span>
            <TextInput
              id="password"
              name="password"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              required
            />
          </div>
          <Button
            type="submit"
            color="red"
            className="font-body16sb text-white mt-[16px]"
          >
            로그인
          </Button>
        </form>
      </div>
    </div>
  );
}
