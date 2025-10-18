import Image from "@/components/image";
import { Button } from "flowbite-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-[16px] items-center justify-center h-[100dvh] w-full">
      <div className="flex flex-col items-center justify-center">
        <Image
          src="/images/logo.png"
          alt="YBLIND"
          width={0}
          height={0}
          style={{ width: "50%", height: "auto", objectFit: "cover" }}
          sizes="100vw"
        />
        <p className="font-heading18sb text-gray900">
          당신의 속마음을 털어놓는 곳
        </p>
      </div>

      <Button color="red">
        <Link href="/login">로그인</Link>
      </Button>
    </div>
  );
}
