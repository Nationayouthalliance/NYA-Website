import { useState, useEffect } from 'react';
import { motion, Reorder, useDragControls } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit2, Trash2, Save, X, GripVertical } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

interface TimelineItem {
  id: string;
  year: string;
  title: string;
  description: string;
  order_index: number;
}

const JourneyManager = () => {
  const [items, setItems] = useState<TimelineItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ year: '', title: '', description: '' });
  const { toast } = useToast();
  const dragControls = useDragControls();

  // ================= FETCH =================
  useEffect(() => {
    const fetchTimeline = async () => {
      const { data, error } = await supabase
        .from('journey_timeline')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) {
        console.error('Failed to fetch timeline:', error);
        toast({ title: 'Failed to load timeline', variant: 'destructive' });
        return;
      }

      setItems(data || []);
    };

    fetchTimeline();
  }, []);

  // ================= ADD =================
  const handleAdd = async () => {
    if (!formData.year || !formData.title || !formData.description) {
      toast({ title: 'Please fill all fields', variant: 'destructive' });
      return;
    }

    const { data, error } = await supabase
      .from('journey_timeline')
      .insert({
        year: formData.year,
        title: formData.title,
        description: formData.description,
        order_index: items.length + 1,
      })
      .select()
      .single();

    if (error) {
      console.error('Insert failed:', error);
      toast({ title: 'Add failed', description: error.message, variant: 'destructive' });
      return;
    }

    setItems(prev => [...prev, data]);
    setFormData({ year: '', title: '', description: '' });
    setIsAdding(false);

    toast({ title: 'Timeline entry added 🎉' });
  };

  // ================= EDIT =================
  const handleEdit = (item: TimelineItem) => {
    setEditingId(item.id);
    setFormData({
      year: item.year,
      title: item.title,
      description: item.description,
    });
  };

  const handleUpdate = async () => {
    if (!editingId) return;

    const { error } = await supabase
      .from('journey_timeline')
      .update({
        year: formData.year,
        title: formData.title,
        description: formData.description,
      })
      .eq('id', editingId);

    if (error) {
      console.error('Update failed:', error);
      toast({ title: 'Update failed', description: error.message, variant: 'destructive' });
      return;
    }

    setItems(prev =>
      prev.map(item =>
        item.id === editingId ? { ...item, ...formData } : item
      )
    );

    setEditingId(null);
    setFormData({ year: '', title: '', description: '' });

    toast({ title: 'Timeline entry updated ✨' });
  };

  // ================= DELETE =================
  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('journey_timeline')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Delete failed:', error);
      toast({ title: 'Delete failed', description: error.message, variant: 'destructive' });
      return;
    }

    const remaining = items.filter(item => item.id !== id);
    const reordered = remaining.map((item, index) => ({
      ...item,
      order_index: index + 1,
    }));

    setItems(reordered);

    // update order_index safely
    for (const row of reordered) {
      await supabase
        .from('journey_timeline')
        .update({ order_index: row.order_index })
        .eq('id', row.id);
    }

    toast({ title: 'Timeline entry deleted 🗑️' });
  };

  // ================= REORDER =================
  const handleReorder = async (newOrder: TimelineItem[]) => {
    setItems(newOrder);

    for (let i = 0; i < newOrder.length; i++) {
      const item = newOrder[i];

      const { error } = await supabase
        .from('journey_timeline')
        .update({ order_index: i + 1 })
        .eq('id', item.id);

      if (error) {
        console.error('Order save failed:', error);
        toast({ title: 'Order save failed', description: error.message, variant: 'destructive' });
        return;
      }
    }
  };

  // ================= UI =================
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="font-display text-3xl font-bold">Journey Manager</h1>
          <p className="text-muted-foreground mt-1">
            Manage the About page timeline. Drag to reorder entries.
          </p>
        </div>
        <Button
          onClick={() => setIsAdding(true)}
          className="rounded-full bg-gradient-hero text-white"
        >
          <Plus size={18} />
          Add Entry
        </Button>
      </motion.div>

      {/* ADD FORM */}
      {isAdding && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl border-2 border-primary p-6"
        >
          <h3 className="font-display text-lg font-bold mb-4">Add New Entry</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Month + Year (e.g., Jan 2024)"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              className="rounded-xl"
            />
            <Input
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="rounded-xl"
            />
          </div>
          <Textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="mt-4 rounded-xl"
            rows={3}
          />
          <div className="flex gap-2 mt-4">
            <Button onClick={handleAdd} className="rounded-full">
              <Plus size={16} /> Add
            </Button>
            <Button onClick={() => setIsAdding(false)} variant="outline" className="rounded-full">
              <X size={16} /> Cancel
            </Button>
          </div>
        </motion.div>
      )}

      {/* TIMELINE */}
      <Reorder.Group
        axis="y"
        values={items}
        onReorder={handleReorder}
        className="space-y-3"
      >
        {items.map((item, index) => (
          <Reorder.Item
            key={item.id}
            value={item}
            dragListener={false}
            dragControls={dragControls}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-card rounded-2xl border border-border p-4 hover:border-primary/30 transition-all"
            >
              {editingId === item.id ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Input
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      className="rounded-xl"
                    />
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="rounded-xl"
                    />
                  </div>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="rounded-xl"
                    rows={2}
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleUpdate} size="sm" className="rounded-full">
                      <Save size={14} /> Save
                    </Button>
                    <Button onClick={() => setEditingId(null)} size="sm" variant="outline" className="rounded-full">
                      <X size={14} /> Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-4">
                  <div
                    className="text-muted-foreground cursor-grab"
                    onPointerDown={(e) => dragControls.start(e)}
                  >
                    <GripVertical size={20} />
                  </div>
                  <div className="w-16 h-16 rounded-xl bg-gradient-hero text-white flex items-center justify-center font-display font-bold text-lg">
                    {item.year}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-bold text-lg">{item.title}</h3>
                    <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => handleEdit(item)} size="icon" variant="ghost" className="rounded-xl">
                      <Edit2 size={16} />
                    </Button>
                    <Button onClick={() => handleDelete(item.id)} size="icon" variant="ghost" className="rounded-xl text-destructive">
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
};

export default JourneyManager;
