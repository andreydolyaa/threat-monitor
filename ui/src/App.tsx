import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { useEffect } from "react";
import { useStore } from "./store/useStore";
import PrivateRoutes from "./layout/PrivateRoutes";
import Dashboard from "./pages/Dashboard/Dashboard";
import Logs from "./pages/Logs/Logs";
import Alerts from "./pages/Alerts/Alerts";
import VirtusTotal from "./pages/VirusTotal/VirtusTotal";
import Login from "./pages/Login/Login";
import PublicRoutes from "./layout/PublicRoutes";
import Loading from "./components/Loading/Loading";
import Agents from "./pages/Agents/Agents";

function App() {
  const { fetchUser, loading } = useStore((state) => state);

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) return <Loading isFullPage={true}/>;

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/logs" element={<Logs />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/virustotal" element={<VirtusTotal />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>

        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
