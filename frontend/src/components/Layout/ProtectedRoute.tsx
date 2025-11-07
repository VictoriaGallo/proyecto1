import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ProtectedRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // 🔹 Verificar si hay token o usuario demo
    const token = localStorage.getItem("token");
    const demoUser = localStorage.getItem("demo-user");

    if (token || demoUser) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false);
  }, []);

  if (loading) return <div style={{ padding: 24 }}>Cargando…</div>;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
