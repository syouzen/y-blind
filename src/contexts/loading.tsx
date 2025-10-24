import React, { createContext, useCallback, useState } from "react";

import DefaultLoading from "@/app/_loading/default-loading";

interface LoadingContextType {
  show: () => void;
  hide: () => void;
}

export const LoadingContext = createContext<LoadingContextType>({
  show: () => {},
  hide: () => {},
});

interface LoadingProviderProps {
  children: React.ReactNode;
}

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [visible, setVisible] = useState(false);

  const show = useCallback(() => {
    setVisible(true);
  }, []);

  const hide = useCallback(() => {
    setVisible(false);
  }, []);

  return (
    <LoadingContext.Provider value={{ show, hide }}>
      {children}
      {visible && <DefaultLoading />}
    </LoadingContext.Provider>
  );
}
