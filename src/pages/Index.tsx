import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Users, MapPin, Flag, Heart, Megaphone, Shield, Sparkles } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { AnimatedSection, AnimatedCounter, StaggerContainer, StaggerItem, FloatingElement, HoverScale } from '@/components/AnimatedElements';

import heroImage from '@/assets/hero-image.jpg';
import community1 from '@/assets/community-1.jpg';
import community2 from '@/assets/community-2.jpg';
import community3 from '@/assets/community-3.jpg';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

const features = [
  {
    title: 'Youth-Powered',
    description: 'Built by young people, for young people. No bureaucracy, just action.',
    icon: Sparkles,
    color: 'bg-primary',
  },
  {
    title: 'Decentralized',
    description: 'Chapters across India, each with the autonomy to drive local change.',
    icon: MapPin,
    color: 'bg-accent',
  },
  {
    title: 'Anti-Corruption',
    description: 'Fighting for transparency and accountability in every system.',
    icon: Shield,
    color: 'bg-orange',
  },
  {
    title: 'Community First',
    description: 'We believe in the power of collective action over individual heroism.',
    icon: Heart,
    color: 'bg-purple',
  },
];

const Index = () => {
    const [stats, setStats] = useState([
    { label: 'Active Members', value: 0, suffix: '+', icon: Users },
    { label: 'Chapters', value: 0, suffix: '', icon: MapPin },
    { label: 'States Covered', value: 0, suffix: '', icon: Flag },
    { label: 'Issues Resolved', value: 0, suffix: '+', icon: Shield },
  ]);
  useEffect(() => {
    const fetchStats = async () => {
      const { data, error } = await supabase
.from('home_stats')
.select('*')
.eq('id', '00000000-0000-0000-0000-000000000001')
.single();


      if (error) {
        console.error('Error fetching home stats:', error);
        return;
      }

      if (data) {
        setStats([
          { label: 'Active Members', value: data.active_members || 0, suffix: '+', icon: Users },
          { label: 'Chapters', value: data.chapters || 0, suffix: '', icon: MapPin },
          { label: 'States Covered', value: data.states_covered || 0, suffix: '', icon: Flag },
          { label: 'Issues Resolved', value: data.issues_resolved || 0, suffix: '+', icon: Shield },
        ]);
      }
    };

    fetchStats();
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
         <img 
  src={heroImage} 
  alt="National Youth Alliance India youth-led movement fighting corruption and demanding transparency" 
  className="w-full h-full object-cover"
/>

          <div className="absolute inset-0 bg-gradient-to-b from-foreground/80 via-foreground/60 to-foreground" />
        </div>
        
        {/* Floating decorative elements */}
        <FloatingElement className="absolute top-40 left-10 hidden lg:block" delay={0}>
          <div className="w-20 h-20 rounded-3xl bg-primary/30 blur-sm" />
        </FloatingElement>
        <FloatingElement className="absolute top-60 right-20 hidden lg:block" delay={1}>
          <div className="w-16 h-16 rounded-full bg-accent/30 blur-sm" />
        </FloatingElement>
        <FloatingElement className="absolute bottom-40 left-1/4 hidden lg:block" delay={0.5}>
          <div className="w-12 h-12 rounded-2xl bg-orange/30 blur-sm" />
        </FloatingElement>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 pt-32 pb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium mb-6 border border-primary/30">
              🇮🇳 India's Youth Movement
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-display text-5xl sm:text-6xl lg:text-8xl text-background mb-6 max-w-5xl mx-auto"
          >
            We are{' '}
            <span className="relative">
              <span className="text-gradient bg-gradient-hero">young Indians</span>
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="absolute -bottom-2 left-0 h-2 bg-primary/50 rounded-full"
              />
            </span>
            {' '}fighting for change
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl sm:text-2xl text-background/80 mb-10 max-w-2xl mx-auto font-medium"
          >
            A decentralized movement of youth fighting corruption, demanding transparency, 
            and building the India we deserve.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link to="/join-nya">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="btn-hero group"
              >
                Join NYA
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </motion.button>
            </Link>
            <Link to="/report">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="btn-hero-outline text-background border-background/50 hover:bg-background hover:text-foreground"
              >
                <Shield size={20} />
                Report Issue
              </motion.button>
            </Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ 
              opacity: { delay: 1.5 },
              y: { repeat: Infinity, duration: 2 }
            }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <div className="w-6 h-10 rounded-full border-2 border-background/50 flex items-start justify-center p-2">
              <div className="w-1.5 h-3 rounded-full bg-background/50" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* What is NYA Section */}
      <section
  className="py-24 bg-background relative overflow-hidden"
  aria-labelledby="what-is-nya"
>

        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-accent/5 blur-3xl" />
        
        <div className="container mx-auto px-4 relative">
          <AnimatedSection className="text-center mb-16">
            <span className="sticker-primary mb-4 inline-block">What is NYA?</span>
            <h2 id="what-is-nya" className="font-display text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6">
              A movement, not an organization
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              National Youth Alliance India isn't another NGO. We're a decentralized network of 
              young changemakers across India, united by a shared vision of transparency and accountability.
            </p>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left">
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <motion.div 
                    whileHover={{ rotate: -2, scale: 1.02 }}
                    className="rounded-3xl overflow-hidden shadow-lg"
                  >
                   <img
  src={community1}
  alt="Youth community members of National Youth Alliance working together in India"
  className="w-full h-64 object-cover"
/>
                  </motion.div>
                  <motion.div 
                    whileHover={{ rotate: 2, scale: 1.02 }}
                    className="rounded-3xl overflow-hidden shadow-lg mt-8"
                  >
                    <img
  src={community2}
  alt="Volunteers of National Youth Alliance participating in civic action"
  className="w-full h-64 object-cover"
/>
                </div>
                <motion.div 
                  whileHover={{ rotate: -1, scale: 1.02 }}
                  className="absolute -bottom-40 left-1/4 -translate-x-1/2 w-3/4 rounded-3xl overflow-hidden shadow-xl border-4 border-background"
                >
                 <img
  src={community3}
  alt="National Youth Alliance rally led by young Indians for transparency"
  className="w-full h-48 object-cover"
/>
                </motion.div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" className="lg:pl-8">
              <StaggerContainer className="space-y-6">
                {features.map((feature, index) => (
                  <StaggerItem key={index}>
                    <HoverScale>
                      <div className="flex gap-4 p-4 rounded-2xl bg-card hover:bg-muted transition-colors">
                        <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center shrink-0`}>
                          <feature.icon size={24} className="text-white" />
                        </div>
                        <div>
                          <h3 className="font-display text-xl font-bold text-foreground mb-1">
                            {feature.title}
                          </h3>
                          <p className="text-muted-foreground">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </HoverScale>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-foreground relative overflow-hidden"  aria-label="National Youth Alliance impact statistics">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 text-9xl font-display font-bold">NYA</div>
          <div className="absolute bottom-10 right-10 text-9xl font-display font-bold">INDIA</div>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <AnimatedSection className="text-center mb-12">
            <span className="font-handwritten text-3xl text-primary">Our impact in numbers</span>
          </AnimatedSection>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
  <AnimatedSection key={stat.label + stat.value} delay={index * 0.1}>

                <HoverScale>
                  <div className="relative p-6 rounded-3xl bg-background/5 backdrop-blur border border-background/10 text-center group">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-hero mx-auto mb-4 flex items-center justify-center">
                      <stat.icon size={28} className="text-white" />
                    </div>
                    <div className="font-display text-5xl lg:text-6xl text-background font-bold mb-2">
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                    </div>
                    <p className="text-background/70 font-medium">{stat.label}</p>
                  </div>
                </HoverScale>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
         
      {/* Why NYA Exists Section */}
      <section className="py-24 bg-background relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection className="text-center mb-16">
              <span className="sticker-accent mb-4 inline-block">Why we exist</span>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-foreground mb-8">
                Because the youth of India deserve better
              </h2>
            </AnimatedSection>

            <StaggerContainer className="space-y-8">
              <StaggerItem>
                <div className="p-8 rounded-3xl bg-gradient-to-r from-primary/10 to-orange/10 border border-primary/20">
                  <h3 className="font-display text-2xl text-foreground mb-4">
                    <span className="text-primary">01.</span> We're tired of corruption
                  </h3>
                  <p className="text-muted-foreground text-lg">
                    From government offices to educational institutions, corruption affects every aspect 
                    of our lives. We believe in calling it out and demanding change.
                  </p>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="p-8 rounded-3xl bg-gradient-to-r from-accent/10 to-teal/10 border border-accent/20">
                  <h3 className="font-display text-2xl text-foreground mb-4">
                    <span className="text-accent">02.</span> We believe in collective power
                  </h3>
                  <p className="text-muted-foreground text-lg">
                    One voice can be ignored, but thousands cannot. NYA brings together youth from 
                    every corner of India to amplify our collective demands.
                  </p>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="p-8 rounded-3xl bg-gradient-to-r from-purple/10 to-purple/5 border border-purple/20">
                  <h3 className="font-display text-2xl text-foreground mb-4">
                    <span className="text-purple">03.</span> We're building the future
                  </h3>
                  <p className="text-muted-foreground text-lg">
                    The India of tomorrow depends on what we do today. By training the next generation 
                    of civic leaders, we're investing in a better future for everyone.
                  </p>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-hero relative overflow-hidden">
        <FloatingElement className="absolute top-20 left-10" delay={0}>
          <div className="w-32 h-32 rounded-full bg-white/10" />
        </FloatingElement>
        <FloatingElement className="absolute bottom-20 right-20" delay={0.5}>
          <div className="w-24 h-24 rounded-3xl bg-white/10" />
        </FloatingElement>
        
        <div className="container mx-auto px-4 relative">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <span className="font-handwritten text-4xl text-white/90 mb-4 block">
              Ready to make a difference?
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white mb-6">
              Join the movement today
            </h2>
            <p className="text-xl text-white/80 mb-10">
              Whether you want to join an existing chapter, start your own, or become 
              a campus ambassador — there's a place for you at NYA.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/join-nya">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-white text-orange font-bold rounded-full text-lg shadow-lg hover:shadow-xl transition-shadow"
                >
                  Join NYA →
                </motion.button>
              </Link>
              <Link to="/chapters">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full text-lg hover:bg-white/10 transition-colors"
                >
                  Explore Chapters
                </motion.button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
     {/* Newsletter CTA */}
<section className="py-20 bg-primary">
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

      <form 
        className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto" 
        method="POST" 
        action="https://a74b91df.sibforms.com"
      >
        {/* Name Field */}
        <input
          type="text"
          name="FIRSTNAME"
          required
          placeholder="Your Name"
          className="flex-1 px-5 py-3 rounded-full bg-white/50 border border-white/70 text-white placeholder:text-white/80 focus:bg-white/30 focus:border-white outline-none transition-all"
        />

        {/* Email Field */}
        <input
          type="email"
          name="EMAIL"
          required
          placeholder="your@email.com"
          className="flex-1 px-5 py-3 rounded-full bg-white/50 border border-white/70 text-white placeholder:text-white/80 focus:bg-white/30 focus:border-white outline-none transition-all"
        />
        
        {/* Brevo Hidden Fields - Double braces required for style in JSX */}
        <input type="text" name="email_address_check" value="" style={{ display: 'none' }} readOnly />
        <input type="hidden" name="locale" value="en" />
        <input type="hidden" name="html_type" value="simple" />

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

export default Index;
