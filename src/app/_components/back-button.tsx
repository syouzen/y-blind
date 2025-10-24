"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

const BackButton = () => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  return (
    <Button variant="outline" onClick={handleBack}>
      뒤로가기
    </Button>
  );
};

export default BackButton;
