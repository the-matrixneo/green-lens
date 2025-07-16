import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiresPlan?: "basic" | "premium";
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiresPlan,
}) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiresPlan) {
    const planHierarchy = { free: 0, basic: 1, premium: 2 };
    const userPlanLevel = planHierarchy[user.plan];
    const requiredPlanLevel = planHierarchy[requiresPlan];

    if (userPlanLevel < requiredPlanLevel) {
      return <Navigate to="/pricing" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
