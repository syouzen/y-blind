"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

interface BackButtonProps {
  children: React.ReactNode;
}

const BackButton = ({ children }: BackButtonProps) => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  return (
    <Button variant="outline" onClick={handleBack}>
      {children}
    </Button>
  );
};

export default BackButton;
