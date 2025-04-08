import { fetchUser, login } from "../api/api";
import { type LoginData, type UserState } from "../types";

export const createUserSlice = (set: any): UserState => ({
  user: null,
  loading: false,
  error: null,

  login: async (data: LoginData) => {
    set({ loading: true, error: null });
    try {
      const response = await login(data);
      set({ user: response.user, loading: false });
      localStorage.setItem(import.meta.env.VITE_TOKEN_KEY, response.token);
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  fetchUser: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetchUser();
      set({ user: response.user, loading: false });
      console.log(response, "@#@#@#@#@#@#@#@");
      
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
});
