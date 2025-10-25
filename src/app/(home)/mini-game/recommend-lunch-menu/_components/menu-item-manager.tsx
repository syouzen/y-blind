"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useRecommendLaunchMenuStore from "@/store/recommend-launch-menu-store";

export function MenuItemManager() {
  const [newItem, setNewItem] = useState("");

  const { menuItems, setMenuItems } = useRecommendLaunchMenuStore();

  const handleAddItem = () => {
    if (newItem.trim() && !menuItems.includes(newItem.trim())) {
      setMenuItems([...menuItems, newItem.trim()]);
      setNewItem("");
    }
  };

  const handleRemoveItem = (index: number) => {
    setMenuItems(menuItems.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddItem();
    }
  };

  return (
    <div className="flex flex-col gap-[20px] p-[20px] bg-white rounded-[12px] border border-gray200">
      <h2 className="font-heading18sb text-gray900">메뉴 관리</h2>

      {/* 메뉴 추가 입력 */}
      <div className="flex gap-[8px]">
        <Input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="메뉴를 입력하세요"
          className="flex-1 h-[44px] px-[16px] border border-gray300 rounded-[8px] font-body14r text-gray900 placeholder:text-gray400"
        />
        <Button
          onClick={handleAddItem}
          className="h-[44px] px-[20px] bg-primary text-white font-body14sb rounded-[8px]"
        >
          추가
        </Button>
      </div>

      {/* 메뉴 목록 */}
      <div className="flex flex-col gap-[8px]">
        {menuItems.length === 0 ? (
          <p className="font-body14r text-gray400 text-center py-[20px]">
            추가된 메뉴가 없습니다
          </p>
        ) : (
          menuItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-[16px] py-[12px] bg-gray50 rounded-[8px]"
            >
              <span className="font-body14m text-gray900">{item}</span>
              <button
                onClick={() => handleRemoveItem(index)}
                className="text-gray500 hover:text-red-500 transition-colors"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 5L5 15M5 5L15 15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>

      {/* 메뉴 개수 표시 */}
      <div className="text-center font-body12r text-gray500">
        총 {menuItems.length}개의 메뉴
      </div>
    </div>
  );
}
