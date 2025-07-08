import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { User } from "@/types/user";
import { getUser } from "@/services/user";
import NotFound from "@/pages/public/NotFound";
import { LucideLoader2 } from "lucide-react";
import AdminLayout from "@/layouts/AdminLayout";

interface ProtectedRouteProps {
  requireAuth?: boolean;
  redirectTo?: string;
}

export const UserProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requireAuth = true,
  redirectTo = "/login",
}) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#4eb4a7]"></div>
      </div>
    );
  }

  if (requireAuth && !currentUser) {
    // Redirect to login page with the current location as state
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  if (!requireAuth && currentUser) {
    // If user is already logged in and trying to access auth pages, redirect to dashboard
    return <Navigate to="/member/dashboard" replace />;
  }

  return <Outlet />;
};

export const AdminProtectedRoute = () => {
  const { currentUser, loading } = useAuth();
  const [user, setUser] = useState<User | null>(null);

  const getUserRole = async (): Promise<User> => {
    const token = await currentUser?.getIdToken();
    const response = await getUser(token);
    return response;
  };

  useEffect(() => {
    if (currentUser) {
      getUserRole().then((user) => {
        setUser(user);
      });
    }
  }, [currentUser]);

  if (!user || user.role !== "admin") {
    return <NotFound />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LucideLoader2 className="animate-spin size-10 text-primary" />
      </div>
    );
  }

  return <AdminLayout />;
};
