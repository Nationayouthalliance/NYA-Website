import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { AnimatedSection } from '@/components/AnimatedElements';
import { supabase } from '@/lib/supabase';
import { useState } from 'react';


const ContactPage = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);

  const form = e.currentTarget;
  const formData = new FormData(form);

  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const subject = formData.get('subject') as string;
  const message = formData.get('message') as string;

  const { error } = await supabase.from('contact_messages').insert([
    {
      name,
      email,
      subject,
      message,
      user_agent: navigator.userAgent,
    }
  ]);

  setLoading(false);

  if (error) {
    console.error('Contact form error:', error);
    alert('Something went wrong. Please try again.');
  } else {
    alert('Message sent! We will get back to you soon.');
    form.reset();
  }
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
                  <input name="name" type="text" placeholder="Your Name" required className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary outline-none" />
                  <input name="email" type="email" placeholder="Your Email" required className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary outline-none" />
                  <input name="subject" type="text" placeholder="Subject" className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary outline-none" />
                  <textarea name="message" placeholder="Your Message" rows={6} required className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary outline-none resize-none" />
                  <motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  type="submit"
  disabled={loading}
  className="w-full btn-hero disabled:opacity-60 disabled:cursor-not-allowed"
>
  {loading ? 'Sending...' : <>Send Message <Send size={18} /></>}
</motion.button>

                </div>
              </form>
            </AnimatedSection>

            <AnimatedSection direction="right" className="space-y-6">
              <div className="p-6 rounded-2xl bg-card border border-border">
                <Mail className="text-primary mb-3" size={28} />
                <h3 className="font-display text-xl font-bold text-foreground mb-1">Email</h3>
                <p className="text-muted-foreground">support@nyagenz.in</p>
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
