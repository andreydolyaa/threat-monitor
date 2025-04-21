import { create } from "zustand";
import { getRules } from "../api/api";
import { CustomAxiosError, RulesState } from "../types";

export const useRulesStore = create<RulesState>((set) => ({
  rules: [],
  loading: true,
  error: null,

  getRules: async () => {
    set({ loading: true, error: null });
    try {
      const response = await getRules();
      set({ rules: response.data, loading: false });
      return response;
    } catch (error) {
      const err = error as CustomAxiosError;
      if (err.response?.data?.message) {
        (error as Error).message = err.response.data.message;
      }
      set({ loading: false, error: (error as Error).message });
    }
  },
}));
