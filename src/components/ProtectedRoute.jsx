import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return <Navigate to="/login" />;

  // Restrict employee from accessing employees page
  if (location.pathname.startsWith("/employees") && user.role !== "ADMIN") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}