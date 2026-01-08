import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Shield, Plus, Trash2, Edit, X, Save, Crown
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AdminPermissions } from '@/contexts/AuthContext';
import adminsData from '@/data/admins.json';

interface Admin {
  email: string;
  name: string;
  isMaster: boolean;
  permissions: AdminPermissions;
}

const permissionLabels: Record<keyof AdminPermissions, string> = {
  homeManager: 'Home Manager',
  journeyManager: 'Journey Manager',
  team: 'Team',
  chapters: 'Chapters',
  media: 'Media',
  resources: 'Resources',
  blog: 'Blog',
  joinRequests: 'Join Requests',
  reports: 'Reports',
  logs: 'Activity Logs',
  admins: 'Admins Manager',
  settings: 'Settings',
};

const defaultPermissions: AdminPermissions = {
  homeManager: false,
  journeyManager: false,
  team: false,
  chapters: false,
  media: false,
  resources: false,
  blog: false,
  joinRequests: false,
  reports: false,
  logs: true,
  admins: false,
  settings: false,
};

const AdminsManager = () => {
  const [admins, setAdmins] = useState<Admin[]>(adminsData.admins as Admin[]);
  const [showForm, setShowForm] = useState(false);
  const [editingEmail, setEditingEmail] = useState<string | null>(null);
  const [form, setForm] = useState({
    email: '',
    name: '',
    permissions: { ...defaultPermissions },
  });
  const { toast } = useToast();

  const resetForm = () => {
    setForm({
      email: '',
      name: '',
      permissions: { ...defaultPermissions },
    });
    setEditingEmail(null);
    setShowForm(false);
  };

  const handleSubmit = () => {
    if (!form.email || !form.name) {
      toast({ title: "Email and name are required", variant: "destructive" });
      return;
    }

    if (editingEmail) {
      setAdmins(admins.map(a => 
        a.email === editingEmail 
          ? { ...a, name: form.name, permissions: form.permissions }
          : a
      ));
      console.log('Updated admin:', { email: editingEmail, ...form });
      toast({ title: "Admin updated! ✏️" });
    } else {
      // Check if email already exists
      if (admins.some(a => a.email.toLowerCase() === form.email.toLowerCase())) {
        toast({ title: "This email is already an admin", variant: "destructive" });
        return;
      }

      const newAdmin: Admin = {
        email: form.email,
        name: form.name,
        isMaster: false,
        permissions: form.permissions,
      };
      setAdmins([...admins, newAdmin]);
      console.log('Added admin:', newAdmin);
      toast({ title: "Admin added! 👤" });
    }
    resetForm();
  };

  const handleEdit = (admin: Admin) => {
    if (admin.isMaster) {
      toast({ title: "Cannot edit Master Admin", variant: "destructive" });
      return;
    }
    setForm({
      email: admin.email,
      name: admin.name,
      permissions: { ...admin.permissions },
    });
    setEditingEmail(admin.email);
    setShowForm(true);
  };

  const handleDelete = (email: string) => {
    const admin = admins.find(a => a.email === email);
    if (admin?.isMaster) {
      toast({ title: "Cannot remove Master Admin", variant: "destructive" });
      return;
    }
    setAdmins(admins.filter(a => a.email !== email));
    console.log('Removed admin:', email);
    toast({ title: "Admin removed" });
  };

  const togglePermission = (key: keyof AdminPermissions) => {
    setForm({
      ...form,
      permissions: {
        ...form.permissions,
        [key]: !form.permissions[key],
      },
    });
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="font-display text-3xl font-bold">Admins Manager</h1>
          <p className="text-muted-foreground mt-1">
            Manage admin access and permissions (Master Admin only)
          </p>
        </div>
        <Button 
          onClick={() => setShowForm(true)} 
          className="rounded-full bg-gradient-hero text-white"
        >
          <Plus size={18} /> Add Admin
        </Button>
      </motion.div>

      {/* Admins List */}
      <div className="space-y-3">
        {admins.map((admin, index) => (
          <motion.div
            key={admin.email}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`bg-card rounded-xl border p-4 ${
              admin.isMaster ? 'border-primary/50 bg-primary/5' : 'border-border'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  admin.isMaster ? 'bg-gradient-hero text-white' : 'bg-muted text-muted-foreground'
                }`}>
                  {admin.isMaster ? <Crown size={24} /> : <Shield size={24} />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{admin.name}</h3>
                    {admin.isMaster && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                        Master Admin
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{admin.email}</p>
                </div>
              </div>
              {!admin.isMaster && (
                <div className="flex gap-1">
                  <button 
                    onClick={() => handleEdit(admin)}
                    className="p-2 rounded-lg hover:bg-muted"
                  >
                    <Edit size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete(admin.email)}
                    className="p-2 rounded-lg hover:bg-destructive/10 text-destructive"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )}
            </div>

            {/* Permissions Preview */}
            {!admin.isMaster && (
              <div className="mt-3 pt-3 border-t border-border">
                <p className="text-xs text-muted-foreground mb-2">Permissions:</p>
                <div className="flex flex-wrap gap-1">
                  {Object.entries(admin.permissions)
                    .filter(([_, value]) => value)
                    .map(([key]) => (
                      <span 
                        key={key}
                        className="px-2 py-0.5 rounded-full text-xs bg-muted text-muted-foreground"
                      >
                        {permissionLabels[key as keyof AdminPermissions]}
                      </span>
                    ))
                  }
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => resetForm()}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background rounded-3xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl font-bold">
                  {editingEmail ? 'Edit Admin' : 'Add New Admin'}
                </h2>
                <button onClick={resetForm} className="p-2 rounded-xl hover:bg-muted">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input
                    type="email"
                    placeholder="admin@nya.org"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    disabled={!!editingEmail}
                    className="rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <Input
                    placeholder="Admin Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="rounded-xl"
                  />
                </div>

                {/* Permissions Grid */}
                <div>
                  <label className="block text-sm font-medium mb-3">Permissions</label>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(permissionLabels).map(([key, label]) => (
                      <div 
                        key={key}
                        className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                          form.permissions[key as keyof AdminPermissions]
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-muted-foreground'
                        }`}
                        onClick={() => togglePermission(key as keyof AdminPermissions)}
                      >
                        <Checkbox 
                          checked={form.permissions[key as keyof AdminPermissions]}
                          onCheckedChange={() => togglePermission(key as keyof AdminPermissions)}
                        />
                        <span className="text-sm">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button onClick={handleSubmit} className="flex-1 rounded-xl bg-gradient-hero text-white">
                    <Save size={18} /> {editingEmail ? 'Update Admin' : 'Add Admin'}
                  </Button>
                  <Button onClick={resetForm} variant="outline" className="rounded-xl">
                    Cancel
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminsManager;
