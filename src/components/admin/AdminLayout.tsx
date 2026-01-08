import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth, AdminPermissions } from '@/contexts/AuthContext';
import {
  Home,
  Route,
  Users,
  MapPin,
  Image,
  FileText,
  BookOpen,
  UserPlus,
  AlertTriangle,
  Activity,
  Shield,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
}

interface NavItem {
  name: string;
  path: string;
  icon: typeof Home;
  permission: keyof AdminPermissions;
  masterOnly?: boolean;
}

const navItems: NavItem[] = [
  { name: 'Home Manager', path: '/admin/home', icon: Home, permission: 'homeManager' },
  { name: 'Journey Manager', path: '/admin/journey', icon: Route, permission: 'journeyManager' },
  { name: 'Team', path: '/admin/team', icon: Users, permission: 'team' },
  { name: 'Chapters', path: '/admin/chapters', icon: MapPin, permission: 'chapters' },
  { name: 'Media', path: '/admin/media', icon: Image, permission: 'media' },
  { name: 'Resources', path: '/admin/resources', icon: FileText, permission: 'resources' },
  { name: 'Blog', path: '/admin/blog', icon: BookOpen, permission: 'blog' },
  { name: 'Join Requests', path: '/admin/join-requests', icon: UserPlus, permission: 'joinRequests' },
  { name: 'Reports', path: '/admin/reports', icon: AlertTriangle, permission: 'reports' },
  { name: 'Activity Logs', path: '/admin/logs', icon: Activity, permission: 'logs' },
  { name: 'Admins', path: '/admin/admins', icon: Shield, permission: 'admins', masterOnly: true },
  { name: 'Settings', path: '/admin/settings', icon: Settings, permission: 'settings', masterOnly: true },
];

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { admin, logout, hasPermission, isMasterAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const filteredNavItems = navItems.filter((item) => {
    if (item.masterOnly && !isMasterAdmin) return false;
    return hasPermission(item.permission);
  });

  const NavContent = () => (
    <>
      {/* Logo */}
      <div className="p-4 border-b border-border">
        <Link to="/admin" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ rotate: 10, scale: 1.1 }}
            className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center text-white font-display font-bold text-sm shadow-lg"
          >
            NYA
          </motion.div>
          {sidebarOpen && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="font-display font-bold text-foreground"
            >
              Admin Panel
            </motion.span>
          )}
        </Link>
      </div>

      {/* Admin Info */}
      {sidebarOpen && admin && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 border-b border-border"
        >
          <p className="font-medium text-foreground truncate">{admin.name}</p>
          <p className="text-xs text-muted-foreground truncate">{admin.email}</p>
          {admin.isMaster && (
            <span className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-full">
              <Shield size={10} />
              Master Admin
            </span>
          )}
        </motion.div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {filteredNavItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`${isActive ? '' : 'group-hover:text-primary'}`}
                >
                  <Icon size={18} />
                </motion.div>
                {sidebarOpen && (
                  <span className="flex-1">{item.name}</span>
                )}
                {sidebarOpen && isActive && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-1.5 h-1.5 rounded-full bg-primary-foreground"
                  />
                )}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-border">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-all"
        >
          <LogOut size={18} />
          {sidebarOpen && <span>Logout</span>}
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 260 : 72 }}
        transition={{ duration: 0.2 }}
        className="hidden lg:flex flex-col bg-card border-r border-border fixed left-0 top-0 bottom-0 z-40"
      >
        <NavContent />
        
        {/* Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-20 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
        >
          <ChevronRight
            size={14}
            className={`transition-transform ${sidebarOpen ? 'rotate-180' : ''}`}
          />
        </button>
      </motion.aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-40 flex items-center justify-between px-4">
        <Link to="/admin" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-hero flex items-center justify-center text-white font-display font-bold text-xs">
            NYA
          </div>
          <span className="font-display font-bold text-foreground">Admin</span>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-xl bg-muted text-foreground"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-72 bg-card border-r border-border z-50 flex flex-col pt-16"
            >
              <NavContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main
        className={`flex-1 min-h-screen pt-16 lg:pt-0 transition-all duration-200 ${
          sidebarOpen ? 'lg:ml-[260px]' : 'lg:ml-[72px]'
        }`}
      >
        <div className="p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};
