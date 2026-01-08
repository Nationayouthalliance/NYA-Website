import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';

const subtitles = [
  "This page made big promises… and then disappeared.",
  "Page not found. Just like accountability.",
  "We looked everywhere. Even in press conferences.",
  "This page went missing after a very long speech.",
  "Error 404 – Page unavailable due to 'technical reasons'.",
  "The link is under investigation. Results may never come.",
  "This page has been delayed. Again.",
  "Page not found. Please try after the next announcement.",
  "We were told it exists. We were also told many things.",
  "The page is missing. Enquiry committee will be formed.",
];

const NotFound = () => {
  const subtitle = useMemo(() => subtitles[Math.floor(Math.random() * subtitles.length)], []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 overflow-hidden relative">
      {/* Floating shapes */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1],
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
          }}
          transition={{ duration: 4 + Math.random() * 4, repeat: Infinity, delay: i * 0.2 }}
          className="absolute rounded-full bg-primary/20"
          style={{
            width: 20 + Math.random() * 60,
            height: 20 + Math.random() * 60,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
        className="text-center relative z-10 max-w-lg"
      >
        <motion.div
          animate={{ rotate: [0, -5, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          className="text-9xl font-display font-bold text-gradient mb-4"
        >
          404
        </motion.div>

        <h1 className="font-display text-3xl font-bold mb-4">Oops! Page Not Found</h1>
        
        <p className="text-xl text-muted-foreground font-handwritten mb-8">
          "{subtitle}"
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/">
              <ArrowLeft size={16} />
              Go Back
            </Link>
          </Button>
          <Button asChild className="rounded-full bg-gradient-hero text-white">
            <Link to="/">
              <Home size={16} />
              Go Home
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
