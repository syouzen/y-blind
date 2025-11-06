import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface RecommendLaunchMenuStoreState {
  menuItems: string[];
  setMenuItems: (menuItems: string[]) => void;
  addMenuItem: (item: string) => void;
  removeMenuItem: (index: number) => void;
}

const useRecommendLaunchMenuStore = create<RecommendLaunchMenuStoreState>()(
  persist(
    (set, get) => ({
      menuItems: [],
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
