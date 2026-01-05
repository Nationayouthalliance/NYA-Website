import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, Calendar, Rocket, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { AnimatedSection, StaggerContainer, StaggerItem, HoverScale } from '@/components/AnimatedElements';
import chaptersData from '@/data/chapters.json';
import indiaMap from '@/assets/india-map.png';

interface Chapter {
  id: string;
  city: string;
  state: string;
  status: 'active' | 'growing' | 'starting';
  members: number;
  lead: string;
  founded: string;
}

const statusConfig = {
  active: { label: 'Active', color: 'bg-green', textColor: 'text-green' },
  growing: { label: 'Growing', color: 'bg-orange', textColor: 'text-orange' },
  starting: { label: 'Starting', color: 'bg-accent', textColor: 'text-accent' },
};

const ChaptersPage = () => {
  const [filter, setFilter] = useState<string>('all');

  const filteredChapters = filter === 'all' 
    ? chaptersData 
    : (chaptersData as Chapter[]).filter(c => c.status === filter);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-muted to-background relative overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-0 right-10 w-48 h-48 rounded-full bg-primary/10 blur-3xl" />
        
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <span className="sticker-accent inline-block mb-6">
                <MapPin className="inline mr-2" size={18} />
                Growing nationwide
              </span>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-foreground mb-6">
                Our Chapters
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                NYA chapters are everywhere — from metros to tier-2 cities. 
                Each chapter is autonomous, yet connected by a shared mission.
              </p>
              <Link to="/join">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-hero"
                >
                  <Rocket size={20} />
                  Start a Chapter
                </motion.button>
              </Link>
            </AnimatedSection>

            <AnimatedSection direction="right" className="hidden lg:block">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <img 
                  src={indiaMap} 
                  alt="NYA Chapters across India" 
                  className="w-full max-w-md mx-auto drop-shadow-2xl"
                />
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-background border-b border-border sticky top-20 z-30 backdrop-blur-xl bg-background/90">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm font-medium text-muted-foreground">Filter:</span>
            {['all', 'active', 'growing', 'starting'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === status
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {status === 'all' ? 'All Chapters' : statusConfig[status as keyof typeof statusConfig].label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Chapters Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChapters.map((chapter, index) => {
              const config = statusConfig[(chapter as Chapter).status];
              return (
                <StaggerItem key={(chapter as Chapter).id}>
                  <HoverScale>
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="p-6 rounded-3xl bg-card border border-border hover:border-primary/50 transition-all h-full"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-hero flex items-center justify-center text-white">
                          <MapPin size={28} />
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${config.color} text-white`}>
                          {config.label}
                        </span>
                      </div>

                      <h3 className="font-display text-2xl font-bold text-foreground mb-1">
                        {(chapter as Chapter).city}
                      </h3>
                      <p className="text-muted-foreground mb-4">{(chapter as Chapter).state}</p>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="p-3 rounded-xl bg-muted">
                          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                            <Users size={14} />
                            Members
                          </div>
                          <p className="font-display font-bold text-lg text-foreground">
                            {(chapter as Chapter).members}
                          </p>
                        </div>
                        <div className="p-3 rounded-xl bg-muted">
                          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                            <Calendar size={14} />
                            Founded
                          </div>
                          <p className="font-display font-bold text-lg text-foreground">
                            {(chapter as Chapter).founded}
                          </p>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-border">
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium">Chapter Lead:</span> {(chapter as Chapter).lead}
                        </p>
                      </div>
                    </motion.div>
                  </HoverScale>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Start Chapter CTA */}
      <section className="py-24 bg-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 text-9xl font-display font-bold">START</div>
          <div className="absolute bottom-10 right-10 text-9xl font-display font-bold">TODAY</div>
        </div>

        <div className="container mx-auto px-4 relative">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <span className="font-handwritten text-4xl text-primary mb-4 block">
              Don't see your city?
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-background mb-6">
              Start a chapter in your city
            </h2>
            <p className="text-xl text-background/70 mb-10">
              All you need is passion and a few friends who share your vision. 
              We'll provide the training, resources, and support to help you get started.
            </p>

            <div className="grid sm:grid-cols-3 gap-6 mb-10">
              {[
                { step: '01', title: 'Apply', desc: 'Fill out a simple form' },
                { step: '02', title: 'Train', desc: 'Get onboarded by our team' },
                { step: '03', title: 'Launch', desc: 'Start making impact' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-2xl bg-background/5 border border-background/10"
                >
                  <span className="font-display text-4xl font-bold text-primary">{item.step}</span>
                  <h4 className="font-display text-xl font-bold text-background mt-2">{item.title}</h4>
                  <p className="text-background/60 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <Link to="/join">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-gradient-hero text-white font-bold rounded-full text-lg shadow-lg"
              >
                Start Your Chapter →
              </motion.button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default ChaptersPage;
