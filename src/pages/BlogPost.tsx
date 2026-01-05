import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, User, Share2, Twitter, Linkedin, Link as LinkIcon, ArrowRight } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { AnimatedSection } from '@/components/AnimatedElements';
import blogData from '@/data/blog.json';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const post = blogData.find(p => p.id === id);
  const otherPosts = blogData.filter(p => p.id !== id).slice(0, 3);

  if (!post) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-4xl text-foreground mb-4">Post not found</h1>
            <Link to="/blog" className="text-primary hover:underline">
              ← Back to blog
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = post.title;
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        break;
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/10 to-background relative overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 right-10 w-48 h-48 rounded-full bg-accent/20 blur-3xl" />
        
        <div className="container mx-auto px-4 relative">
          <AnimatedSection className="max-w-4xl mx-auto">
            {/* Back button */}
            <motion.button
              onClick={() => navigate('/blog')}
              whileHover={{ x: -5 }}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Blog
            </motion.button>

            {/* Category badge */}
            <span className="inline-block px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium mb-6">
              {post.category}
            </span>

            {/* Title */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <User size={20} className="text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{post.author}</p>
                  <p className="text-sm">Contributor</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>
                  {new Date(post.date).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} />
                <span>{post.readTime} read</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Hero Image */}
      <section className="relative -mt-8">
        <div className="container mx-auto px-4">
          <AnimatedSection className="max-w-4xl mx-auto">
            <div className="aspect-[21/9] rounded-3xl bg-gradient-to-br from-primary/30 via-accent/20 to-orange/30 overflow-hidden shadow-2xl flex items-center justify-center">
              <span className="font-handwritten text-8xl text-white/30">{post.category}</span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Share buttons - floating */}
            <div className="hidden lg:block fixed left-8 top-1/2 -translate-y-1/2">
              <AnimatedSection className="flex flex-col gap-3">
                <span className="text-xs text-muted-foreground font-medium mb-2">Share</span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleShare('twitter')}
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                >
                  <Twitter size={18} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleShare('linkedin')}
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                >
                  <Linkedin size={18} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleShare('copy')}
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                >
                  <LinkIcon size={18} />
                </motion.button>
              </AnimatedSection>
            </div>

            {/* Article body */}
            <AnimatedSection>
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                  {post.excerpt}
                </p>
                
                <div className="text-foreground leading-relaxed space-y-6">
                  <p>{post.content}</p>
                  
                  {/* Mock additional content */}
                  <h2 className="font-display text-2xl text-foreground mt-12 mb-4">The Power of Youth</h2>
                  <p className="text-muted-foreground">
                    When young people come together with a shared purpose, extraordinary things happen. 
                    Across India, we're seeing a new generation of civic leaders emerge — students, 
                    professionals, artists, and activists who refuse to accept the status quo.
                  </p>
                  
                  <blockquote className="border-l-4 border-primary pl-6 py-2 my-8 bg-primary/5 rounded-r-2xl">
                    <p className="text-lg font-medium text-foreground italic">
                      "The youth of India are not just the future — they are the present. 
                      Every day, they're proving that change is possible."
                    </p>
                    <cite className="text-muted-foreground">— NYA Core Team</cite>
                  </blockquote>
                  
                  <p className="text-muted-foreground">
                    Our approach is simple: empower individuals with knowledge, connect them with 
                    like-minded changemakers, and provide the tools they need to drive real impact 
                    in their communities.
                  </p>
                  
                  <h2 className="font-display text-2xl text-foreground mt-12 mb-4">What You Can Do</h2>
                  <p className="text-muted-foreground">
                    Whether you're a student looking to make your campus more accountable, a professional 
                    wanting to use your skills for good, or simply someone who believes in a better India — 
                    there's a place for you at NYA.
                  </p>
                  
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 my-6">
                    <li>Join your local chapter or start one in your city</li>
                    <li>Report corruption and malpractice through our secure platform</li>
                    <li>Contribute your skills — design, writing, organizing, tech</li>
                    <li>Spread the word and bring more youth into the movement</li>
                  </ul>
                </div>
              </div>
            </AnimatedSection>

            {/* Mobile share buttons */}
            <div className="lg:hidden mt-12 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">Share this article</p>
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleShare('twitter')}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                >
                  <Twitter size={18} />
                  Twitter
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleShare('linkedin')}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                >
                  <Linkedin size={18} />
                  LinkedIn
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleShare('copy')}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                >
                  <LinkIcon size={18} />
                  Copy
                </motion.button>
              </div>
            </div>

            {/* Author card */}
            <AnimatedSection className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-hero flex items-center justify-center text-white text-2xl font-display font-bold shrink-0">
                  {post.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-primary font-medium mb-1">Written by</p>
                  <h3 className="font-display text-xl text-foreground font-bold mb-2">{post.author}</h3>
                  <p className="text-muted-foreground">
                    A passionate advocate for youth rights and civic engagement. 
                    Contributing to NYA's mission of building a more transparent India.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <AnimatedSection className="mb-10">
            <h2 className="font-display text-2xl text-foreground">More stories you might like</h2>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherPosts.map((relatedPost, index) => (
              <AnimatedSection key={relatedPost.id} delay={index * 0.1}>
                <Link to={`/blog/${relatedPost.id}`}>
                  <motion.article
                    whileHover={{ y: -5 }}
                    className="h-full bg-card rounded-2xl border border-border overflow-hidden group"
                  >
                    <div className="aspect-[16/10] bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <span className="font-handwritten text-4xl text-primary/30">{relatedPost.category.charAt(0)}</span>
                    </div>
                    <div className="p-5">
                      <span className="inline-block px-2 py-0.5 rounded-full bg-muted text-xs font-medium text-muted-foreground mb-2">
                        {relatedPost.category}
                      </span>
                      <h3 className="font-display text-lg text-foreground font-bold group-hover:text-primary transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                    </div>
                  </motion.article>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center mt-12">
            <Link to="/blog">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-full inline-flex items-center gap-2"
              >
                View all articles
                <ArrowRight size={20} />
              </motion.button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPost;