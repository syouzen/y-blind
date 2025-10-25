"use client";

import dynamic from "next/dynamic";

import { MenuItemManager } from "./_components/menu-item-manager";

const Roulette = dynamic(
  () => import("./_components/roulette").then((mod) => mod.Roulette),
  { ssr: false }
);

export default function RecommendLunchMenu() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-gray50">
      {/* 헤더 */}
      <div className="sticky top-[56px] z-10 bg-white border-b border-gray200 px-[20px] py-[16px] flex items-center justify-between h-[69px]">
        <h1 className="font-heading20sb text-gray900">점매추 🍚🤔</h1>
      </div>

      {/* 컨텐츠 */}
      <div className="flex-1 flex flex-col gap-[24px] p-[20px] pb-[40px]">
        {/* 룰렛 */}
        <div className="bg-white rounded-[12px] border border-gray200">
          <Roulette />
        </div>

        {/* 메뉴 관리 */}
        <MenuItemManager />
      </div>
    </div>
  );
}
