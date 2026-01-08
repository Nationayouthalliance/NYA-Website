import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Plus, Edit2, Trash2, Save, X, Search, Users, Loader2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import teamData from '@/data/team.json';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  wing: string;
  city: string;
  about: string;
  contribution: string;
}

const wings = ['Core Team', 'Strategy', 'Operations', 'Media', 'Outreach', 'Tech'];
const roles = ['National Coordinator', 'State Lead', 'Chapter Head', 'Coordinator', 'Member', 'Advisor'];

const TeamManager = () => {
  const [members, setMembers] = useState<TeamMember[]>(
    teamData.map((m, i) => ({
      id: m.id || `t-${i}`,
      name: m.name,
      role: m.role,
      wing: m.wing,
      city: m.chapter,
      about: m.bio,
      contribution: m.whatTheyDo,
    }))
  );
  const [search, setSearch] = useState('');
  const [filterWing, setFilterWing] = useState('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '', role: '', wing: '', city: '', about: '', contribution: ''
  });
  const { toast } = useToast();

  const filteredMembers = members.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.role.toLowerCase().includes(search.toLowerCase());
    const matchesWing = filterWing === 'all' || m.wing === filterWing;
    return matchesSearch && matchesWing;
  });

  const handleAdd = () => {
    if (!formData.name || !formData.role) {
      toast({ title: "Name and role are required", variant: "destructive" });
      return;
    }
    const newMember: TeamMember = {
      id: `t-${Date.now()}`,
      ...formData,
    };
    setMembers([...members, newMember]);
    setFormData({ name: '', role: '', wing: '', city: '', about: '', contribution: '' });
    setIsAdding(false);
    console.log('Added team member:', newMember);
    toast({ title: "Team member added! 🎉" });
  };

  const handleEdit = (member: TeamMember) => {
    setEditingId(member.id);
    setFormData({
      name: member.name,
      role: member.role,
      wing: member.wing,
      city: member.city,
      about: member.about,
      contribution: member.contribution,
    });
  };

  const handleUpdate = () => {
    setMembers(members.map(m => 
      m.id === editingId ? { ...m, ...formData } : m
    ));
    setEditingId(null);
    setFormData({ name: '', role: '', wing: '', city: '', about: '', contribution: '' });
    console.log('Updated team member:', editingId);
    toast({ title: "Team member updated! ✨" });
  };

  const handleDelete = (id: string) => {
    setMembers(members.filter(m => m.id !== id));
    console.log('Deleted team member:', id);
    toast({ title: "Team member removed" });
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="font-display text-3xl font-bold">Team Manager</h1>
          <p className="text-muted-foreground mt-1">
            Manage your team members and their roles
          </p>
        </div>
        <Button
          onClick={() => setIsAdding(true)}
          className="rounded-full bg-gradient-hero text-white"
        >
          <Plus size={18} />
          Add Member
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
            placeholder="Search by name or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-12 h-12 rounded-xl"
          />
        </div>
        <Select value={filterWing} onValueChange={setFilterWing}>
          <SelectTrigger className="w-full md:w-48 h-12 rounded-xl">
            <SelectValue placeholder="Filter by wing" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Wings</SelectItem>
            {wings.map(wing => (
              <SelectItem key={wing} value={wing}>{wing}</SelectItem>
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
              {isAdding ? 'Add New Member' : 'Edit Member'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Input
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="rounded-xl"
              />
              <Select value={formData.role} onValueChange={(v) => setFormData({ ...formData, role: v })}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map(role => (
                    <SelectItem key={role} value={role}>{role}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={formData.wing} onValueChange={(v) => setFormData({ ...formData, wing: v })}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Select wing" />
                </SelectTrigger>
                <SelectContent>
                  {wings.map(wing => (
                    <SelectItem key={wing} value={wing}>{wing}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                placeholder="City"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="rounded-xl"
              />
            </div>
            <Textarea
              placeholder="About"
              value={formData.about}
              onChange={(e) => setFormData({ ...formData, about: e.target.value })}
              className="mt-4 rounded-xl"
              rows={2}
            />
            <Textarea
              placeholder="What they do at NYA"
              value={formData.contribution}
              onChange={(e) => setFormData({ ...formData, contribution: e.target.value })}
              className="mt-4 rounded-xl"
              rows={2}
            />
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

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMembers.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
            className="bg-card rounded-2xl border border-border p-5 hover:border-primary/30 transition-all group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-hero text-white flex items-center justify-center font-display font-bold text-lg">
                {member.name.charAt(0)}
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button onClick={() => handleEdit(member)} size="icon" variant="ghost" className="h-8 w-8 rounded-lg">
                  <Edit2 size={14} />
                </Button>
                <Button onClick={() => handleDelete(member.id)} size="icon" variant="ghost" className="h-8 w-8 rounded-lg text-destructive">
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
            <h3 className="font-display font-bold text-lg">{member.name}</h3>
            <p className="text-primary text-sm font-medium">{member.role}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="px-2 py-0.5 bg-muted rounded-full text-xs text-muted-foreground">{member.wing}</span>
              <span className="px-2 py-0.5 bg-muted rounded-full text-xs text-muted-foreground">{member.city}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Users size={48} className="mx-auto mb-4 opacity-50" />
          <p>No team members found</p>
        </div>
      )}
    </div>
  );
};

export default TeamManager;
