import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { useEffect, useState } from "react";
import PrivateRoutes from "./layout/PrivateRoutes";
import Dashboard from "./pages/Dashboard/Dashboard";
import Logs from "./pages/Logs/Logs";
import Alerts from "./pages/Alerts/Alerts";
import VirtusTotal from "./pages/VirusTotal/VirtusTotal";
import Login from "./pages/Login/Login";
import PublicRoutes from "./layout/PublicRoutes";
import Loading from "./components/Loading/Loading";
import Agents from "./pages/Agents/Agents";
import { useUserStore } from "./store/user";

function App() {
  const { fetchUser } = useUserStore();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    fetchUser().then(() => setIsInitialized(true));
  }, []);

  if (!isInitialized) return <Loading isFullPage={true} />;

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/logs" element={<Logs />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/virustotal" element={<VirtusTotal />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>

        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
