import { SidebarState } from "../types";

export const createSidebarSlice = (set: any): SidebarState => ({
  isSidebarCollapsed: false,
  toggleSidebar: () =>
    set((state: SidebarState) => ({
      isSidebarCollapsed: !state.isSidebarCollapsed,
    })),
});
