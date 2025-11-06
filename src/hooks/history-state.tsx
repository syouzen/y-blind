import { useCallback, useState } from "react";

const historyStorage = ((history: any) => {
  history.replaceState = (
    (replaceState) =>
    (state = {}, title: string, url: string) =>
      replaceState.call(history, { ...history.state, ...state }, title, url)
  )(history.replaceState);

  const get = (key: string) => history.state?.page?.[key];
  const set = (key: string, value: any, replace = false) => {
    history.replaceState({
      page: replace
        ? { [key]: value }
        : { ...history.state?.page, [key]: value },
    });
  };

  return { set, get };
})(typeof window !== "undefined" ? window.history : {});

const useHistoryState = (initialState: any, key: string) => {
  const stateValue = historyStorage.get(key);

  const [historyState, setHistoryState] = useState(
    stateValue === undefined ? initialState : stateValue
  );

  const setState = useCallback(
    (state: any, replace = false) => {
      const value = state instanceof Function ? state(historyState) : state;

      setHistoryState(() => value);
      historyStorage.set(key, value, replace);
    },
    [historyState, key]
  );

  return [historyState, setState];
};

export default useHistoryState;
