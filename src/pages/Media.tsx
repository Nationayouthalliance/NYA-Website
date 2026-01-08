import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, ExternalLink, Headphones, Calendar, Image as ImageIcon, Video, Newspaper, Mic } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { AnimatedSection, StaggerContainer, StaggerItem, HoverScale } from '@/components/AnimatedElements';
import mediaData from '@/data/media.json';

const categories = ['All', 'Photos', 'Videos', 'Press', 'Podcasts'];

const Media = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Photos': return ImageIcon;
      case 'Videos': return Video;
      case 'Press': return Newspaper;
      case 'Podcasts': return Mic;
      default: return ImageIcon;
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-purple/10 to-background relative overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-purple/20 blur-3xl" />
        <div className="absolute bottom-0 left-10 w-48 h-48 rounded-full bg-accent/20 blur-3xl" />
        
        <div className="container mx-auto px-4 relative">
          <AnimatedSection className="text-center max-w-4xl mx-auto">
            <span className="inline-block px-4 py-2 rounded-full bg-purple/20 text-purple text-sm font-medium mb-6 border border-purple/30">
              📸 Media Gallery
            </span>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-foreground mb-6">
              Stories in{' '}
              <span className="text-gradient bg-gradient-to-r from-purple to-accent">motion</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our journey through photos, videos, press coverage, and podcasts. 
              Every frame tells a story of youth power in action.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b border-border sticky top-20 bg-background/95 backdrop-blur-xl z-30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => {
              const Icon = getCategoryIcon(category);
              return (
                <motion.button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 transition-all ${
                    activeCategory === category
                      ? 'bg-purple text-white shadow-lg'
                      : 'bg-muted text-muted-foreground hover:bg-purple/10'
                  }`}
                >
                  <Icon size={16} />
                  {category}
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Photo Gallery - Masonry */}
      {(activeCategory === 'All' || activeCategory === 'Photos') && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <AnimatedSection className="mb-12">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-purple/20 flex items-center justify-center">
                  <ImageIcon className="text-purple" size={20} />
                </div>
                <h2 className="font-display text-3xl text-foreground">Photo Gallery</h2>
              </div>
              <p className="text-muted-foreground">Moments captured from events, rallies, and community gatherings</p>
            </AnimatedSection>

            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
              {mediaData.photos.map((photo, index) => {
                const heights = ['h-64', 'h-80', 'h-72', 'h-96', 'h-56'];
                const randomHeight = heights[index % heights.length];
                
                return (
                  <motion.div
                    key={photo.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="break-inside-avoid"
                  >
                    <div
                      onClick={() => setLightboxImage(photo.url)}
                      className={`relative ${randomHeight} rounded-2xl overflow-hidden cursor-pointer group bg-muted`}
                    >
                      <img
                        src={photo.url}
                        alt={photo.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* Black transparent overlay on hover, faded to top */}
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <span className="inline-block px-3 py-1 rounded-full bg-purple text-white text-xs font-medium mb-2">
                          {photo.category}
                        </span>
                        <p className="text-black font-medium">{photo.title}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Videos Section */}
      {(activeCategory === 'All' || activeCategory === 'Videos') && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <AnimatedSection className="mb-12">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Video className="text-primary" size={20} />
                </div>
                <h2 className="font-display text-3xl text-foreground">Videos</h2>
              </div>
              <p className="text-muted-foreground">Watch our documentaries, event highlights, and impact stories</p>
            </AnimatedSection>

            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mediaData.videos.map((video) => (
                <StaggerItem key={video.id}>
                  <HoverScale>
                    <div className="bg-card rounded-3xl overflow-hidden border border-border shadow-sm">
                      <div 
                        className="relative aspect-video bg-muted cursor-pointer group"
                        onClick={() => setActiveVideo(video.embedUrl)}
                      >
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-foreground/30 group-hover:bg-foreground/40 transition-colors flex items-center justify-center">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-xl"
                          >
                            <Play className="text-white ml-1" size={28} fill="white" />
                          </motion.div>
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="font-display text-xl text-foreground font-bold">
                          {video.title}
                        </h3>
                      </div>
                    </div>
                  </HoverScale>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* Press Releases */}
      {(activeCategory === 'All' || activeCategory === 'Press') && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <AnimatedSection className="mb-12">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-orange/20 flex items-center justify-center">
                  <Newspaper className="text-orange" size={20} />
                </div>
                <h2 className="font-display text-3xl text-foreground">Press & News</h2>
              </div>
              <p className="text-muted-foreground">Official announcements and media coverage</p>
            </AnimatedSection>

            <StaggerContainer className="grid gap-4 max-w-4xl">
              {mediaData.pressReleases.map((press) => (
                <StaggerItem key={press.id}>
                  <HoverScale>
                    <div className="p-6 rounded-2xl bg-card border border-border hover:border-orange/50 transition-colors group cursor-pointer">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            <Calendar size={14} />
                            {new Date(press.date).toLocaleDateString('en-IN', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </div>
                          <h3 className="font-display text-xl text-foreground font-bold mb-2 group-hover:text-orange transition-colors">
                            {press.title}
                          </h3>
                          <p className="text-muted-foreground">{press.summary}</p>
                        </div>
                        <div className="shrink-0">
                          <div className="w-10 h-10 rounded-full bg-orange/10 flex items-center justify-center group-hover:bg-orange group-hover:text-white transition-colors">
                            <ExternalLink size={18} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </HoverScale>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* Podcasts */}
      {(activeCategory === 'All' || activeCategory === 'Podcasts') && (
        <section className="py-16 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-4">
            <AnimatedSection className="mb-12">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                  <Mic className="text-accent" size={20} />
                </div>
                <h2 className="font-display text-3xl text-foreground">Podcasts</h2>
              </div>
              <p className="text-muted-foreground">Listen to conversations about youth activism and civic engagement</p>
            </AnimatedSection>

            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mediaData.podcasts.map((podcast) => (
                <StaggerItem key={podcast.id}>
                  <HoverScale>
                    <div className="p-6 rounded-3xl bg-gradient-to-br from-accent/10 to-purple/10 border border-accent/20 hover:border-accent/50 transition-colors group cursor-pointer">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-accent to-purple flex items-center justify-center mb-4 shadow-lg">
                        <Headphones className="text-white" size={28} />
                      </div>
                      <h3 className="font-display text-xl text-foreground font-bold mb-3">
                        {podcast.title}
                      </h3>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {new Date(podcast.date).toLocaleDateString('en-IN', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-accent/20 text-accent font-medium">
                          {podcast.duration}
                        </span>
                      </div>
                    </div>
                  </HoverScale>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-50 bg-foreground/95 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <X size={24} />
            </motion.button>
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={lightboxImage}
              alt="Gallery image"
              className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveVideo(null)}
            className="fixed inset-0 z-50 bg-foreground/95 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <X size={24} />
            </motion.button>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={activeVideo}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Media;