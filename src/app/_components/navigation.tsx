"use client";

import * as React from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

import { deleteCookie } from "cookies-next/client";

import Image from "@/components/image";
import { AuthApi } from "@/query/auth-api";

export function Navigation() {
  const { status, data } = useSession();
  const isLogin = status === "authenticated";

  const onLogout = async () => {
    try {
      const { result } = await AuthApi.logout(Number(data?.user?.id));

      if (result) {
        signOut();

        deleteCookie("access_token");
        deleteCookie("refresh_token");
      } else {
        toast.error("로그아웃에 실패했어요. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("logout error", error);

      toast.error("로그아웃 처리 중 문제가 발생했어요. 다시 시도해주세요.");
    }
  };

  return (
    <nav className="sticky top-0 z-49 bg-white flex w-full items-center justify-between px-[16px] py-[8px] h-[56px]">
      <Link href="/" className="inline-flex items-center">
        <Image
          src="/images/logo.png"
          alt="YBLIND"
          width={0}
          height={0}
          style={{ width: "100px", height: "auto", objectFit: "cover" }}
          sizes="100vw"
        />
      </Link>
      <div className="flex items-center gap-[8px]">
        <Link
          href="/mini-game"
          className="inline-flex h-[36px] items-center justify-center rounded-md px-[16px] py-[8px] text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          미니게임
        </Link>
        {isLogin ? (
          <button
            onClick={onLogout}
            className="inline-flex h-[36px] items-center justify-center rounded-md px-[16px] py-[8px] text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            로그아웃
          </button>
        ) : (
          <Link
            href="/sign-in"
            className="inline-flex h-[36px] items-center justify-center rounded-md px-[16px] py-[8px] text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            로그인
          </Link>
        )}
      </div>
    </nav>
  );
}
