import Layout from "./Layout";
import { Navigate } from "react-router";
import { useUserStore } from "../store/user";

const PrivateRoutes = () => {
  const { user } = useUserStore();
  return user ? <Layout /> : <Navigate to="/login" replace />;
};

export default PrivateRoutes;
