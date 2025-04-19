import { useEffect } from "react";
import { useUserStore } from "../store/user";
import { Navigate, Outlet, useLocation } from "react-router";

const PublicRoutes = () => {
  const location = useLocation();
  const { user } = useUserStore();
  return user && location.pathname === "/login" ? (
    <Navigate to="/" replace />
  ) : (
    <Outlet />
  );
};

export default PublicRoutes;
