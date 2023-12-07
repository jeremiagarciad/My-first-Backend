import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./context/context";

const ProtectedRoutes = () => {
  const { isAuthenticated, loading } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (isAuthenticated) return <Outlet />;
};

export default ProtectedRoutes;
