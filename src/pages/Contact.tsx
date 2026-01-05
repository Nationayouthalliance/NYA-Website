import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { AnimatedSection } from '@/components/AnimatedElements';

const ContactPage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted');
    alert('Message sent! We\'ll get back to you soon.');
  };

  return (
    <Layout>
      <section className="pt-32 pb-20 min-h-screen bg-gradient-to-b from-muted to-background">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-handwritten text-3xl text-primary mb-4 block">Say hello!</span>
            <h1 className="font-display text-5xl sm:text-6xl text-foreground mb-6">Contact Us</h1>
            <p className="text-xl text-muted-foreground">Got questions? Ideas? Just want to chat? We'd love to hear from you.</p>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <AnimatedSection direction="left">
              <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-card border border-border">
                <div className="space-y-4">
                  <input type="text" placeholder="Your Name" required className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary outline-none" />
                  <input type="email" placeholder="Your Email" required className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary outline-none" />
                  <input type="text" placeholder="Subject" className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary outline-none" />
                  <textarea placeholder="Your Message" rows={6} required className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary outline-none resize-none" />
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="w-full btn-hero">
                    Send Message <Send size={18} />
                  </motion.button>
                </div>
              </form>
            </AnimatedSection>

            <AnimatedSection direction="right" className="space-y-6">
              <div className="p-6 rounded-2xl bg-card border border-border">
                <Mail className="text-primary mb-3" size={28} />
                <h3 className="font-display text-xl font-bold text-foreground mb-1">Email</h3>
                <p className="text-muted-foreground">hello@nyaindia.org</p>
              </div>
              <div className="p-6 rounded-2xl bg-card border border-border">
                <MapPin className="text-accent mb-3" size={28} />
                <h3 className="font-display text-xl font-bold text-foreground mb-1">Headquarters</h3>
                <p className="text-muted-foreground">Mumbai, Maharashtra, India</p>
              </div>
              <div className="p-6 rounded-2xl bg-gradient-hero text-white">
                <h3 className="font-display text-xl font-bold mb-2">Join our community</h3>
                <p className="text-white/80">Connect with 5000+ youth across India on our community platforms.</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
