import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, MapPin, AlertTriangle, Check } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { AnimatedSection } from '@/components/AnimatedElements';
import { supabase } from '@/lib/supabase';

const ReportPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const type = formData.get('type') as string;
    const location = formData.get('location') as string;
    const description = formData.get('description') as string;
    const evidenceLink = formData.get('evidence_link') as string;

    setLoading(true);

    const { error } = await supabase.from('reports').insert({
      type,
      location,
      description,
      evidence_link: evidenceLink || null,
      status: 'new',
      date: new Date().toISOString(),
    });

    setLoading(false);

    if (error) {
      console.error('Report error:', error);
      alert('Failed to submit report. Please try again.');
    } else {
      setSubmitted(true);
      form.reset();
    }
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
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="p-8 rounded-3xl bg-green/10 border border-green text-center"
              >
                <Check size={48} className="text-green mx-auto mb-4" />
                <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                  Report Submitted
                </h2>
                <p className="text-muted-foreground">
                  Thank you for speaking up. Our team will review your report and take appropriate action.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-card border border-border">
                <div className="space-y-6">

                  {/* Issue Type */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Issue Type</label>
                    <select
                      name="type"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary outline-none"
                    >
                      <option value="">Select type</option>
                      <option>Corruption</option>
                      <option>Misconduct</option>
                      <option>Policy Violation</option>
                      <option>Other</option>
                    </select>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                      <input
                        name="location"
                        type="text"
                        placeholder="City, State"
                        required
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-background border border-border focus:border-primary outline-none"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                    <textarea
                      name="description"
                      placeholder="Describe what happened in detail..."
                      rows={6}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary outline-none resize-none"
                    />
                  </div>

                  {/* Evidence Link */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Evidence Link (Optional)
                    </label>
                    <input
                      name="evidence_link"
                      type="url"
                      placeholder="Paste Google Drive / Dropbox / Image link"
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary outline-none"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Upload your evidence anywhere and paste the link here.
                    </p>
                  </div>

                  {/* Warning */}
                  <div className="p-4 rounded-xl bg-orange/10 border border-orange/30 flex gap-3">
                    <AlertTriangle className="text-orange shrink-0" size={20} />
                    <p className="text-sm text-muted-foreground">
                      Your identity will be kept confidential. We take all reports seriously.
                    </p>
                  </div>

                  {/* Submit */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="w-full btn-hero disabled:opacity-60"
                  >
                    {loading ? 'Submitting...' : 'Submit Report'}
                  </motion.button>

                </div>
              </form>
            )}
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default ReportPage;
