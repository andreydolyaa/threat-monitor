import { useUserStore } from "../store/user";
import { Navigate, Outlet } from "react-router";

const PublicRoutes = () => {
  const { user } = useUserStore();

  return user ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoutes;
