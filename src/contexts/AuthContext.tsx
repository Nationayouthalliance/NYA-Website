import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';

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
  id: string;
  email: string;
  name: string;
  is_master: boolean;
  permissions: AdminPermissions;
}

interface AuthContextType {
  admin: Admin | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => Promise<void>;
  hasPermission: (permission: keyof AdminPermissions) => boolean;
  isMasterAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { data: subscription } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        console.log('🔁 Auth state changed', session);

        if (!session?.user) {
          setAdmin(null);
          setIsLoading(false);
          return;
        }

        const user = session.user;

        console.log('👤 User:', user.email, user.id);

        // 1️⃣ Check if already admin
        const { data: existingAdmin, error: adminError } = await supabase
          .from('admins')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();

        console.log('📦 Existing admin:', existingAdmin, adminError);

        if (existingAdmin) {
          setAdmin(existingAdmin);
          setIsLoading(false);
          return;
        }

        // 2️⃣ Check invite
        const { data: invite, error: inviteError } = await supabase
          .from('admin_invites')
          .select('*')
          .eq('email', user.email)
          .maybeSingle();

        console.log('📨 Invite:', invite, inviteError);

        if (!invite) {
          console.warn('❌ No invite found, blocking access');
          setAdmin(null);
          setIsLoading(false);
          return;
        }

        // 3️⃣ Create admin
        const { data: newAdmin, error: upsertError } = await supabase
  .from('admins')
  .upsert(
    {
      id: user.id,
      email: user.email,
      name: user.user_metadata.full_name || user.email,
      is_master: invite.is_master,
      permissions: invite.permissions,
    },
    { onConflict: 'email' } // VERY IMPORTANT
  )
  .select()
  .single();

console.log('🆕 Admin upsert result:', newAdmin, upsertError);

if (upsertError) {
  console.error('🔥 Admin upsert failed:', upsertError);
  setAdmin(null);
  setIsLoading(false);
  return;
}

setAdmin(newAdmin);
setIsLoading(false);


        // 4️⃣ Delete invite
        await supabase.from('admin_invites').delete().eq('id', invite.id);

        setAdmin(newAdmin);
        setIsLoading(false);
      }
    );

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setAdmin(null);
  };

  const hasPermission = (permission: keyof AdminPermissions): boolean => {
    if (!admin) return false;
    if (admin.is_master) return true;
    return admin.permissions?.[permission] === true;
  };

  const value: AuthContextType = {
    admin,
    isAuthenticated: !!admin,
    isLoading,
    logout,
    hasPermission,
    isMasterAdmin: admin?.is_master || false,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
