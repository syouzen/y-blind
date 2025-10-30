import { create } from "zustand";

interface RecommendLaunchMenuStoreState {
  menuItems: string[];
  setMenuItems: (menuItems: string[]) => void;
}

const useRecommendLaunchMenuStore = create<RecommendLaunchMenuStoreState>(
  (set) => ({
    menuItems: ["제육볶음", "김치찌개", "떡볶이", "만두국", "칼국수"],
    setMenuItems: (menuItems) => set({ menuItems }),
  })
);

export default useRecommendLaunchMenuStore;
