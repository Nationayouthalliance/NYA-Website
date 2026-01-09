import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Upload, MapPin, AlertTriangle, Check } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { AnimatedSection } from '@/components/AnimatedElements';

const ReportPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Report submitted');
    setSubmitted(true);
  };

  return (
    <Layout>
      <section className="pt-32 pb-20 min-h-screen bg-gradient-to-b from-muted to-background">
        <div className="container mx-auto px-4">
          <AnimatedSection className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <div className="w-20 h-20 rounded-3xl bg-orange mx-auto mb-6 flex items-center justify-center">
                <Shield size={40} className="text-white" />
              </div>
              <h1 className="font-display text-4xl sm:text-5xl text-foreground mb-4">
                Report an Issue
              </h1>
              <p className="text-xl text-muted-foreground">
                Your identity is protected. Your voice matters. Report corruption or issues you've witnessed.
              </p>
            </div>

            {submitted ? (
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="p-8 rounded-3xl bg-green/10 border border-green text-center">
                <Check size={48} className="text-green mx-auto mb-4" />
                <h2 className="font-display text-2xl font-bold text-foreground mb-2">Report Submitted</h2>
                <p className="text-muted-foreground">Thank you for speaking up. Our team will review your report and take appropriate action.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-card border border-border">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Issue Type</label>
                    <select required className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary outline-none">
                      <option value="">Select type</option>
                      <option>Corruption</option>
                      <option>Misconduct</option>
                      <option>Policy Violation</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                      <input type="text" placeholder="City, State" required className="w-full pl-12 pr-4 py-3 rounded-xl bg-background border border-border focus:border-primary outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                    <textarea placeholder="Describe what happened in detail..." rows={6} required className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary outline-none resize-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Evidence (Optional)</label>
                    <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                      <Upload className="mx-auto mb-2 text-muted-foreground" size={24} />
                      <p className="text-sm text-muted-foreground">Click to upload files</p>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-orange/10 border border-orange/30 flex gap-3">
                    <AlertTriangle className="text-orange shrink-0" size={20} />
                    <p className="text-sm text-muted-foreground">Your identity will be kept confidential. We take all reports seriously.</p>
                  </div>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="w-full btn-hero">
                    Submit Report
                  </motion.button>
                </div>
              </form>
            )}
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

export default ReportPage;
