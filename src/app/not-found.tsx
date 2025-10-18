import { Button } from "flowbite-react";
import { NextPage } from "next";
import Link from "next/link";

const NotFound: NextPage = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <p className="text-white">404 Not Found</p>
        <p className="text-white">이 페이지는 존재하지 않습니다</p>
        <div className="flex flex-row gap-[8px] mt-[16px]">
          <Button color="alternative">
            <Link href="javascript:history.back()">뒤로가기</Link>
          </Button>
          <Button>
            <Link href="/">홈으로 돌아가기</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
