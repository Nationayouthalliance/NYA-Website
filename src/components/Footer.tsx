import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube, 
  Mail, 
  MapPin, 
  Phone,
  Heart,
  Facebook,
  ExternalLink
} from 'lucide-react';
import { FaDiscord, FaRedditAlien, FaPinterestP } from "react-icons/fa";

const footerLinks = {
  movement: [
    { name: 'About NYA', path: '/about' },
    { name: 'Our Team', path: '/team' },
    { name: 'Chapters', path: '/chapters' },
    { name: 'Blog', path: '/blog' },
  ],
  getInvolved: [
    { name: 'Join NYA', path: '/join' },
    { name: 'Start a Chapter', path: '/join' },
    { name: 'Campus Ambassador', path: '/join' },
    { name: 'Report Issue', path: '/report' },
  ],
  resources: [
    { name: 'Resource Hub', path: '/resources' },
    { name: 'Media', path: '/media' },
    { name: 'Contact Us', path: '/contact' },
  ],
};

const socialLinks = [
  { name: 'Discord', icon: FaDiscord, url: 'https://discord.com/invite/MWJGf7QdJX' },
  { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/nationalyouthalliance.genz/' },
  { name: 'Facebook', icon: Facebook, url: 'https://www.facebook.com/people/National-Youth-Alliance/61585687675924/' },
  { name: 'Twitter', icon: Twitter, url: 'https://x.com/NYA_Genz' },
  { name: 'YouTube', icon: Youtube, url: 'https://www.youtube.com/@NationalYouthAlliance-w6i' },
  { name: 'Pinterest', icon: FaPinterestP, url: 'https://in.pinterest.com/nationalyouthalliance/' },
  { name: 'Reddit', icon: FaRedditAlien, url: '#' },
];

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-hero" />
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full bg-accent/10 blur-3xl" />
      
      <div className="container mx-auto px-4 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-hero flex items-center justify-center text-foreground font-display font-bold text-xl">
                <Link to="/" className="flex items-center gap-3 group">
                  <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
                </Link>
              </div>
              <div>
                <span className="font-display font-bold text-xl text-background">
                  National Youth Alliance
                </span>
                <span className="block text-sm text-background/60 font-handwritten text-xl">
                  India
                </span>
              </div>
            </Link>
            <p className="text-background/70 mb-6 max-w-sm leading-relaxed">
              A youth-powered movement fighting for transparency, accountability, and a better India. 
              Join thousands of young changemakers across the country.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl bg-background/10 hover:bg-primary flex items-center justify-center transition-colors"
                  aria-label={social.name}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Movement */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4">Movement</h4>
            <ul className="space-y-3">
              {footerLinks.movement.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="text-background/70 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4">Get Involved</h4>
            <ul className="space-y-3">
              {footerLinks.getInvolved.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-background/70 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="text-background/70 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-background/50 text-sm flex items-center gap-2">
            Made with <Heart size={14} className="text-primary fill-primary" /> by youth, for youth
          </p>
          <p className="text-background/50 text-sm">
            © {new Date().getFullYear()} National Youth Alliance. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
