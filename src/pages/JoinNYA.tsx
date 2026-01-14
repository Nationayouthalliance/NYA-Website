import { motion } from 'framer-motion';
import { Instagram, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { AnimatedSection, StaggerContainer, StaggerItem, HoverScale } from '@/components/AnimatedElements';
import { FaWhatsapp, FaDiscord, FaTelegramPlane } from "react-icons/fa";

const platforms = [
  {
    id: 'discord',
    name: 'Discord Server',
    description: 'Our main community hub. Chat, collaborate, and connect with members.',
    icon: FaDiscord,
    color: 'bg-[#5865F2]',
    available: true,
    link: 'https://discord.gg/EVSEgZ2c',
    buttonText: 'Join Discord',
  },
  {
    id: 'instagram',
    name: 'Instagram Group Chat',
    description: 'Connect with the community on Instagram for casual conversations.',
    icon: Instagram,
    color: 'bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737]',
    available: true,
    link: 'https://www.instagram.com/nationalyouthalliance.genz/',
    buttonText: 'Join Instagram',
  },
  {
    id: 'telegram',
    name: 'Telegram Channel',
    description: 'Get updates, announcements, and stay connected on the go.',
    icon: FaTelegramPlane,
    color: 'bg-[#0088cc]',
    available: false,
    buttonText: 'Coming Soon',
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp Community',
    description: 'Join our WhatsApp groups for local coordination and quick updates.',
    icon: FaWhatsapp,
    color: 'bg-[#25D366]',
    available: false,
    buttonText: 'Coming Soon',
  },
];

const JoinNYA = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/10 to-background relative overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 left-10 w-48 h-48 rounded-full bg-accent/10 blur-3xl" />
        
        <div className="container mx-auto px-4 relative">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft size={16} />
            <span className="text-sm">Back to home</span>
          </Link>

          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="inline-block mb-6"
            >
              <span className="sticker-primary text-lg">
                <FaDiscord className="inline mr-2" size={18} />
                Join the Community
              </span>
            </motion.div>
            
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-foreground mb-6">
              Join NYA
            </h1>
            <p className="text-xl text-muted-foreground">
              Become part of India's youth movement. Connect with thousands of young 
              changemakers fighting for a better tomorrow.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Platform Cards */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <StaggerContainer className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {platforms.map((platform) => (
              <StaggerItem key={platform.id}>
                <HoverScale>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className={`relative p-8 rounded-3xl border-2 transition-all h-full ${
                      platform.available
                        ? 'border-primary bg-card hover:shadow-2xl hover:shadow-primary/10'
                        : 'border-border bg-card/50'
                    }`}
                  >
                    {/* Icon */}
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      className={`w-16 h-16 rounded-2xl ${platform.color} flex items-center justify-center mb-6 shadow-lg`}
                    >
                      <platform.icon size={32} className="text-white" />
                    </motion.div>

                    <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                      {platform.name}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {platform.description}
                    </p>

                    {platform.available ? (
                      <motion.a
                        href={platform.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white ${platform.color} hover:opacity-90 transition-opacity shadow-lg`}
                      >
                        <platform.icon size={20} />
                        {platform.buttonText}
                      </motion.a>
                    ) : (
                      <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium bg-muted text-muted-foreground">
                        <span className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse" />
                        {platform.buttonText}
                      </div>
                    )}

                    {/* Glow effect for available platforms */}
                    {platform.available && (
                      <motion.div
                        animate={{ 
                          opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className={`absolute inset-0 rounded-3xl ${platform.color} blur-2xl opacity-10 -z-10`}
                      />
                    )}
                  </motion.div>
                </HoverScale>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Additional CTA */}
          <AnimatedSection className="text-center mt-16">
            <p className="text-muted-foreground mb-6">
              Want to contribute more? Apply for a leadership role.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/join">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 rounded-full font-semibold bg-gradient-hero text-white shadow-lg"
                >
                  Join Team →
                </motion.button>
              </Link>
              <Link to="/join">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 rounded-full font-semibold border-2 border-primary text-primary hover:bg-primary/5"
                >
                  Start a Chapter
                </motion.button>
              </Link>
               <Link to="/join">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                className="px-6 py-3 font-semibold rounded-full hover:scale-105 transition-all shadow-md bg-primary text-primary-foreground"
                >
                  Become Ambassador
                </motion.button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
       {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center max-w-2xl mx-auto">
            <span className="font-handwritten text-3xl text-white/90 mb-4 block">
              Stay in the loop
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-white mb-6">
              Subscribe to our newsletter
            </h2>
            <p className="text-white/80 mb-8">
              Get the latest stories, updates, and action alerts delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-5 py-3 rounded-full bg-white/50 border border-white/70 text-white placeholder:text-white/80 focus:bg-white/30 focus:border-white outline-none transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-6 py-3 bg-white text-orange font-bold rounded-full shadow-lg"
              >
                Subscribe
              </motion.button>
            </form>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default JoinNYA;
