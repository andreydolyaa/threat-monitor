import { create } from "zustand";
import { getLogs } from "../api/api";
import { LogsState } from "../types";


export const useLogsStore = create<LogsState>((set) => ({
  logs: [],
  loading: false,
  error: null,

  getLogs: async () => {
    set({ loading: true });
    try {
      const response = await getLogs();
      console.log(response);

      // set({ logs: respo })
    } catch (error) {
      set({ loading: false, error: (error as Error).message });
    }
  },
}));
