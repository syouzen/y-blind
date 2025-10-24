import { NextPage } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import BackButton from "./_components/back-button";

const NotFound: NextPage = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <p className="font-heading20sb text-gray-900">404 Not Found</p>
        <p className="font-body16r text-gray-900">
          이 페이지는 존재하지 않습니다
        </p>
        <div className="flex flex-row gap-[8px] mt-[16px]">
          <BackButton />
          <Button>
            <Link href="/">홈으로 돌아가기</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
