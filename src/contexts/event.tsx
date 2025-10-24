"use client";

import React, {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";

import Alert from "@/components/alert";
import Confirm from "@/components/confirm";

interface AlertState {
  visible: boolean;
  title: string;
  content: string;
  label: string;
  disableBackClick: boolean;
  onConfirm: () => void;
}

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

interface EventContextType {
  showAlert: (options: Partial<AlertState>) => void;
  hideAlert: () => void;
  showConfirm: (options: Partial<ConfirmState>) => void;
  hideConfirm: () => void;
}

const defaultAlertValue: AlertState = {
  visible: false,
  title: "",
  content: "",
  label: "확인",
  disableBackClick: false,
  onConfirm: () => {},
};

const defaultConfirmValue: ConfirmState = {
  visible: false,
  title: "",
  content: "",
  cancelLabel: "아니오",
  confirmLabel: "네",
  disableBackClick: false,
  danger: false,
  onConfirm: () => {},
};

export const EventContext = createContext<EventContextType>({
  showAlert: () => {},
  hideAlert: () => {},
  showConfirm: () => {},
  hideConfirm: () => {},
});

interface EventProviderProps {
  children: ReactNode;
}

export function EventProvider({ children }: EventProviderProps) {
  const [alert, setAlert] = useState<AlertState>(defaultAlertValue);
  const [confirm, setConfirm] = useState<ConfirmState>(defaultConfirmValue);

  const showAlert = useCallback((options: Partial<AlertState>) => {
    setAlert((prev) => ({ ...prev, ...options, visible: true }));
  }, []);

  const hideAlert = useCallback(() => {
    setAlert((prev) => ({ ...prev, visible: false }));
  }, []);

  const showConfirm = useCallback((options: Partial<ConfirmState>) => {
    setConfirm((prev) => ({ ...prev, ...options, visible: true }));
  }, []);

  const hideConfirm = useCallback(() => {
    setConfirm((prev) => ({ ...prev, visible: false }));
  }, []);

  const eventProviderValue = useMemo(
    () => ({ showAlert, hideAlert, showConfirm, hideConfirm }),
    [showAlert, hideAlert, showConfirm, hideConfirm]
  );

  return (
    <EventContext.Provider value={eventProviderValue}>
      {children}
      <Alert {...alert} onHide={hideAlert} />
      <Confirm {...confirm} onHide={hideConfirm} />
    </EventContext.Provider>
  );
}
