"use client";

import * as React from "react";
import Link from "next/link";

import Image from "@/components/image";

export function Navigation() {
  return (
    <nav className="flex w-full items-center justify-between px-[16px] py-[8px]">
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
      <Link
        href="/login"
        className="inline-flex h-[36px] items-center justify-center rounded-md px-[16px] py-[8px] text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
      >
        로그인
      </Link>
    </nav>
  );
}
