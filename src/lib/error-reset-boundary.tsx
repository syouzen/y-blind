"use client";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useRouter } from "next/navigation";

import { useQueryErrorResetBoundary } from "@tanstack/react-query";

import DefaultError from "@/app/_components/default-error";
import DefaultLoading from "@/app/_components/default-loading";
import { Button } from "@/components/ui/button";

interface ErrorResetBoundaryProps {
  children: React.ReactNode;
  errorFallback?: React.ReactNode;
  suspenseFallback?: React.ReactNode;
}

/**
 * @description 오류 발생 시 오류 복구를 위한 컴포넌트
 * @param {React.ReactNode} children - 자식 컴포넌트
 * @param {React.ReactNode} errorFallback - 오류 발생 시 보여줄 컴포넌트
 * @param {React.ReactNode} suspenseFallback - 로딩 시 보여줄 컴포넌트
 * @returns {React.ReactNode} 자식 컴포넌트
 */
const ErrorResetBoundary = ({
  children,
  errorFallback = <DefaultError />,
  suspenseFallback = <DefaultLoading />,
}: ErrorResetBoundaryProps) => {
  const router = useRouter();
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ resetErrorBoundary }) => (
        <div className="flex w-full h-[calc(100vh-60px)] flex-col items-center justify-center gap-[32px]">
          {errorFallback}
          <div className="flex gap-[8px]">
            <Button variant="secondary" onClick={() => router.back()}>
              뒤로가기
            </Button>
            <Button onClick={() => resetErrorBoundary()}>다시 시도</Button>
          </div>
        </div>
      )}
    >
      <Suspense fallback={suspenseFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default ErrorResetBoundary;
