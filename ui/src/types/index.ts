import { IconType } from "react-icons";

export type SidebarState = {
  isSidebarCollapsed?: boolean;
  toggleSidebar: () => void;
};

export type SidebarItemType = {
  title: string;
  icon: IconType;
  link: string;
};

export type SidebarSectionItem = {
  title: string;
  items: SidebarItemType[];
};


export type UserState = {
  name: string;
  setName: (name: string) => void;
};
