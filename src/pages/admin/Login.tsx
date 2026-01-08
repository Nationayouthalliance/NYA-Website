import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Shield, Loader2, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/admin';

  // Demo emails for testing
  const demoEmails = [
    { email: 'master@nya.org', label: 'Master Admin', color: 'bg-primary' },
    { email: 'priya@nya.org', label: 'Sub Admin', color: 'bg-orange' },
    { email: 'rahul@nya.org', label: 'Content Admin', color: 'bg-accent' },
    { email: 'sneha@nya.org', label: 'Chapter Admin', color: 'bg-purple' },
  ];

  const handleGoogleSignIn = async (email?: string) => {
    setIsLoading(true);
    
    // In production, this would trigger Google OAuth
    // For demo, we simulate Google returning an email
    const simulatedEmail = email || 'test@example.com';
    
    const result = await login(simulatedEmail);
    setIsLoading(false);
    
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      // Redirect to access denied
      navigate('/admin/access-denied');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative"
      >
        {/* Back to home */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <Home size={16} />
          <span className="text-sm">Back to site</span>
        </Link>

        <div className="bg-card rounded-3xl shadow-2xl border border-border p-8">
          {/* Logo */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="flex justify-center mb-6"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-hero flex items-center justify-center text-white shadow-lg">
              <Shield size={32} />
            </div>
          </motion.div>

          <h1 className="font-display text-2xl font-bold text-center mb-2">
            Admin Login
          </h1>
          <p className="text-muted-foreground text-center mb-8">
            Sign in with your Google account
          </p>

          {/* Google Sign In Button */}
          <Button
            onClick={() => handleGoogleSignIn()}
            disabled={isLoading}
            className="w-full h-12 rounded-xl bg-white hover:bg-gray-50 text-gray-800 font-semibold border border-gray-200 shadow-sm"
          >
            {isLoading ? (
              <Loader2 className="animate-spin mr-2" size={20} />
            ) : (
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            )}
            Sign in with Google
          </Button>

          {/* Demo accounts */}
          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-xs text-muted-foreground text-center mb-4">
              Demo accounts for testing (click to login):
            </p>
            <div className="grid grid-cols-2 gap-2">
              {demoEmails.map(({ email, label, color }) => (
                <motion.button
                  key={email}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleGoogleSignIn(email)}
                  disabled={isLoading}
                  className={`text-xs px-3 py-2.5 rounded-xl ${color} text-white font-medium transition-all hover:opacity-90 disabled:opacity-50`}
                >
                  {label}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Only authorized admins can access this panel.
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
