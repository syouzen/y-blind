"use client";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "./ui/button";

type AlertProps = {
  visible: boolean;
  title: string;
  content: string;
  label: string;
  disableBackClick?: boolean;
  onConfirm: () => void;
  onHide: () => void;
};

export default function Alert({
  visible = false,
  title = "",
  content = "",
  label = "확인",
  disableBackClick = false,
  onConfirm = () => {},
  onHide,
}: AlertProps) {
  const handleConfirm = () => {
    onConfirm();
    onHide();
  };

  return (
    <Dialog
      open={visible}
      onOpenChange={(open: boolean) => {
        if (!open && !disableBackClick) {
          onHide();
        }
      }}
    >
      <DialogContent>
        {title ? (
          <DialogTitle>{title}</DialogTitle>
        ) : (
          <VisuallyHidden>
            <DialogTitle>{title}</DialogTitle>
          </VisuallyHidden>
        )}
        {content ? (
          <DialogDescription>{content}</DialogDescription>
        ) : (
          <VisuallyHidden>
            <DialogDescription>{content}</DialogDescription>
          </VisuallyHidden>
        )}
        <div className="mt-[16px] flex items-center justify-center gap-[4px] max-w-[calc(var(--mobile-width)-32px)]">
          <Button variant="default" onClick={handleConfirm}>
            {label}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
