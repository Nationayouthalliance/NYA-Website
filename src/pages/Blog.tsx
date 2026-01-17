import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Sparkles, Search, User } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { AnimatedSection, StaggerContainer, StaggerItem, HoverScale } from '@/components/AnimatedElements';
import { supabase } from '@/lib/supabase';
import { useEffect } from 'react';


const categories = ['All', 'Success Stories', 'Opinion', 'Movement', 'How-To'];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
const [posts, setPosts] = useState<any[]>([]);
const [loading, setLoading] = useState(true);
useEffect(() => {
  const fetchBlogs = async () => {
const { data, error } = await supabase
  .from('blog_posts')
 .select(`
  id,
  title,
  slug,
  excerpt,
  cover_image,
  tag,
  content,
  status,
  featured,
  created_at,
  author_admin_id,
  author:author_admin_id (
    id,
    name,
    email
  )
`)

  .order('created_at', { ascending: false });
    

    if (error) {
      console.error('Error fetching blogs:', error);
    } else {
      setPosts(data || []);
    }

    setLoading(false);
  };

  fetchBlogs();
}, []);

const featuredPosts = posts.filter(post => post.featured);


 const filteredPosts = posts.filter(post => {
  const matchesCategory = activeCategory === 'All' || post.tag === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (post.excerpt || '').toLowerCase()
.includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/10 to-background relative overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 right-10 w-48 h-48 rounded-full bg-orange/20 blur-3xl" />
        
        <div className="container mx-auto px-4 relative">
          <AnimatedSection className="text-center max-w-4xl mx-auto">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium mb-6 border border-primary/30">
              ✍️ NYA Blog
            </span>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-foreground mb-6">
              Stories of{' '}
              <span className="text-gradient bg-gradient-hero">change</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Real stories from the frontlines of youth activism. Guides, opinions, 
              and inspiration for the changemakers of India.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-card border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-muted text-muted-foreground hover:bg-primary/10'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {activeCategory === 'All' && searchQuery === '' && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <AnimatedSection className="mb-10">
              <div className="flex items-center gap-3">
                <Sparkles className="text-primary" size={24} />
                <h2 className="font-display text-2xl text-foreground">Featured Stories</h2>
              </div>
            </AnimatedSection>

            <div className="grid lg:grid-cols-2 gap-6">
              {featuredPosts.map((post, index) => (
                <AnimatedSection key={post.id} delay={index * 0.1}>
                  <Link to={`/blog/${post.slug}`}>
                    <HoverScale>
                      <div className="h-full p-8 rounded-3xl bg-gradient-to-br from-primary/10 via-orange/5 to-accent/10 border border-primary/20 hover:border-primary/40 transition-colors group">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                          <span className="px-3 py-1 rounded-full bg-primary/20 text-primary font-medium">
                            {post.tag}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {post.read_time}
                          </span>
                        </div>
                        <h3 className="font-display text-2xl sm:text-3xl text-foreground font-bold mb-4 group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground text-lg mb-6">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm">
                            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                              <User size={16} className="text-muted-foreground" />
                            </div>
                            <span className="font-medium text-foreground">{post.author?.name || 'NYA Team'}</span>
                          </div>
                          <span className="text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                            Read <ArrowRight size={16} />
                          </span>
                        </div>
                      </div>
                    </HoverScale>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts Grid */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <AnimatedSection className="mb-10">
            <h2 className="font-display text-2xl text-foreground">
              {activeCategory === 'All' ? 'All Articles' : activeCategory}
            </h2>
            <p className="text-muted-foreground">
              {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
            </p>
          </AnimatedSection>

          {filteredPosts.length > 0 ? (
            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <StaggerItem key={post.id}>
                  <Link to={`/blog/${post.slug}`}>
                    <HoverScale>
                      <article className="h-full bg-card rounded-3xl border border-border overflow-hidden group">
                        <div className="aspect-[16/9] relative overflow-hidden bg-muted">
  {post.cover_image ? (
    <img
      src={post.cover_image}
      alt={post.title}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
  ) : (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
      <span className="font-handwritten text-6xl text-primary/30">
        {post.tag?.charAt(0) || 'N'}
      </span>
    </div>
  )}
</div>

                        <div className="p-6">
                          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                            <span className="px-2 py-0.5 rounded-full bg-muted text-xs font-medium">
                              {post.tag}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock size={12} />
                              {post.read_time}
                            </span>
                          </div>
                          <h3 className="font-display text-xl text-foreground font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-between pt-4 border-t border-border">
                            <div className="flex items-center gap-2 text-sm">
                              <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                                <User size={12} className="text-muted-foreground" />
                              </div>
                              <span className="text-muted-foreground">{post.author?.name || 'NYA Team'}</span>
                            </div>
                            <span className="flex items-center gap-1">
                              <Calendar size={12} className="text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">
                                {new Date(post.created_at).toLocaleDateString('en-IN', {
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </span>
                            </span>
                          </div>
                        </div>
                      </article>
                    </HoverScale>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No articles found matching your criteria.</p>
              <button
                onClick={() => {
                  setActiveCategory('All');
                  setSearchQuery('');
                }}
                className="mt-4 text-primary font-medium hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
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

export default Blog;
