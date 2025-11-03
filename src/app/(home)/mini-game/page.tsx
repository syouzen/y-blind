import GameItem from "./_components/game-item";

interface MiniGameItem {
  id: string;
  title: string;
  description: string;
  path: string;
}

const MINI_GAMES: MiniGameItem[] = [
  {
    id: "lunch-menu",
    title: "점메추 🍚🤔",
    description: "오늘 점심 메뉴를 추천해드립니다",
    path: "/mini-game/recommend-lunch-menu",
  },
];

export default function MiniGame() {
  return (
    <div className="flex flex-col w-full bg-gray50">
      {/* 헤더 */}
      <div className="sticky top-[56px] z-10 bg-white border-b border-gray200 px-[20px] py-[16px] flex items-center justify-between h-[69px]">
        <h1 className="font-heading20sb text-gray900">미니게임</h1>
      </div>

      <div className="grid grid-cols-1 gap-[16px] p-[20px]">
        {MINI_GAMES.map((game) => (
          <GameItem key={game.id} {...game} />
        ))}
      </div>
    </div>
  );
}
