import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth, AdminPermissions } from '@/contexts/AuthContext';
import { AccessDenied } from '@/pages/admin/AccessDenied';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredPermission?: keyof AdminPermissions;
  masterOnly?: boolean;
}

export const ProtectedRoute = ({ 
  children, 
  requiredPermission,
  masterOnly = false 
}: ProtectedRouteProps) => {
  const { isAuthenticated, hasPermission, isMasterAdmin } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (masterOnly && !isMasterAdmin) {
    return <AccessDenied />;
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <AccessDenied />;
  }

  return <>{children}</>;
};
