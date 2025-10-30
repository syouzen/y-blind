"use client";

import { useMemo, useState } from "react";
import { Wheel } from "react-custom-roulette";

import { Button } from "@/components/ui/button";
import useRecommendLaunchMenuStore from "@/store/recommend-launch-menu-store";

function generateRandomColor() {
  const hue = Math.floor(Math.random() * 360);
  const saturation = 65 + Math.floor(Math.random() * 25); // 65-90%
  const lightness = 50 + Math.floor(Math.random() * 15); // 50-65%
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

export function Roulette() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const { menuItems } = useRecommendLaunchMenuStore();

  // 메뉴가 변경될 때만 새로운 색상 생성 (menuItems 자체를 의존성으로)
  const wheelData = useMemo(() => {
    return menuItems.map((item) => ({
      option: item,
      style: {
        backgroundColor: generateRandomColor(),
        textColor: "#ffffff",
      },
    }));
  }, [menuItems]);

  const handleSpin = () => {
    if (isSpinning || menuItems.length === 0) return;

    const newPrizeNumber = Math.floor(Math.random() * menuItems.length);
    setPrizeNumber(newPrizeNumber);
    setIsSpinning(true);
    setSelectedItem(null);
    setShowResult(false);
  };

  const handleStopSpinning = () => {
    setIsSpinning(false);
    const winner = menuItems[prizeNumber];
    setSelectedItem(winner);

    // 결과를 부드럽게 표시하기 위한 딜레이
    setTimeout(() => {
      setShowResult(true);
    }, 300);
  };

  if (menuItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-[24px] py-[60px]">
        <p className="font-body16m text-gray600">메뉴를 추가해주세요!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-[32px] py-[40px]">
      {/* 룰렛 컨테이너 */}
      <Wheel
        mustStartSpinning={isSpinning}
        prizeNumber={prizeNumber}
        data={wheelData}
        onStopSpinning={handleStopSpinning}
        backgroundColors={["#ffffff"]}
        textColors={["#ffffff"]}
        outerBorderColor="#e5e7eb"
        outerBorderWidth={8}
        innerBorderColor="#ffffff"
        innerBorderWidth={4}
        radiusLineColor="#ffffff"
        radiusLineWidth={2}
        fontSize={18}
        textDistance={60}
        spinDuration={1}
      />

      {/* 결과 표시 */}
      {selectedItem && !isSpinning && showResult && (
        <div className="flex flex-col items-center gap-[12px] animate-in fade-in-0 zoom-in-95 duration-500">
          <p className="font-body16m text-gray600">오늘의 메뉴는?</p>
          <p className="font-heading24b text-gray900">{selectedItem}</p>
        </div>
      )}

      {/* 스핀 버튼 */}
      <Button
        onClick={handleSpin}
        disabled={isSpinning}
        className="w-[200px] h-[48px] bg-primary text-white font-body16sb rounded-[8px] disabled:opacity-50"
      >
        {isSpinning ? "돌리는 중..." : "룰렛 돌리기"}
      </Button>
    </div>
  );
}
