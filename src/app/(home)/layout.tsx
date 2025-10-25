import { Navigation } from "../_components/navigation";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col w-full h-full">
      <Navigation />
      {children}
    </div>
  );
}
