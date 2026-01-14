import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth, AdminPermissions } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredPermission?: keyof AdminPermissions;
  masterOnly?: boolean;
}

export const ProtectedRoute = ({
  children,
  requiredPermission,
  masterOnly = false,
}: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, hasPermission, isMasterAdmin } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Checking authentication...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (masterOnly && !isMasterAdmin) {
    return <div>Access Denied</div>;
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <div>Access Denied</div>;
  }

  return <>{children}</>;
};
