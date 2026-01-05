import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Target, Network, Quote, ArrowRight, Calendar } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { AnimatedSection, StaggerContainer, StaggerItem, FloatingElement } from '@/components/AnimatedElements';

import community1 from '@/assets/community-1.jpg';
import community2 from '@/assets/community-2.jpg';
import community3 from '@/assets/community-3.jpg';

const timeline = [
  {
    year: '2025 SEP',
    title: 'The Spark',
    description: 'A group of college students started questioning why youth voices were ignored. They decided to change that.',
  },
  {
    year: '2025 NOV',
    title: 'The Start',
    description: 'We started community nationwide with various other interested people from various cities and state',
  },
  {
    year: '2025 DEC',
    title: 'First 100 ',
    description: 'We reached over 100 Members in NYA with same vision from various cities and states with people in different fields',
  },
  {
    year: '2026 JAN',
    title: 'The Foundation',
    description: 'We made the Founadtion of NYA with different roles and work to reach and connect more people and grow community to at the end get people for nation wide movements The revolution continues.',
  },
];

const values = [
  {
    icon: Heart,
    title: 'Community First',
    description: 'We believe in collective action over individual heroism. Every voice matters.',
    color: 'bg-primary',
  },
  {
    icon: Target,
    title: 'Action-Oriented',
    description: 'We don\'t just talk about change — we make it happen. Every day. Everywhere.',
    color: 'bg-orange',
  },
  {
    icon: Network,
    title: 'Decentralized',
    description: 'Each chapter has the autonomy to address local issues while being part of a larger movement.',
    color: 'bg-accent',
  },
];

const AboutPage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-foreground to-foreground/95 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-0 text-[12rem] font-display font-bold leading-none">ABOUT</div>
          <div className="absolute bottom-0 right-0 text-[12rem] font-display font-bold leading-none">NYA</div>
        </div>
        
        <FloatingElement className="absolute top-40 right-20 hidden lg:block">
          <div className="w-20 h-20 rounded-full bg-primary/20 blur-sm" />
        </FloatingElement>
        
        <div className="container mx-auto px-4 relative">
          <AnimatedSection className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium mb-6">
              Our Story
            </span>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-8xl text-background mb-8">
              We're building the{' '}
              <span className="text-gradient bg-gradient-hero">India we deserve</span>
            </h1>
            <p className="text-xl sm:text-2xl text-background/80 leading-relaxed">
              National Youth Alliance India is not an organization. It's a movement. 
              A network of young Indians who refuse to accept the status quo and are 
              actively working to change it.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 bg-primary relative">
        <div className="container mx-auto px-4">
          <AnimatedSection className="max-w-4xl mx-auto text-center">
            <Quote className="w-16 h-16 text-white/30 mx-auto mb-6" />
            <blockquote className="font-display text-3xl sm:text-4xl text-white mb-6 italic">
              "The youth of India are not the leaders of tomorrow. 
              We are the leaders of today."
            </blockquote>
            <p className="text-white/80">— NYA Founding Principle</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left">
              <div className="grid grid-cols-2 gap-4">
                <motion.img 
                  whileHover={{ scale: 1.02, rotate: -2 }}
                  src={community1} 
                  alt="Community" 
                  className="rounded-3xl shadow-lg w-full h-64 object-cover"
                />
                <motion.img 
                  whileHover={{ scale: 1.02, rotate: 2 }}
                  src={community2} 
                  alt="Volunteers" 
                  className="rounded-3xl shadow-lg w-full h-64 object-cover mt-12"
                />
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" className="space-y-8">
              <div>
                <span className="sticker-primary mb-4 inline-block">Our Vision</span>
                <h2 className="font-display text-4xl text-foreground mb-4">
                  An India where youth are heard, respected, and empowered
                </h2>
                <p className="text-muted-foreground text-lg">
                  We envision a society where young people are not just passengers 
                  but active drivers of change. Where transparency is the norm, 
                  not the exception.
                </p>
              </div>

              <div>
                <span className="sticker-accent mb-4 inline-block">Our Mission</span>
                <h2 className="font-display text-4xl text-foreground mb-4">
                  Fight corruption. Demand transparency. Build community.
                </h2>
                <p className="text-muted-foreground text-lg">
                  Through grassroots organizing, digital advocacy, and direct action, 
                  we work to expose corruption, educate citizens, and build a nationwide 
                  network of youth leaders.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <span className="font-handwritten text-3xl text-primary mb-4 block">
              What drives us
            </span>
            <h2 className="font-display text-4xl sm:text-5xl text-foreground">
              Our Core Values
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <StaggerItem key={index}>
                <motion.div
                  whileHover={{ y: -10 }}
                  className="p-8 rounded-3xl bg-background shadow-lg h-full"
                >
                  <div className={`w-16 h-16 rounded-2xl ${value.color} flex items-center justify-center mb-6`}>
                    <value.icon size={32} className="text-white" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-lg">
                    {value.description}
                  </p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <span className="sticker-orange inline-block mb-4">
              <Calendar className="inline mr-2" size={18} />
              Our Journey
            </span>
            <h2 className="font-display text-4xl sm:text-5xl text-foreground">
              How we got here
            </h2>
          </AnimatedSection>

          <div className="max-w-3xl mx-auto">
            {timeline.map((item, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <div className="flex gap-6 mb-12 last:mb-0">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-hero flex items-center justify-center text-white font-display font-bold shadow-lg">
                      {item.year.slice(2)}
                    </div>
                    {index < timeline.length - 1 && (
                      <div className="w-0.5 flex-1 bg-gradient-to-b from-primary to-transparent mt-4" />
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <span className="text-primary font-bold">{item.year}</span>
                    <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-lg">
                      {item.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Decentralized Nature */}
      <section className="py-24 bg-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-noise" />
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <span className="inline-block px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium mb-6">
                How we work
              </span>
              <h2 className="font-display text-4xl sm:text-5xl text-background mb-6">
                Decentralized by design
              </h2>
              <p className="text-xl text-background/70 mb-8">
                NYA isn't run by a central authority. Each chapter operates independently, 
                addressing local issues while being part of a larger national network. 
                This makes us resilient, responsive, and truly representative of India's diverse youth.
              </p>
              <ul className="space-y-4">
                {[
                  'Each chapter chooses its own focus areas',
                  'Local leadership makes local decisions',
                  'Resources and knowledge are shared freely',
                  'United by values, not hierarchy',
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 text-background/80"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <motion.img
                whileHover={{ scale: 1.02 }}
                src={community3}
                alt="Decentralized movement"
                className="rounded-3xl shadow-2xl w-full"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-4xl sm:text-5xl text-white mb-6">
              Ready to be part of the story?
            </h2>
            <p className="text-xl text-white/80 mb-10">
              The movement needs you. Your city needs you. India needs you.
            </p>
            <Link to="/join">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-white text-black font-bold rounded-full text-lg shadow-lg inline-flex items-center gap-2"
              >
                Join the Movement
                <ArrowRight size={20} />
              </motion.button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
