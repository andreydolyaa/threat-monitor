import "./index.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App.tsx";
import Dashboard from "./pages/Dashboard/Dashboard.tsx";
import Logs from "./pages/Logs/Logs.tsx";
import Alerts from "./pages/Alerts/Alerts.tsx";
import VirtusTotal from "./pages/VirusTotal/VirtusTotal.tsx";
import Login from "./pages/Login/Login.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<App />}>
        <Route index element={<Dashboard />} />
        <Route path="/logs" element={<Logs />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/virustotal" element={<VirtusTotal />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
