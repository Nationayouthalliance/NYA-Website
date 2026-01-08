import { useState } from 'react';
import { motion, Reorder } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Plus, Edit2, Trash2, Save, X, GripVertical, Loader2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import journeyData from '@/data/journey.json';

interface TimelineItem {
  id: string;
  year: string;
  title: string;
  description: string;
  order: number;
}

const JourneyManager = () => {
  const [items, setItems] = useState<TimelineItem[]>(journeyData.timeline);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({ year: '', title: '', description: '' });
  const { toast } = useToast();

  const handleAdd = () => {
    if (!formData.year || !formData.title || !formData.description) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }
    const newItem: TimelineItem = {
      id: `j-${Date.now()}`,
      ...formData,
      order: items.length + 1,
    };
    setItems([...items, newItem]);
    setFormData({ year: '', title: '', description: '' });
    setIsAdding(false);
    console.log('Added journey item:', newItem);
    toast({ title: "Timeline entry added! 🎉" });
  };

  const handleEdit = (item: TimelineItem) => {
    setEditingId(item.id);
    setFormData({ year: item.year, title: item.title, description: item.description });
  };

  const handleUpdate = () => {
    setItems(items.map(item => 
      item.id === editingId 
        ? { ...item, ...formData } 
        : item
    ));
    setEditingId(null);
    setFormData({ year: '', title: '', description: '' });
    console.log('Updated journey item:', editingId);
    toast({ title: "Timeline entry updated! ✨" });
  };

  const handleDelete = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    console.log('Deleted journey item:', id);
    toast({ title: "Timeline entry deleted" });
  };

  const handleReorder = (newOrder: TimelineItem[]) => {
    setItems(newOrder.map((item, index) => ({ ...item, order: index + 1 })));
  };

  const handleSaveOrder = async () => {
    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Saved journey order:', items);
    setSaving(false);
    toast({ title: "Order saved! 🎯" });
  };

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
        <div className="flex gap-2">
          <Button
            onClick={() => setIsAdding(true)}
            className="rounded-full bg-gradient-hero text-white"
          >
            <Plus size={18} />
            Add Entry
          </Button>
          <Button
            onClick={handleSaveOrder}
            disabled={saving}
            variant="outline"
            className="rounded-full"
          >
            {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
            Save Order
          </Button>
        </div>
      </motion.div>

      {/* Add Form */}
      {isAdding && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl border-2 border-primary p-6"
        >
          <h3 className="font-display text-lg font-bold mb-4">Add New Entry</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Year (e.g., 2024)"
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

      {/* Timeline List */}
      <Reorder.Group axis="y" values={items} onReorder={handleReorder} className="space-y-3">
        {items.sort((a, b) => a.order - b.order).map((item, index) => (
          <Reorder.Item key={item.id} value={item}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-card rounded-2xl border border-border p-4 hover:border-primary/30 transition-all cursor-grab active:cursor-grabbing"
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
                  <div className="text-muted-foreground cursor-grab">
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
