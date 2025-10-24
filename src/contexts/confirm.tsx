"use client";

import React, {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";

import Confirm from "@/components/confirm";

interface ConfirmState {
  visible: boolean;
  title: string;
  content: string;
  cancelLabel: string;
  confirmLabel: string;
  disableBackClick: boolean;
  danger: boolean;
  onConfirm: () => void;
}

interface ConfirmContextType {
  show: (options: Partial<ConfirmState>) => void;
  hide: () => void;
}

const defaultValue: ConfirmState = {
  visible: false,
  title: "",
  content: "",
  cancelLabel: "아니오",
  confirmLabel: "네",
  disableBackClick: false,
  danger: false,
  onConfirm: () => {},
};

export const ConfirmContext = createContext<ConfirmContextType>({
  show: () => {},
  hide: () => {},
});

interface ConfirmProviderProps {
  children: ReactNode;
}

export function ConfirmProvider({ children }: ConfirmProviderProps) {
  const [confirm, setConfirm] = useState<ConfirmState>(defaultValue);

  const show = useCallback(
    (options: Partial<ConfirmState>) => {
      setConfirm({ ...confirm, ...options, visible: true });
    },
    [confirm]
  );

  const hide = useCallback(() => {
    setConfirm((previous) => ({ ...previous, visible: false }));
  }, []);

  const confirmProviderValue = useMemo(() => ({ show, hide }), [show, hide]);

  return (
    <ConfirmContext.Provider value={confirmProviderValue}>
      {children}
      <Confirm {...confirm} />
    </ConfirmContext.Provider>
  );
}
