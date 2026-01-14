import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Plus, Edit2, Trash2, Save, X, Search, MapPin, Users as UsersIcon
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

interface Chapter {
  id: string;
  city: string;
  state: string;
  status: 'Active' | 'Growing' | 'Starting';
  members: number;
  founded: string;
  lead: string;
}

const statuses = ['Active', 'Growing', 'Starting'] as const;

/* ===================== STATUS MAPPERS ===================== */
const mapStatusToDb = (status: Chapter['status']) => {
  switch (status) {
    case 'Active': return 'active';
    case 'Growing': return 'growing';
    case 'Starting': return 'starting';
    default: return 'starting';
  }
};

const mapStatusFromDb = (status: string): Chapter['status'] => {
  switch (status) {
    case 'active': return 'Active';
    case 'growing': return 'Growing';
    case 'starting': return 'Starting';
    default: return 'Starting';
  }
};
/* ========================================================== */

const ChaptersManager = () => {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Chapter>({
    id: '',
    city: '',
    state: '',
    status: 'Starting',
    members: 0,
    founded: '',
    lead: '',
  });

  const { toast } = useToast();

  // ================= FETCH =================
  useEffect(() => {
    const fetchChapters = async () => {
      const { data, error } = await supabase
        .from('chapters')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Fetch failed:', error);
        toast({ title: 'Failed to load chapters', variant: 'destructive' });
        return;
      }

      const mapped: Chapter[] = (data || []).map((c: any) => ({
        id: c.id,
        city: c.city,
        state: c.state,
        status: mapStatusFromDb(c.status),
        members: c.members,
        founded: c.founded,
        lead: c.lead,
      }));

      setChapters(mapped);
    };

    fetchChapters();
  }, []);

  // ================= FILTER =================
  const filteredChapters = chapters.filter(c => {
    const matchesSearch =
      c.city.toLowerCase().includes(search.toLowerCase()) ||
      c.state.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = filterStatus === 'all' || c.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // ================= ADD =================
  const handleAdd = async () => {
    if (!formData.city || !formData.state) {
      toast({ title: "City and state are required", variant: "destructive" });
      return;
    }

    const payload = {
      city: formData.city,
      state: formData.state,
      status: mapStatusToDb(formData.status),
      members: formData.members,
      founded: formData.founded,
      lead: formData.lead,
    };

    const { data, error } = await supabase
      .from('chapters')
      .insert(payload)
      .select()
      .single();

    if (error) {
      console.error('Add failed:', error);
      toast({ title: 'Add failed', description: error.message, variant: 'destructive' });
      return;
    }

    const newChapter: Chapter = {
      id: data.id,
      city: data.city,
      state: data.state,
      status: mapStatusFromDb(data.status),
      members: data.members,
      founded: data.founded,
      lead: data.lead,
    };

    setChapters(prev => [newChapter, ...prev]);
    closeForm();
    toast({ title: "Chapter added! 🎉" });
  };

  // ================= EDIT =================
  const handleEdit = (chapter: Chapter) => {
    setEditingId(chapter.id);
    setIsAdding(false);
    setFormData({ ...chapter });
  };

  const handleUpdate = async () => {
    if (!editingId) return;

    const payload = {
      city: formData.city,
      state: formData.state,
      status: mapStatusToDb(formData.status),
      members: formData.members,
      founded: formData.founded,
      lead: formData.lead,
    };

    const { error } = await supabase
      .from('chapters')
      .update(payload)
      .eq('id', editingId);

    if (error) {
      console.error('Update failed:', error);
      toast({ title: 'Update failed', description: error.message, variant: 'destructive' });
      return;
    }

    setChapters(prev =>
      prev.map(c =>
        c.id === editingId ? { ...c, ...formData } : c
      )
    );

    closeForm();
    toast({ title: "Chapter updated! ✨" });
  };

  // ================= DELETE =================
  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('chapters')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Delete failed:', error);
      toast({ title: 'Delete failed', description: error.message, variant: 'destructive' });
      return;
    }

    setChapters(prev => prev.filter(c => c.id !== id));
    toast({ title: "Chapter removed 🗑️" });
  };

  const closeForm = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({
      id: '',
      city: '',
      state: '',
      status: 'Starting',
      members: 0,
      founded: '',
      lead: '',
    });
  };

  const getStatusColor = (status: Chapter['status']) => {
    switch (status) {
      case 'Active': return 'bg-green text-white';
      case 'Growing': return 'bg-orange text-white';
      case 'Starting': return 'bg-yellow text-yellow-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  // ================= UI =================
  return (
    <div className="space-y-6 relative pointer-events-auto">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="font-display text-3xl font-bold">Chapters Manager</h1>
          <p className="text-muted-foreground mt-1">
            Manage chapters across India
          </p>
        </div>
        <Button
          type="button"
          onClick={() => { setIsAdding(true); setEditingId(null); }}
          className="rounded-full bg-gradient-hero text-white"
        >
          <Plus size={18} />
          Add Chapter
        </Button>
      </motion.div>

      {/* FILTERS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col md:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            placeholder="Search by city or state..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-12 h-12 rounded-xl"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full md:w-48 h-12 rounded-xl">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            {statuses.map(status => (
              <SelectItem key={status} value={status}>{status}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>

      {/* ADD / EDIT FORM */}
      <AnimatePresence>
        {(isAdding || editingId) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-card rounded-2xl border-2 border-primary p-6 relative z-50 pointer-events-auto"
          >
            <h3 className="font-display text-lg font-bold mb-4">
              {isAdding ? 'Add New Chapter' : 'Edit Chapter'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Input
                placeholder="City"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="rounded-xl"
              />
              <Input
                placeholder="State"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="rounded-xl"
              />
              <Select 
                value={formData.status} 
                onValueChange={(v) => setFormData({ ...formData, status: v as Chapter['status'] })}
              >
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map(status => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="number"
                placeholder="Members count"
                value={formData.members}
                onChange={(e) => setFormData({ ...formData, members: Number(e.target.value) || 0 })}
                className="rounded-xl"
              />
              <Input
                placeholder="Founded (e.g., Jan 2024)"
                value={formData.founded}
                onChange={(e) => setFormData({ ...formData, founded: e.target.value })}
                className="rounded-xl"
              />
              <Input
                placeholder="Chapter Lead"
                value={formData.lead}
                onChange={(e) => setFormData({ ...formData, lead: e.target.value })}
                className="rounded-xl"
              />
            </div>

            <div className="flex gap-2 mt-4">
              <Button type="button" onClick={isAdding ? handleAdd : handleUpdate} className="rounded-full">
                {isAdding ? <Plus size={16} /> : <Save size={16} />}
                {isAdding ? 'Add' : 'Save'}
              </Button>
              <Button type="button" onClick={closeForm} variant="outline" className="rounded-full">
                <X size={16} /> Cancel
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10 pointer-events-auto">
        {filteredChapters.map((chapter, index) => (
          <motion.div
            key={chapter.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
            className="bg-card rounded-2xl border border-border p-5 hover:border-primary/30 transition-all group relative z-10 pointer-events-auto"
          >
            <div className="flex items-start justify-between mb-3">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(chapter.status)}`}>
                {chapter.status}
              </span>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  type="button"
                  onClick={() => handleEdit(chapter)}
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 rounded-lg"
                >
                  <Edit2 size={14} />
                </Button>
                <Button
                  type="button"
                  onClick={() => handleDelete(chapter.id)}
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 rounded-lg text-destructive"
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>

            <h3 className="font-display font-bold text-xl flex items-center gap-2">
              <MapPin size={18} className="text-primary" />
              {chapter.city}
            </h3>
            <p className="text-muted-foreground text-sm">{chapter.state}</p>

            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border text-sm">
              <div className="flex items-center gap-1">
                <UsersIcon size={14} className="text-muted-foreground" />
                <span className="font-semibold">{chapter.members}</span>
                <span className="text-muted-foreground">members</span>
              </div>
            </div>

            <div className="mt-2 text-xs text-muted-foreground">
              Lead: {chapter.lead || 'TBD'} · Founded: {chapter.founded || '—'}
            </div>
          </motion.div>
        ))}
      </div>

      {filteredChapters.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <MapPin size={48} className="mx-auto mb-4 opacity-50" />
          <p>No chapters found</p>
        </div>
      )}
    </div>
  );
};

export default ChaptersManager;
