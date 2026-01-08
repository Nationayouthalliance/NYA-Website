import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShieldX, ArrowLeft, Home } from 'lucide-react';

const deniedMessages = [
  "Nice try, but you don't have the clearance for this.",
  "This area requires special powers you don't possess.",
  "Access denied. Even asking nicely won't help.",
  "You've reached a door that won't open for you.",
  "This page is playing hard to get... and winning.",
  "Sorry, your admin level isn't high enough.",
  "The Master Admin has spoken. Not today.",
  "You're cool, but not 'access this page' cool.",
];

export const AccessDenied = () => {
  const randomMessage = deniedMessages[Math.floor(Math.random() * deniedMessages.length)];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.5, 0],
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            className="absolute w-2 h-2 rounded-full bg-destructive/30"
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 100 }}
        className="text-center max-w-md relative"
      >
        <motion.div
          animate={{
            rotate: [0, -5, 5, -5, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
          }}
          className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-destructive/10 mb-6"
        >
          <ShieldX className="text-destructive" size={48} />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-display text-4xl font-bold text-foreground mb-4"
        >
          Access Denied
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-muted-foreground mb-8 font-handwritten text-2xl"
        >
          {randomMessage}
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/admin">
              <ArrowLeft size={16} />
              Back to Dashboard
            </Link>
          </Button>
          <Button asChild className="rounded-full bg-gradient-hero text-white">
            <Link to="/">
              <Home size={16} />
              Go to Site
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AccessDenied;
