"use client";

import React, {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";

import Alert from "@/components/alert";

interface AlertState {
  visible: boolean;
  title: string;
  content: string;
  label: string;
  disableBackClick: boolean;
  onConfirm: () => void;
}

interface AlertContextType {
  show: (options: Partial<AlertState>) => void;
  hide: () => void;
}

const defaultValue: AlertState = {
  visible: false,
  title: "",
  content: "",
  label: "확인",
  disableBackClick: false,
  onConfirm: () => {},
};

export const AlertContext = createContext<AlertContextType>({
  show: () => {},
  hide: () => {},
});

interface AlertProviderProps {
  children: ReactNode;
}

export function AlertProvider({ children }: AlertProviderProps) {
  const [alert, setAlert] = useState<AlertState>(defaultValue);

  const show = useCallback(
    (options: Partial<AlertState>) => {
      setAlert({ ...alert, ...options, visible: true });
    },
    [alert]
  );

  const hide = useCallback(() => {
    setAlert((previous) => ({ ...previous, visible: false }));
  }, []);

  const alertProviderValue = useMemo(() => ({ show, hide }), [show, hide]);

  return (
    <AlertContext.Provider value={alertProviderValue}>
      {children}
      <Alert {...alert} />
    </AlertContext.Provider>
  );
}
