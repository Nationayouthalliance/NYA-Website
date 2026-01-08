import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Settings, Save, AlertTriangle, Globe, Type, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import siteSettingsData from '@/data/siteSettings.json';

const SettingsManager = () => {
  const [settings, setSettings] = useState({
    siteName: siteSettingsData.siteName,
    heroText: siteSettingsData.heroText,
    footerText: siteSettingsData.footerText,
    maintenanceMode: siteSettingsData.maintenanceMode,
  });
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Saved settings:', settings);
    toast({ title: "Settings saved! ⚙️" });
    setIsSaving(false);
  };

  const handleMaintenanceToggle = (checked: boolean) => {
    setSettings({ ...settings, maintenanceMode: checked });
    console.log('Maintenance mode:', checked ? 'ON' : 'OFF');
    
    if (checked) {
      toast({ 
        title: "⚠️ Maintenance Mode Enabled",
        description: "All users will be redirected to the 503 page.",
        variant: "destructive"
      });
    } else {
      toast({ 
        title: "✅ Maintenance Mode Disabled",
        description: "Site is now accessible to all users."
      });
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-display text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Configure site-wide settings (Master Admin only)
        </p>
      </motion.div>

      <div className="max-w-2xl space-y-6">
        {/* Maintenance Mode Warning */}
        {settings.maintenanceMode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 rounded-2xl bg-destructive/10 border border-destructive/20 flex items-start gap-3"
          >
            <AlertTriangle className="text-destructive mt-0.5" size={20} />
            <div>
              <p className="font-semibold text-destructive">Maintenance Mode is ON</p>
              <p className="text-sm text-destructive/80">
                All visitors are being redirected to the 503 maintenance page. 
                Only admins can access the admin panel.
              </p>
            </div>
          </motion.div>
        )}

        {/* Site Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl border border-border p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Globe className="text-primary" size={20} />
            </div>
            <div>
              <h3 className="font-semibold">Site Name</h3>
              <p className="text-sm text-muted-foreground">The name displayed in browser tabs and headers</p>
            </div>
          </div>
          <Input
            value={settings.siteName}
            onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
            className="rounded-xl"
            placeholder="National Youth Alliance India"
          />
        </motion.div>

        {/* Hero Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl border border-border p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <Type className="text-accent" size={20} />
            </div>
            <div>
              <h3 className="font-semibold">Hero Text</h3>
              <p className="text-sm text-muted-foreground">The main tagline shown on the homepage</p>
            </div>
          </div>
          <Input
            value={settings.heroText}
            onChange={(e) => setSettings({ ...settings, heroText: e.target.value })}
            className="rounded-xl"
            placeholder="Together, we're building a corruption-free India"
          />
        </motion.div>

        {/* Footer Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-2xl border border-border p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-orange/10 flex items-center justify-center">
              <FileText className="text-orange" size={20} />
            </div>
            <div>
              <h3 className="font-semibold">Footer Text</h3>
              <p className="text-sm text-muted-foreground">Text shown in the website footer</p>
            </div>
          </div>
          <Input
            value={settings.footerText}
            onChange={(e) => setSettings({ ...settings, footerText: e.target.value })}
            className="rounded-xl"
            placeholder="Join the movement. Be the change."
          />
        </motion.div>

        {/* Maintenance Mode */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`rounded-2xl border p-6 ${
            settings.maintenanceMode 
              ? 'bg-destructive/5 border-destructive/20' 
              : 'bg-card border-border'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                settings.maintenanceMode ? 'bg-destructive/10' : 'bg-muted'
              }`}>
                <Settings className={settings.maintenanceMode ? 'text-destructive' : 'text-muted-foreground'} size={20} />
              </div>
              <div>
                <h3 className="font-semibold">Maintenance Mode</h3>
                <p className="text-sm text-muted-foreground">
                  Redirect all visitors to 503 page
                </p>
              </div>
            </div>
            <Switch
              checked={settings.maintenanceMode}
              onCheckedChange={handleMaintenanceToggle}
            />
          </div>
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button 
            onClick={handleSave}
            disabled={isSaving}
            className="w-full h-12 rounded-xl bg-gradient-hero text-white font-semibold"
          >
            {isSaving ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <Settings size={20} />
              </motion.div>
            ) : (
              <>
                <Save size={18} /> Save Settings
              </>
            )}
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default SettingsManager;
