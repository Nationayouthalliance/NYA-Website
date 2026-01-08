import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, MapPin, GraduationCap, Rocket, ArrowRight, Check, AlertCircle } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { AnimatedSection, StaggerContainer, StaggerItem, HoverScale } from '@/components/AnimatedElements';

// Only these three options - Join NYA is on a separate page
const joinOptions = [
  {
    id: 'team',
    icon: Rocket,
    title: 'Join Team',
    description: 'Work on national initiatives and lead from the front.',
    color: 'bg-orange',
    benefits: ['Leadership role', 'National impact', 'Skill development'],
  },
  {
    id: 'chapter',
    icon: MapPin,
    title: 'Start Chapter',
    description: 'Launch NYA in your city and lead local change.',
    color: 'bg-accent',
    benefits: ['Full autonomy', 'Resources & support', 'Build your team'],
  },
  {
    id: 'ambassador',
    icon: GraduationCap,
    title: ' Ambassador',
    description: 'Represent NYA at your School, college or Oraganization.',
    color: 'bg-purple',
    benefits: ['Campus leadership', 'Exclusive perks', 'Network access'],
  },
];

const JoinPage = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted for:', selectedOption);
    alert('Application submitted! We\'ll get back to you soon.');
  };

  return (
    <Layout>
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-handwritten text-4xl text-primary mb-4 block">Welcome aboard!</span>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-foreground mb-6">
              Apply to NYA
            </h1>
            <p className="text-xl text-muted-foreground">
              Choose how you want to contribute. Every role matters.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid sm:grid-cols-3 gap-6 mb-16">
            {joinOptions.map((option) => (
              <StaggerItem key={option.id}>
                <HoverScale>
                  <motion.div
                    onClick={() => setSelectedOption(option.id)}
                    className={`cursor-pointer p-6 rounded-3xl border-2 transition-all h-full ${
                      selectedOption === option.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border bg-card hover:border-primary/50'
                    }`}
                  >
                    <div className={`w-14 h-14 rounded-2xl ${option.color} flex items-center justify-center mb-4`}>
                      <option.icon size={28} className="text-white" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-2">{option.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{option.description}</p>
                    <ul className="space-y-2">
                      {option.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check size={14} className="text-primary" /> {benefit}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </HoverScale>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {selectedOption && (
            <AnimatedSection className="max-w-xl mx-auto">
              <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-card border border-border">
                {/* Warning Component */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-2xl bg-primary/10 border border-primary/30 flex items-start gap-3"
                >
                  <AlertCircle className="text-primary shrink-0 mt-0.5" size={20} />
                  <p className="text-sm text-foreground font-medium">
                    Make sure you have already joined NYA as a Member on all platforms before applying here.
                  </p>
                </motion.div>

                <h3 className="font-display text-2xl font-bold text-foreground mb-6">
                  Apply for {joinOptions.find(o => o.id === selectedOption)?.title}
                </h3>
                <div className="space-y-4">
                  <input type="text" placeholder="Full Name" required className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary outline-none" />
                  <input type="text" placeholder="Discord Username" required className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary outline-none" />
                  <input type="text" placeholder="Instagram Username" required className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary outline-none" />
                  <input type="email" placeholder="Email" required className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary outline-none" />
                  <input type="text" placeholder="City" required className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary outline-none" />
                  <textarea placeholder="Why do you want to join?" rows={4} className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary outline-none resize-none" />
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="w-full btn-hero">
                    Submit Application <ArrowRight size={20} />
                  </motion.button>
                </div>
              </form>
            </AnimatedSection>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default JoinPage;
