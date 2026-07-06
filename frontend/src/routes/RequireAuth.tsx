import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const SKIP_AUTH = import.meta.env.VITE_SKIP_AUTH === "true";

export function RequireAuth() {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (SKIP_AUTH) {
    return <Outlet />;
  }

  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center text-muted-foreground">Yuklanmoqda...</div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
