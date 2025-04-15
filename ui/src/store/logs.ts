import { create } from "zustand";
import { getLogs } from "../api/api";
import { LogsState } from "../types";
import { AxiosError } from "axios";

type CustomError = {
  message: string;
};

export const useLogsStore = create<LogsState>((set) => ({
  logs: [],
  loading: false,
  error: null,

  getLogs: async ({ currentPage, limit, search }) => {
    set({ loading: true, error: null });
    try {
      const response = await getLogs({ currentPage, limit, search });
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
}));
