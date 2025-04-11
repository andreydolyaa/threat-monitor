import Layout from "./Layout";
import { Navigate } from "react-router";
import { useStore } from "../store/useStore";

const PrivateRoutes = () => {
  const { user } = useStore((state) => state);

  return user ? <Layout /> : <Navigate to="/login" replace />;
};

export default PrivateRoutes;
