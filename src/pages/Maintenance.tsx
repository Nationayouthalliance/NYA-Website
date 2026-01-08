import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Settings, Wrench, Clock } from 'lucide-react';

const subtitles = [
  "System under maintenance. Unlike certain systems.",
  "We're fixing things. Yes, actually fixing.",
  "Maintenance mode. No press conference, real work.",
  "Site is being repaired. Not renamed.",
  "Under maintenance. Not postponed.",
  "We're cleaning up. Properly.",
  "Temporary downtime. Permanent honesty.",
  "Work in progress. No excuses.",
  "Fixing bugs, not hiding them.",
  "Maintenance break. Back before any promises are made.",
];

const Maintenance = () => {
  const [subtitle] = useState(() => 
    subtitles[Math.floor(Math.random() * subtitles.length)]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center p-4 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            rotate: { duration: 50, repeat: Infinity, ease: 'linear' },
            scale: { duration: 10, repeat: Infinity, ease: 'easeInOut' }
          }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1, 1.3, 1],
          }}
          transition={{ 
            rotate: { duration: 60, repeat: Infinity, ease: 'linear' },
            scale: { duration: 12, repeat: Infinity, ease: 'easeInOut' }
          }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative text-center max-w-xl"
      >
        {/* Animated Icon */}
        <motion.div
          animate={{ 
            rotate: [0, 360],
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: 'linear'
          }}
          className="w-32 h-32 mx-auto mb-8 rounded-3xl bg-gradient-hero flex items-center justify-center shadow-2xl"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Wrench size={56} className="text-white" />
          </motion.div>
        </motion.div>

        {/* Dots animation */}
        <div className="flex justify-center gap-2 mb-8">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-3 h-3 rounded-full bg-primary"
            />
          ))}
        </div>

        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6">
          We'll be back.
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-muted-foreground mb-8 italic"
        >
          "{subtitle}"
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-muted text-muted-foreground"
        >
          <Clock size={18} />
          <span className="text-sm font-medium">Check back soon</span>
        </motion.div>

        {/* Floating elements */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 10, 0],
          }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute -top-10 -left-10 hidden md:block"
        >
          <div className="w-16 h-16 rounded-2xl bg-orange/20 blur-sm" />
        </motion.div>
        
        <motion.div
          animate={{ 
            y: [0, 15, 0],
            rotate: [0, -10, 0],
          }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute -bottom-10 -right-10 hidden md:block"
        >
          <div className="w-20 h-20 rounded-full bg-accent/20 blur-sm" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Maintenance;
