import { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, User, Clock, ArrowRight } from 'lucide-react';
import logsData from '@/data/logs.json';

const ActivityLogs = () => {
  const [logs] = useState(logsData.logs);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-3xl font-bold">Activity Logs</h1>
        <p className="text-muted-foreground mt-1">Track all admin actions (read-only)</p>
      </motion.div>

      <div className="space-y-3">
        {logs.map((log, index) => (
          <motion.div
            key={log.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.03 }}
            className="bg-card rounded-xl border border-border p-4"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <Activity size={18} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 text-sm">
                  <User size={14} className="text-muted-foreground" />
                  <span className="font-semibold">{log.adminName}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">{log.page}</span>
                </div>
                <p className="mt-1">
                  <span className="font-medium">{log.action}</span>: {log.field}
                </p>
                {log.oldValue && (
                  <div className="flex items-center gap-2 text-sm mt-2 text-muted-foreground">
                    <span className="line-through">{log.oldValue}</span>
                    <ArrowRight size={12} />
                    <span className="text-foreground">{log.newValue}</span>
                  </div>
                )}
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                  <Clock size={12} />
                  {new Date(log.timestamp).toLocaleString()}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ActivityLogs;
