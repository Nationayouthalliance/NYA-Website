import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Star, Search } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { AnimatedSection, StaggerContainer, StaggerItem, HoverScale } from '@/components/AnimatedElements';
import { Input } from '@/components/ui/input';
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';


interface TeamMember {
  id: string;
  name: string;
  wing: string;
  role: string;
  chapter: string;
  bio: string;
  whatTheyDo: string;
}

const wingColors: Record<string, string> = {
 'Strategy and Analysis': 'bg-primary',
  'Training and Management': 'bg-orange',
  'Technical and Resources': 'bg-accent',
  'Outreach and Recruitment': 'bg-purple',
  'Content and Design': 'bg-green',
};

const TeamPage = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
const [loading, setLoading] = useState(true);
useEffect(() => {
  const fetchTeam = async () => {
    const { data, error } = await supabase
      .from('team_members')
      .select('id, name, wing, role, city, about, contribution');

    if (error) {
      console.error('Error fetching team members:', error);
    } else {
      setTeamMembers(
        data.map((m) => ({
          id: m.id,
          name: m.name,
          wing: m.wing,
          role: m.role,
          chapter: m.city,
          bio: m.about,
          whatTheyDo: m.contribution,
        }))
      );
    }
    setLoading(false);
  };

  fetchTeam();
}, []);


const filteredTeam = useMemo(() => {
  if (!searchQuery.trim()) return teamMembers;
  const query = searchQuery.toLowerCase();
  return teamMembers.filter(member =>
    member.name.toLowerCase().includes(query) ||
    member.role.toLowerCase().includes(query) ||
    member.wing.toLowerCase().includes(query) ||
    member.chapter.toLowerCase().includes(query)
  );
}, [searchQuery, teamMembers]);


  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-muted to-background relative overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 left-10 w-48 h-48 rounded-full bg-accent/10 blur-3xl" />
        
        <div className="container mx-auto px-4 relative">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ rotate: -5 }}
              animate={{ rotate: 5 }}
              transition={{ repeat: Infinity, repeatType: 'reverse', duration: 2 }}
              className="inline-block mb-6"
            >
              <span className="sticker-primary text-lg">
                <Sparkles className="inline mr-2" size={18} />
                Meet the humans!
              </span>
            </motion.div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-foreground mb-6">
              Our Team
            </h1>
            <p className="text-xl text-muted-foreground">
              The passionate young changemakers driving NYA forward. 
              Click on anyone to learn more about them!
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Decorative stickers */}
      <section className="py-4 overflow-hidden">
        <div className="flex justify-center gap-4 flex-wrap px-4">
          {['💪 Youth Power', '🇮🇳 Made in India', '✊ Change Makers', '🌟 Dream Team'].map((text, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`px-4 py-2 rounded-xl font-bold text-sm ${
                i % 2 === 0 ? 'bg-muted rotate-fun-1' : 'bg-muted rotate-fun-2'
              }`}
            >
              {text}
            </motion.span>
          ))}
        </div>
      </section>

      {/* Search Bar */}
      <section className="py-6 bg-background border-b border-border sticky top-20 z-30 backdrop-blur-xl bg-background/90">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              placeholder="Search by name, role, wing, or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 rounded-full h-12 bg-muted border-0 focus-visible:ring-primary"
            />
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {filteredTeam.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No team members found matching "{searchQuery}"</p>
            </div>
          ) : (
            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTeam.map((member, index) => (
              <StaggerItem key={member.id}>
                <HoverScale scale={1.03}>
                  <motion.div
                    onClick={() => setSelectedMember(member)}
                    className="cursor-pointer p-6 rounded-3xl bg-card border border-border hover:border-primary/50 transition-all group"
                    whileHover={{ y: -5 }}
                  >
                    {/* Avatar placeholder */}
                    <div className="w-20 h-20 rounded-2xl bg-gradient-hero mx-auto mb-4 flex items-center justify-center text-white font-display text-2xl font-bold shadow-lg">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    
                    <div className="text-center">
                      <h3 className="font-display text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3">{member.role}</p>
                      
                      <div className="flex items-center justify-center gap-2 flex-wrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${wingColors[member.wing] || 'bg-muted'}`}>
                          {member.wing}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                          {member.chapter}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </HoverScale>
              </StaggerItem>
            ))}
            </StaggerContainer>
          )}
        </div>
      </section>

      {/* Member Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMember(null)}
            className="fixed inset-0 z-50 bg-foreground/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background rounded-3xl p-8 max-w-lg w-full relative shadow-2xl"
            >
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-muted flex items-center justify-center hover:bg-destructive hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              <div className="text-center mb-6">
                <div className="w-24 h-24 rounded-2xl bg-gradient-hero mx-auto mb-4 flex items-center justify-center text-white font-display text-3xl font-bold shadow-lg">
                  {selectedMember.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h2 className="font-display text-3xl font-bold text-foreground mb-1">
                  {selectedMember.name}
                </h2>
                <p className="text-primary font-medium">{selectedMember.role}</p>
              </div>

              <div className="flex items-center justify-center gap-2 mb-6">
                <span className={`px-4 py-1.5 rounded-full text-sm font-medium text-white ${wingColors[selectedMember.wing] || 'bg-muted'}`}>
                  {selectedMember.wing}
                </span>
                <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-muted text-muted-foreground">
                  📍 {selectedMember.chapter}
                </span>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-muted">
                  <h4 className="font-display font-bold text-foreground mb-2 flex items-center gap-2">
                    <Star className="text-primary" size={18} />
                    About
                  </h4>
                  <p className="text-muted-foreground">{selectedMember.bio}</p>
                </div>

                <div className="p-4 rounded-2xl bg-muted">
                  <h4 className="font-display font-bold text-foreground mb-2 flex items-center gap-2">
                    <Sparkles className="text-accent" size={18} />
                    What they do at NYA
                  </h4>
                  <p className="text-muted-foreground">{selectedMember.whatTheyDo}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Join Team CTA */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center max-w-2xl mx-auto">
            <span className="font-handwritten text-3xl text-primary mb-4 block">
              Want to be on this page?
            </span>
            <h2 className="font-display text-4xl text-foreground mb-6">
              Join the NYA team
            </h2>
            <p className="text-muted-foreground mb-8">
              We're always looking for passionate young people to join our team. 
              Whether you're a writer, organizer, developer, or just someone who cares — 
              there's a place for you.
            </p>
            <motion.a
              href="/join"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="btn-hero inline-flex"
            >
              Apply to join team →
            </motion.a>
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

export default TeamPage;
