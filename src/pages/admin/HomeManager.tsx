import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Save, Loader2, TrendingUp, Users, MapPin, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

const HOME_STATS_ID = '00000000-0000-0000-0000-000000000001';

const HomeManager = () => {
  const [stats, setStats] = useState({
    activeMembers: 0,
    chapters: 0,
    statesCovered: 0,
    issuesResolved: 0,
  });

  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  // 🔹 FETCH STATS
  useEffect(() => {
    const fetchStats = async () => {
      const { data, error } = await supabase
        .from('home_stats')
        .select('*')
        .eq('id', HOME_STATS_ID)
        .single();

      if (error) {
        console.error('Failed to fetch home stats:', error);
        return;
      }

      setStats({
        activeMembers: data.active_members,
        chapters: data.chapters,
        statesCovered: data.states_covered,
        issuesResolved: data.issues_resolved,
      });
    };

    fetchStats();
  }, []);

  // 🔹 SAVE STATS
  const handleSave = async () => {
    setSaving(true);

    const { error } = await supabase
      .from('home_stats')
      .update({
        active_members: stats.activeMembers,
        chapters: stats.chapters,
        states_covered: stats.statesCovered,
        issues_resolved: stats.issuesResolved,
        updated_at: new Date().toISOString(),
      })
      .eq('id', HOME_STATS_ID);

    setSaving(false);

    if (error) {
      console.error('Failed to update stats:', error);
      toast({
        title: 'Update failed ❌',
        description: error.message,
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Stats Updated! 🎉',
      description: 'Homepage counters have been updated successfully.',
    });
  };

  const statFields = [
    { key: 'activeMembers', label: 'Active Members', icon: Users, color: 'bg-primary' },
    { key: 'chapters', label: 'Chapters', icon: MapPin, color: 'bg-orange' },
    { key: 'statesCovered', label: 'States Covered', icon: TrendingUp, color: 'bg-teal' },
    { key: 'issuesResolved', label: 'Issues Resolved', icon: CheckCircle, color: 'bg-green' },
  ];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-3xl font-bold">Home Manager</h1>
        <p className="text-muted-foreground mt-1">
          Update the statistics displayed on the homepage
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-2xl border border-border p-6"
      >
        <h2 className="font-display text-xl font-bold mb-6">Homepage Statistics</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {statFields.map(({ key, label, icon: Icon, color }, index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <span className={`w-8 h-8 ${color} text-white rounded-lg flex items-center justify-center`}>
                  <Icon size={16} />
                </span>
                {label}
              </label>
              <Input
                type="number"
                value={stats[key as keyof typeof stats]}
                onChange={(e) =>
                  setStats({ ...stats, [key]: parseInt(e.target.value) || 0 })
                }
                className="h-12 rounded-xl text-lg font-semibold"
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-end mt-8"
        >
          <Button
            onClick={handleSave}
            disabled={saving}
            className="rounded-full bg-gradient-hero text-white px-8"
          >
            {saving ? <Loader2 className="animate-spin" size={18} /> : (
              <>
                <Save size={18} />
                Save Changes
              </>
            )}
          </Button>
        </motion.div>
      </motion.div>

      {/* Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-hero rounded-2xl p-6 text-white"
      >
        <h3 className="font-display text-lg font-bold mb-4">Live Preview</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statFields.map(({ key, label }) => (
            <div key={key} className="text-center">
              <div className="text-3xl font-display font-bold">
                {stats[key as keyof typeof stats].toLocaleString()}+
              </div>
              <div className="text-sm text-white/70">{label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default HomeManager;
