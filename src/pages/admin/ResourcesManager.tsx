import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, Edit2, Trash2, Save, X, Search, FileText, ExternalLink
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import resourcesData from '@/data/resources.json';

const availableTags = [
  'Anti-corruption',
  'Government portals',
  'Youth help',
  'Legal help',
  'Guides'
];

interface Resource {
  id: string;
  title: string;
  description: string;
  link: string;
  tags: string[];
}

const ResourcesManager = () => {
  const [resources, setResources] = useState<Resource[]>(
    resourcesData.map((r, i) => ({
      id: r.id || `r-${i}`,
      title: r.title,
      description: r.description,
      link: r.link,
      tags: [r.category],
    }))
  );
  const [search, setSearch] = useState('');
  const [filterTag, setFilterTag] = useState('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    title: '', description: '', link: '', tags: [] as string[]
  });
  const { toast } = useToast();

  const filteredResources = resources.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase());
    const matchesTag = filterTag === 'all' || r.tags.includes(filterTag);
    return matchesSearch && matchesTag;
  });

  const toggleTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag) 
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const handleAdd = () => {
    if (!formData.title || !formData.link) {
      toast({ title: "Title and link are required", variant: "destructive" });
      return;
    }
    const newResource: Resource = {
      id: `r-${Date.now()}`,
      ...formData,
    };
    setResources([...resources, newResource]);
    setFormData({ title: '', description: '', link: '', tags: [] });
    setIsAdding(false);
    console.log('Added resource:', newResource);
    toast({ title: "Resource added! 📚" });
  };

  const handleEdit = (resource: Resource) => {
    setEditingId(resource.id);
    setFormData({
      title: resource.title,
      description: resource.description,
      link: resource.link,
      tags: resource.tags,
    });
  };

  const handleUpdate = () => {
    setResources(resources.map(r => 
      r.id === editingId ? { ...r, ...formData } : r
    ));
    setEditingId(null);
    setFormData({ title: '', description: '', link: '', tags: [] });
    console.log('Updated resource:', editingId);
    toast({ title: "Resource updated! ✨" });
  };

  const handleDelete = (id: string) => {
    setResources(resources.filter(r => r.id !== id));
    console.log('Deleted resource:', id);
    toast({ title: "Resource removed" });
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="font-display text-3xl font-bold">Resources Manager</h1>
          <p className="text-muted-foreground mt-1">
            Manage helpful resources and links
          </p>
        </div>
        <Button
          onClick={() => setIsAdding(true)}
          className="rounded-full bg-gradient-hero text-white"
        >
          <Plus size={18} />
          Add Resource
        </Button>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            placeholder="Search resources..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-12 h-12 rounded-xl"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={filterTag === 'all' ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => setFilterTag('all')}
          >
            All
          </Badge>
          {availableTags.map(tag => (
            <Badge
              key={tag}
              variant={filterTag === tag ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setFilterTag(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </motion.div>

      {/* Add/Edit Form */}
      <AnimatePresence>
        {(isAdding || editingId) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-card rounded-2xl border-2 border-primary p-6 space-y-4"
          >
            <h3 className="font-display text-lg font-bold">
              {isAdding ? 'Add New Resource' : 'Edit Resource'}
            </h3>
            <Input
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="rounded-xl"
            />
            <Textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="rounded-xl"
              rows={2}
            />
            <Input
              placeholder="Link / URL"
              value={formData.link}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              className="rounded-xl"
            />
            <div>
              <label className="text-sm font-medium mb-2 block">Tags</label>
              <div className="flex flex-wrap gap-2">
                {availableTags.map(tag => (
                  <Badge
                    key={tag}
                    variant={formData.tags.includes(tag) ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={isAdding ? handleAdd : handleUpdate} className="rounded-full">
                {isAdding ? <Plus size={16} /> : <Save size={16} />}
                {isAdding ? 'Add' : 'Save'}
              </Button>
              <Button 
                onClick={() => { setIsAdding(false); setEditingId(null); setFormData({ title: '', description: '', link: '', tags: [] }); }} 
                variant="outline" 
                className="rounded-full"
              >
                <X size={16} /> Cancel
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Resources List */}
      <div className="space-y-3">
        {filteredResources.map((resource, index) => (
          <motion.div
            key={resource.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
            className="bg-card rounded-2xl border border-border p-5 hover:border-primary/30 transition-all group"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-display font-bold text-lg flex items-center gap-2">
                  <FileText size={18} className="text-primary" />
                  {resource.title}
                </h3>
                <p className="text-muted-foreground text-sm mt-1">{resource.description}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {resource.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <a href={resource.link} target="_blank" rel="noopener noreferrer">
                  <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg">
                    <ExternalLink size={14} />
                  </Button>
                </a>
                <Button onClick={() => handleEdit(resource)} size="icon" variant="ghost" className="h-8 w-8 rounded-lg">
                  <Edit2 size={14} />
                </Button>
                <Button onClick={() => handleDelete(resource.id)} size="icon" variant="ghost" className="h-8 w-8 rounded-lg text-destructive">
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <FileText size={48} className="mx-auto mb-4 opacity-50" />
          <p>No resources found</p>
        </div>
      )}
    </div>
  );
};

export default ResourcesManager;
