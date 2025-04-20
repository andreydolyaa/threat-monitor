import { create } from "zustand";
import { getLogs } from "../api/api";
import { Log, LogsState } from "../types";
import { AxiosError } from "axios";

type CustomError = {
  message: string;
};

export const useLogsStore = create<LogsState>((set) => ({
  logs: [],
  loading: true,
  error: null,

  getLogs: async ({ currentPage, limit, search, severity }) => {
    set({ loading: true, error: null });
    try {
      const response = await getLogs({ currentPage, limit, search, severity });
      set({ logs: response.data?.data, loading: false });
      return response;
    } catch (error) {
      const customError = error as AxiosError<CustomError>;
      if (customError.response?.data?.message) {
        (error as Error).message = customError.response.data.message;
      }
      set({ loading: false, error: (error as Error).message });
    }
  },
  addLog: (log: Log) => {
    set((state) => {
      return { logs: [log, ...state.logs] };
    });
  },
}));
