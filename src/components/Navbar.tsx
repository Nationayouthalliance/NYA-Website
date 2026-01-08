import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Team', path: '/team' },
  { name: 'Chapters', path: '/chapters' },
  { name: 'Resources', path: '/resources' },
  { name: 'Media', path: '/media' },
  { name: 'Blog', path: '/blog' },
];

// Pages with dark hero sections where navbar should have white text
const darkHeroPages = ['/', '/about'];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isOnDarkHero = darkHeroPages.includes(location.pathname);
  const showTransparent = isOnDarkHero && !scrolled;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-background/95 backdrop-blur-xl shadow-lg border-b border-border/50' 
            : showTransparent 
              ? 'bg-black/60' // semi-transparent black
              : 'bg-background/95 backdrop-blur-xl shadow-sm border-b border-border/30'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                className="w-12 h-12 rounded-2xl bg-gradient-hero flex items-center justify-center text-white font-display font-bold text-xl shadow-lg"
              >
                <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
              </motion.div>
              <div className="hidden sm:block">
                <span className={`font-display font-bold text-lg transition-colors duration-300 ${
                  showTransparent ? 'text-white' : 'text-foreground'
                }`}>
                 National Youth Alliance
                </span>
                <span className={`block text-xs font-handwritten text-lg -mt-1 transition-colors duration-300 ${
                  showTransparent ? 'text-white/80' : 'text-muted-foreground'
                }`}>
                  India
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    location.pathname === link.path
                      ? 'bg-primary text-primary-foreground'
                      : showTransparent
                        ? 'text-white/90 hover:text-white hover:bg-white/10'
                        : 'text-foreground/80 hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                to="/report"
                className={`px-5 py-2.5 text-sm font-semibold transition-colors ${
                  showTransparent 
                    ? 'text-white/90 hover:text-[#da523d]' 
                    : 'text-foreground hover:text-primary'
                }`}
              >
                Report Issue
              </Link>
              <Link
                to="/join-nya"
                className={`px-6 py-2.5 text-sm font-bold rounded-full hover:scale-105 transition-all shadow-md ${
                  showTransparent 
                    ? 'bg-orange text-black hover:bg-white/90' 
                    : 'bg-primary text-primary-foreground'
                }`}
              >
                Join NYA
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden p-2 rounded-xl transition-colors ${
                showTransparent 
                  ? 'bg-white/10 text-white' 
                  : 'bg-muted text-foreground'
              }`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background pt-24 px-6 lg:hidden overflow-y-auto"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className={`block px-6 py-4 rounded-2xl text-lg font-semibold transition-all ${
                      location.pathname === link.path
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground hover:bg-muted/80'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="border-t border-border mt-4 pt-4 flex flex-col gap-3"
              >
                <Link
                  to="/report"
                  className="block px-6 py-4 rounded-2xl text-lg font-semibold bg-muted text-center"
                >
                  Report Issue
                </Link>
                <Link
                  to="/join-nya"
                  className="block px-6 py-4 rounded-2xl text-lg font-bold bg-gradient-hero text-white text-center"
                >
                  Join NYA →
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
