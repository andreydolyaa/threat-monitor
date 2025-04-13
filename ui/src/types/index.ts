import { IconType } from "react-icons";

export type SidebarState = {
  isSidebarCollapsed?: boolean;
  toggleSidebar: () => void;
};

export type SidebarItemType = {
  title: string;
  icon: IconType;
  link: string;
  action?: () => void;
};

export type SidebarSectionItem = {
  title: string;
  items: SidebarItemType[];
};

export type User = {
  _id: string;
  username: string;
  email: string;
  isLoggedIn: boolean;
};

export type LoginData = {
  email: string;
  password: string;
};

export type LoginResponse = {
  message: string;
  user: User;
  token: string;
};

export type UserState = {
  user: User | null;
  loading: boolean;
  error: string | null;
  fetchUser: () => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  logout: () => Promise<void>;
};

export interface PaginationQuery {
  currentPage: number;
  limit: number;
  search: string;
}

export interface ResponseWithPagination {
  type: string;
  data: {
    data: any[];
    totalPages: number;
    currentPage: number;
  };
}

export interface LogsState {
  logs: [];
  loading: boolean;
  error: string | null;
  getLogs: ({
    currentPage,
    limit,
    search,
  }: PaginationQuery) => Promise<ResponseWithPagination>;
}
