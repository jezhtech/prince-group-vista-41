import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { User } from "@/types/user";
import { getUser } from "@/services/user";
import NotFound from "@/pages/public/NotFound";
import { Loader2, LucideLoader2 } from "lucide-react";
import AdminLayout from "@/layouts/AdminLayout";

export const UserProtectedRoute: React.FC = () => {
  const { currentUser, loading, userData } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!currentUser) {
        navigate("/login");
        return;
      }

      if (userData?.role === "admin") {
        navigate("/admin");
        return;
      }
    }
  }, [currentUser, userData, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin size-10 text-primary" />
      </div>
    );
  }

  if (!currentUser) {
    return null; // Will redirect to login
  }

  return <Outlet />;
};

export const AdminProtectedRoute = () => {
  const { currentUser, loading, userData } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LucideLoader2 className="animate-spin size-10 text-primary" />
      </div>
    );
  }

  if (!currentUser || !userData || userData.role !== "admin") {
    return <NotFound />;
  }

  return <AdminLayout />;
};
