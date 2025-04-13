import { LoginData, UserState, LoginResponse, PaginationQuery } from "../types";
import api from "./index";

export const login = async (data: LoginData): Promise<LoginResponse> => {
  const response = await api.post("/api/auth/login", data);
  return response.data;
};

export const logout = async (): Promise<void> => {
  const response = await api.post("/api/auth/logout");
  return response.data;
};

export const fetchUser = async (): Promise<UserState> => {
  const response = await api.get("/api/auth/user");
  return response.data;
};

export const getLogs = async ({
  currentPage,
  limit,
  search,
}: PaginationQuery) => {
  const response = await api.get(
    `/api/logs?page=${currentPage}&limit=${limit}&search=${encodeURIComponent(
      search
    )}`
  );
  return response.data;
};
