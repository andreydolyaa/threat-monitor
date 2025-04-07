import { type UserState } from "../types";

export const createUserSlice = (set: any): UserState => ({
  name: "",
  setName: (name: string) => set({ name }),
});
