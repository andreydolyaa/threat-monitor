import { create } from "zustand";
import { SidebarState } from "../types";

export const useSidebarStore = create<SidebarState>((set) => ({
  isSidebarCollapsed: false,
  toggleSidebar: () =>
    set((state: SidebarState) => ({
      isSidebarCollapsed: !state.isSidebarCollapsed,
    })),
}));
