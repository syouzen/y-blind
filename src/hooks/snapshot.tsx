import { useCallback, useEffect, useRef } from "react";
import { VirtuosoHandle } from "react-virtuoso";

import useHistoryState from "@/hooks/history-state";

/**
 * @description Virtuoso Snapshot 훅 (scroll restoration)
 * @param {string} key - 키
 * @returns {object} Virtuoso Snapshot
 */
const useVirtuosoSnapshot = (key: string) => {
  const virtuosoRef = useRef<VirtuosoHandle>(null);
  const [snapshot, setSnapshot] = useHistoryState(undefined, key);

  const initSnapshot = useCallback(() => {
    setSnapshot(undefined);
  }, [setSnapshot]);

  useEffect(() => {
    window.addEventListener("beforeunload", initSnapshot);
    return () => {
      window.removeEventListener("beforeunload", initSnapshot);
    };
  }, [initSnapshot]);

  const onSaveScrollState = () => {
    virtuosoRef.current?.getState((snapshot) => {
      setSnapshot(snapshot);
    });
  };

  return { virtuosoRef, snapshot, initSnapshot, onSaveScrollState };
};

export default useVirtuosoSnapshot;
