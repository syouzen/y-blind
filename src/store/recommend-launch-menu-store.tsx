import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface RecommendLaunchMenuStoreState {
  menuItems: string[];
  setMenuItems: (menuItems: string[]) => void;
  addMenuItem: (item: string) => void;
  removeMenuItem: (index: number) => void;
}

const DEFAULT_MENU_ITEMS = [
  "제육볶음",
  "김치찌개",
  "떡볶이",
  "만두국",
  "칼국수",
];

const useRecommendLaunchMenuStore = create<RecommendLaunchMenuStoreState>()(
  persist(
    (set, get) => ({
      menuItems: DEFAULT_MENU_ITEMS,
      setMenuItems: (menuItems) => set({ menuItems }),
      addMenuItem: (item) => {
        const currentItems = get().menuItems;
        if (item.trim() && !currentItems.includes(item.trim())) {
          set({ menuItems: [...currentItems, item.trim()] });
        }
      },
      removeMenuItem: (index) => {
        const currentItems = get().menuItems;
        set({ menuItems: currentItems.filter((_, i) => i !== index) });
      },
    }),
    {
      name: "recommend-lunch-menu-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useRecommendLaunchMenuStore;
