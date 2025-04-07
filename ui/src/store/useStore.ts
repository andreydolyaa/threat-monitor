import { create } from "zustand";
import { createUserSlice } from "./user";
import { createSidebarSlice } from "./sidebar";
import { type SidebarState, type UserState } from "../types";

type StoreState = UserState & SidebarState;


export const useStore = create<StoreState>()((set) => ({
  ...createSidebarSlice(set),
  ...createUserSlice(set),
}));
