import Link from "next/link";

interface GameItemProps {
  id: string;
  title: string;
  description: string;
  path: string;
}

const GameItem = ({ id, title, description, path }: GameItemProps) => {
  return (
    <Link
      key={id}
      href={path}
      className="flex flex-col p-[20px] bg-white rounded-[12px] border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200"
    >
      <h2 className="text-[18px] font-semibold mb-[8px]">{title}</h2>
      <p className="text-[14px] text-gray-600">{description}</p>
    </Link>
  );
};

export default GameItem;
