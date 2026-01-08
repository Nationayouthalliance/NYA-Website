import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import adminsData from '@/data/admins.json';

export interface AdminPermissions {
  homeManager: boolean;
  journeyManager: boolean;
  team: boolean;
  chapters: boolean;
  media: boolean;
  resources: boolean;
  blog: boolean;
  joinRequests: boolean;
  reports: boolean;
  logs: boolean;
  admins: boolean;
  settings: boolean;
}

export interface Admin {
  email: string;
  name: string;
  isMaster: boolean;
  permissions: AdminPermissions;
}

interface AuthContextType {
  admin: Admin | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  hasPermission: (permission: keyof AdminPermissions) => boolean;
  isMasterAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [admin, setAdmin] = useState<Admin | null>(() => {
    const stored = localStorage.getItem('nya_admin');
    return stored ? JSON.parse(stored) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundAdmin = adminsData.admins.find(
      (a) => a.email.toLowerCase() === email.toLowerCase()
    );
    
    setIsLoading(false);
    
    if (foundAdmin) {
      setAdmin(foundAdmin as Admin);
      localStorage.setItem('nya_admin', JSON.stringify(foundAdmin));
      return { success: true, message: 'Login successful!' };
    }
    
    return { 
      success: false, 
      message: 'Access denied. Your email is not registered as an admin.' 
    };
  }, []);

  const logout = useCallback(() => {
    setAdmin(null);
    localStorage.removeItem('nya_admin');
  }, []);

  const hasPermission = useCallback((permission: keyof AdminPermissions): boolean => {
    if (!admin) return false;
    if (admin.isMaster) return true;
    return admin.permissions[permission];
  }, [admin]);

  const value: AuthContextType = {
    admin,
    isAuthenticated: !!admin,
    isLoading,
    login,
    logout,
    hasPermission,
    isMasterAdmin: admin?.isMaster || false,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
