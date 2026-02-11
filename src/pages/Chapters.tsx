import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, Calendar, Rocket, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { AnimatedSection, StaggerContainer, StaggerItem, HoverScale } from '@/components/AnimatedElements';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabase';
import { useEffect } from 'react';



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
const [searchQuery, setSearchQuery] = useState('');
const [chapters, setChapters] = useState<Chapter[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchChapters = async () => {
    const { data, error } = await supabase
      .from('chapters')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching chapters:', error);
    } else {
      setChapters(data as Chapter[]);
    }

    setLoading(false);
  };

  fetchChapters();
}, []);


const filteredChapters = useMemo(() => {
  let list = [...chapters];

  if (filter !== 'all') {
    list = list.filter(c => c.status === filter);
  }

  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    list = list.filter(c =>
      c.city.toLowerCase().includes(query) ||
      c.state.toLowerCase().includes(query) ||
      c.status.toLowerCase().includes(query)
    );
  }

  return list;
}, [filter, searchQuery, chapters]);


  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-muted to-background relative overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-0 right-10 w-48 h-48 rounded-full bg-primary/10 blur-3xl" />
        <div className="container mx-auto px-4 relative">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ rotate: -5 }}
              animate={{ rotate: 5 }}
              transition={{ repeat: Infinity, repeatType: 'reverse', duration: 2 }}
              className="inline-block mb-6"
            >
              <span className="sticker-accent text-lg">
                <MapPin className="inline mr-2" size={18} />
                Meet the humans!
              </span>
            </motion.div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-foreground mb-6">
              Our Chapters
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
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
        </div>
      </section>

      {/* Filters & Search */}
      <section className="py-6 bg-background border-b border-border sticky top-20 z-30 backdrop-blur-xl bg-background/90">
        <div className="container mx-auto px-4 space-y-4">
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              placeholder="Search by city, state, or status..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 rounded-full h-12 bg-muted border-0 focus-visible:ring-primary"
            />
          </div>
          
          {/* Status Filters */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
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
          {filteredChapters.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No chapters found matching your criteria</p>
            </div>
          ) : (
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
          )}
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
