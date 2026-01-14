import { motion } from 'framer-motion';
import { Search, ExternalLink, Download, FileText, Link as LinkIcon, BookOpen, Filter } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { AnimatedSection, StaggerContainer, StaggerItem, HoverScale } from '@/components/AnimatedElements';
import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Resource {
  id: string;
  title: string;
  description: string;
  tags: string[];        
  category: string;
  type: 'guide' | 'link' | 'resource';
  link: string;          
}


const categories = [
  'All',
  'Anti-corruption',
  'Government portals',
  'Youth help',
  'Legal help',
  'Guides',
];

const typeIcons = {
  guide: BookOpen,
  link: LinkIcon,
  resource: FileText,
};

const typeColors = {
  guide: 'bg-primary',
  link: 'bg-accent',
  resource: 'bg-orange',
};

const ResourcesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
const [activeCategory, setActiveCategory] = useState('All');
const [resources, setResources] = useState<Resource[]>([]);
const [loading, setLoading] = useState(true);
useEffect(() => {
  const fetchResources = async () => {
    const { data, error } = await supabase
      .from('resources')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching resources:', error);
    } else {
      const mapped = (data || []).map((item: any) => ({
  id: item.id,
  title: item.title,
  description: item.description,
  link: item.link,
  tags: item.tags || [],                     
  category: item.tags?.[0] || 'General',     
  type: item.tags?.includes('Guides')
    ? 'guide'
    : item.tags?.includes('Legal help')
    ? 'resource'
    : 'link',
}));


      setResources(mapped);
    }

    setLoading(false);
  };

  fetchResources();
}, []);


  const filteredResources = useMemo(() => {
  let list = [...resources];

if (activeCategory !== 'All') {
  list = list.filter(r => r.tags.includes(activeCategory));
}


  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    list = list.filter(r =>
      r.title.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q)
    );
  }

  return list;
}, [resources, activeCategory, searchQuery]);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-muted to-background relative overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-0 left-10 w-48 h-48 rounded-full bg-primary/10 blur-3xl" />
        
        <div className="container mx-auto px-4 relative">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <span className="sticker-accent inline-block mb-6">
              <BookOpen className="inline mr-2" size={18} />
              Knowledge Hub
            </span>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-foreground mb-6">
              Resources & Links
            </h1>
            <p className="text-xl text-muted-foreground mb-10">
              Everything you need to fight corruption, know your rights, and make change happen. 
              Curated by NYA for India's youth.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-lg"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-6 bg-background border-b border-border sticky top-20 z-30 backdrop-blur-xl bg-background/90">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2">
            <Filter size={18} className="text-muted-foreground shrink-0" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {filteredResources.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">No resources found matching your search.</p>
            </div>
          ) : (
            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => {
                const Icon = typeIcons[resource.type];
                const colorClass = typeColors[resource.type];
                
                return (
                  <StaggerItem key={resource.id}>
                    <HoverScale>
                      <motion.a
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -5 }}
                        className="block p-6 rounded-3xl bg-card border border-border hover:border-primary/50 transition-all h-full group"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className={`w-12 h-12 rounded-xl ${colorClass} flex items-center justify-center`}>
                            <Icon size={24} className="text-white" />
                          </div>
                          <ExternalLink 
                            size={18} 
                            className="text-muted-foreground group-hover:text-primary transition-colors" 
                          />
                        </div>

                        <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {resource.title}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          {resource.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
  {resource.tags.map((tag, idx) => (
    <span
      key={idx}
      className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground"
    >
      {tag}
    </span>
  ))}
</div>

                      </motion.a>
                    </HoverScale>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          )}
        </div>
      </section>

      {/* Suggest Resource CTA */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <AnimatedSection className="max-w-2xl mx-auto text-center">
            <span className="font-handwritten text-3xl text-primary mb-4 block">
              Know a helpful resource?
            </span>
            <h2 className="font-display text-4xl text-foreground mb-6">
              Help us grow this collection
            </h2>
            <p className="text-muted-foreground mb-8">
              If you know of a resource that could help fellow youth, let us know! 
              We're always looking to expand this collection.
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="btn-hero inline-flex"
            >
              Suggest a Resource →
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

export default ResourcesPage;
