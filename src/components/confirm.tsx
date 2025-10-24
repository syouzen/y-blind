"use client";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import useConfirm from "@/hooks/confirm";

import { Button } from "./ui/button";

type ConfirmProps = {
  visible: boolean;
  title: string;
  content: string;
  cancelLabel: string;
  confirmLabel: string;
  disableBackClick: boolean;
  danger: boolean;
  onConfirm: () => void;
};

export default function Confirm({
  visible = false,
  title = "",
  content = "",
  cancelLabel = "아니오",
  confirmLabel = "네",
  disableBackClick = false,
  danger = false,
  onConfirm = () => {},
}: ConfirmProps) {
  const { hide } = useConfirm();

  const handleConfirm = () => {
    onConfirm();
    hide();
  };

  return (
    <Dialog
      open={visible}
      onOpenChange={(open: boolean) => {
        if (!open && !disableBackClick) {
          hide();
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
          <Button variant={danger ? "ghost" : "default"} onClick={hide}>
            {cancelLabel}
          </Button>
          <Button
            variant={danger ? "destructive" : "default"}
            onClick={handleConfirm}
          >
            {confirmLabel}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
