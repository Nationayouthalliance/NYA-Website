import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
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
  ArrowRight,
} from 'lucide-react';

const quickLinks = [
  { name: 'Home Manager', path: '/admin/home', icon: Home, permission: 'homeManager' as const, color: 'bg-primary' },
  { name: 'Journey', path: '/admin/journey', icon: Route, permission: 'journeyManager' as const, color: 'bg-orange' },
  { name: 'Team', path: '/admin/team', icon: Users, permission: 'team' as const, color: 'bg-teal' },
  { name: 'Chapters', path: '/admin/chapters', icon: MapPin, permission: 'chapters' as const, color: 'bg-purple' },
  { name: 'Media', path: '/admin/media', icon: Image, permission: 'media' as const, color: 'bg-yellow' },
  { name: 'Resources', path: '/admin/resources', icon: FileText, permission: 'resources' as const, color: 'bg-green' },
  { name: 'Blog', path: '/admin/blog', icon: BookOpen, permission: 'blog' as const, color: 'bg-accent' },
  { name: 'Join Requests', path: '/admin/join-requests', icon: UserPlus, permission: 'joinRequests' as const, color: 'bg-primary' },
  { name: 'Reports', path: '/admin/reports', icon: AlertTriangle, permission: 'reports' as const, color: 'bg-destructive' },
  { name: 'Logs', path: '/admin/logs', icon: Activity, permission: 'logs' as const, color: 'bg-muted-foreground' },
  { name: 'Admins', path: '/admin/admins', icon: Shield, permission: 'admins' as const, color: 'bg-primary', masterOnly: true },
  { name: 'Settings', path: '/admin/settings', icon: Settings, permission: 'settings' as const, color: 'bg-foreground', masterOnly: true },
];

const Dashboard = () => {
  const { admin, hasPermission, isMasterAdmin } = useAuth();

  const availableLinks = quickLinks.filter((link) => {
    if (link.masterOnly && !isMasterAdmin) return false;
    return hasPermission(link.permission);
  });

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-hero rounded-3xl p-8 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-noise opacity-5" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute -right-20 -top-20 w-60 h-60 bg-white/10 rounded-full"
        />
        <div className="relative">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
            Welcome back, {admin?.name?.split(' ')[0]}! 👋
          </h1>
          <p className="text-white/80 text-lg">
            {isMasterAdmin 
              ? "You have full control over everything. Use it wisely!" 
              : "Let's make some impact today."}
          </p>
        </div>
      </motion.div>

      {/* Quick Links Grid */}
      <div>
        <h2 className="font-display text-xl font-bold mb-4">Quick Access</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {availableLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={link.path}
                  className="group block p-5 bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-12 h-12 rounded-xl ${link.color} text-white flex items-center justify-center mb-3`}
                  >
                    <Icon size={22} />
                  </motion.div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {link.name}
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1 group-hover:text-primary transition-colors">
                    <span>Manage</span>
                    <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Permissions Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card rounded-2xl border border-border p-6"
      >
        <h2 className="font-display text-xl font-bold mb-4">Your Permissions</h2>
        <div className="flex flex-wrap gap-2">
          {admin && Object.entries(admin.permissions).map(([key, value]) => (
            <span
              key={key}
              className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                value
                  ? 'bg-green/10 text-green'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              {value ? ' ✓' : ' ✗'}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
