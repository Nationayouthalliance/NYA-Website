import { useState } from 'react';
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
import chaptersData from '@/data/chapters.json';

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

const capitalizeStatus = (s: string): 'Active' | 'Growing' | 'Starting' => {
  const map: Record<string, 'Active' | 'Growing' | 'Starting'> = {
    'active': 'Active',
    'growing': 'Growing', 
    'starting': 'Starting'
  };
  return map[s.toLowerCase()] || 'Starting';
};

const ChaptersManager = () => {
  const [chapters, setChapters] = useState<Chapter[]>(
    chaptersData.map((c, i) => ({
      id: c.id || `c-${i}`,
      city: c.city,
      state: c.state,
      status: capitalizeStatus(c.status),
      members: c.members,
      founded: c.founded,
      lead: c.lead || 'TBD',
    }))
  );
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<{
    city: string; state: string; status: 'Active' | 'Growing' | 'Starting'; members: number; founded: string; lead: string;
  }>({
    city: '', state: '', status: 'Starting', members: 0, founded: '', lead: ''
  });
  const { toast } = useToast();

  const filteredChapters = chapters.filter(c => {
    const matchesSearch = c.city.toLowerCase().includes(search.toLowerCase()) ||
      c.state.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === 'all' || c.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleAdd = () => {
    if (!formData.city || !formData.state) {
      toast({ title: "City and state are required", variant: "destructive" });
      return;
    }
    const newChapter: Chapter = {
      id: `c-${Date.now()}`,
      ...formData,
    };
    setChapters([...chapters, newChapter]);
    setFormData({ city: '', state: '', status: 'Starting', members: 0, founded: '', lead: '' });
    setIsAdding(false);
    console.log('Added chapter:', newChapter);
    toast({ title: "Chapter added! 🎉" });
  };

  const handleEdit = (chapter: Chapter) => {
    setEditingId(chapter.id);
    setFormData({
      city: chapter.city,
      state: chapter.state,
      status: chapter.status,
      members: chapter.members,
      founded: chapter.founded,
      lead: chapter.lead,
    });
  };

  const handleUpdate = () => {
    setChapters(chapters.map(c => 
      c.id === editingId ? { ...c, ...formData } : c
    ));
    setEditingId(null);
    setFormData({ city: '', state: '', status: 'Starting', members: 0, founded: '', lead: '' });
    console.log('Updated chapter:', editingId);
    toast({ title: "Chapter updated! ✨" });
  };

  const handleDelete = (id: string) => {
    setChapters(chapters.filter(c => c.id !== id));
    console.log('Deleted chapter:', id);
    toast({ title: "Chapter removed" });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green text-white';
      case 'Growing': return 'bg-orange text-white';
      case 'Starting': return 'bg-yellow text-yellow-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
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
          onClick={() => setIsAdding(true)}
          className="rounded-full bg-gradient-hero text-white"
        >
          <Plus size={18} />
          Add Chapter
        </Button>
      </motion.div>

      {/* Filters */}
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

      {/* Add/Edit Form */}
      <AnimatePresence>
        {(isAdding || editingId) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-card rounded-2xl border-2 border-primary p-6"
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
                onValueChange={(v) => setFormData({ ...formData, status: v as typeof formData.status })}
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
                onChange={(e) => setFormData({ ...formData, members: parseInt(e.target.value) || 0 })}
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
              <Button onClick={isAdding ? handleAdd : handleUpdate} className="rounded-full">
                {isAdding ? <Plus size={16} /> : <Save size={16} />}
                {isAdding ? 'Add' : 'Save'}
              </Button>
              <Button 
                onClick={() => { setIsAdding(false); setEditingId(null); }} 
                variant="outline" 
                className="rounded-full"
              >
                <X size={16} /> Cancel
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chapters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredChapters.map((chapter, index) => (
          <motion.div
            key={chapter.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
            className="bg-card rounded-2xl border border-border p-5 hover:border-primary/30 transition-all group"
          >
            <div className="flex items-start justify-between mb-3">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(chapter.status)}`}>
                {chapter.status}
              </span>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button onClick={() => handleEdit(chapter)} size="icon" variant="ghost" className="h-8 w-8 rounded-lg">
                  <Edit2 size={14} />
                </Button>
                <Button onClick={() => handleDelete(chapter.id)} size="icon" variant="ghost" className="h-8 w-8 rounded-lg text-destructive">
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
              Lead: {chapter.lead} · Founded: {chapter.founded}
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
