import { AxiosError } from "axios";
import { ChangeEventHandler, SetStateAction } from "react";
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

export type Log = {
  agentName: string;
  source: string;
  path: string;
  timestamp: string;
  logId: number;
  endpointIp: string;
  data: {
    raw: string;
    processed: {
      suspicious: boolean;
      severity: number;
      summary: string;
    };
  };
};

export type LogResponseWrapper = {
  type: string;
  data: Log;
};

export interface PaginationQuery {
  currentPage: number;
  limit: number;
  search: string;
  severity: string;
}

export interface ResponseWithPagination {
  type: string;
  data: {
    data: any[];
    totalPages: number;
    currentPage: number;
  };
}

export type Rule = {
  _id: string;
  pattern: string;
  severity: string;
  summary: string;
  suspicious: string;
};

export interface RulesState {
  rules: Rule[];
  loading: boolean;
  error: string | null;
  getRules: () => Promise<void>
}

export interface LogsState {
  logs: Log[];
  loading: boolean;
  error: string | null;
  getLogs: ({
    currentPage,
    limit,
    search,
    severity,
  }: PaginationQuery) => Promise<ResponseWithPagination>;
  addLog: (log: Log) => void;
}

export type LogProps = {
  log: Log;
  onClick?: () => void;
};

export type StateActionType<T> = React.Dispatch<React.SetStateAction<T>>;

export type LogsTableProps = {
  logs: Log[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  setCurrentPage: StateActionType<number>;
};

export type SearchType = {
  onSearch: StateActionType<string>;
  setCurrentPage: StateActionType<number>;
};

export type SelectType = {
  onChange: StateActionType<string>;
  setCurrentPage: StateActionType<number>;
};

export type LogsToolbarProps = {
  onSearch: StateActionType<string>;
  setSeverity: StateActionType<string>;
  setCurrentPage: StateActionType<number>;
};

export type OptionType = {
  text: string;
  val: number | string;
};

export type SelectProps = {
  setCurrentPage: StateActionType<number>;
  handleOnChange: (val: string) => void;
  options: OptionType[];
  label: string;
};

export type CustomError = {
  message: string;
};

export type CustomAxiosError = AxiosError<CustomError>;

