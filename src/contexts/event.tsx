"use client";

import React, {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";

import DefaultLoading from "@/app/_components/default-loading";
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
  showLoading: () => void;
  hideLoading: () => void;
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
  showLoading: () => {},
  hideLoading: () => {},
});

interface EventProviderProps {
  children: ReactNode;
}

export function EventProvider({ children }: EventProviderProps) {
  const [alert, setAlert] = useState<AlertState>(defaultAlertValue);
  const [confirm, setConfirm] = useState<ConfirmState>(defaultConfirmValue);
  const [loading, setLoading] = useState(false);

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

  const showLoading = useCallback(() => {
    setLoading(true);
  }, []);

  const hideLoading = useCallback(() => {
    setLoading(false);
  }, []);

  const eventProviderValue = useMemo(
    () => ({
      showAlert,
      hideAlert,
      showConfirm,
      hideConfirm,
      showLoading,
      hideLoading,
    }),
    [showAlert, hideAlert, showConfirm, hideConfirm, showLoading, hideLoading]
  );

  return (
    <EventContext.Provider value={eventProviderValue}>
      {children}
      <Alert {...alert} onHide={hideAlert} />
      <Confirm {...confirm} onHide={hideConfirm} />
      {loading && <DefaultLoading />}
    </EventContext.Provider>
  );
}
