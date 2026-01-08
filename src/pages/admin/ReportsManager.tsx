import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  AlertTriangle, X, MapPin, Clock, FileText, MessageSquare, Save, ExternalLink
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import reportsData from '@/data/reports.json';

interface Report {
  id: string;
  name?: string;
  description: string;
  location: string;
  files: string[];
  date: string;
  status: 'new' | 'in_review' | 'action_taken' | 'closed';
  internalComment?: string;
}

const statusConfig = {
  new: { label: 'New', color: 'bg-orange', textColor: 'text-orange' },
  in_review: { label: 'In Review', color: 'bg-accent', textColor: 'text-accent' },
  action_taken: { label: 'Action Taken', color: 'bg-green', textColor: 'text-green' },
  closed: { label: 'Closed', color: 'bg-muted', textColor: 'text-muted-foreground' },
};

const ReportsManager = () => {
  const [reports, setReports] = useState<Report[]>(reportsData.reports as Report[]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [editStatus, setEditStatus] = useState<string>('');
  const [editComment, setEditComment] = useState('');
  const { toast } = useToast();

  const handleOpenReport = (report: Report) => {
    setSelectedReport(report);
    setEditStatus(report.status);
    setEditComment(report.internalComment || '');
  };

  const handleSave = () => {
    if (!selectedReport) return;

    setReports(reports.map(r => 
      r.id === selectedReport.id 
        ? { ...r, status: editStatus as Report['status'], internalComment: editComment }
        : r
    ));
    console.log('Updated report:', { 
      id: selectedReport.id, 
      status: editStatus, 
      comment: editComment 
    });
    toast({ title: "Report updated! ✅" });
    setSelectedReport(null);
  };

  const getStatusBadge = (status: Report['status']) => {
    const config = statusConfig[status];
    return (
      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${config.color}/10 ${config.textColor}`}>
        {config.label}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-display text-3xl font-bold">Reports Manager</h1>
        <p className="text-muted-foreground mt-1">
          Review and manage issue/corruption reports
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(statusConfig).map(([key, config]) => {
          const count = reports.filter(r => r.status === key).length;
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`p-4 rounded-2xl ${config.color}/10 border border-${config.color}/20`}
            >
              <p className={`text-2xl font-bold ${config.textColor}`}>{count}</p>
              <p className="text-sm text-muted-foreground">{config.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Reports Table */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Date</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Location</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Files</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, index) => (
                <motion.tr
                  key={report.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="border-t border-border hover:bg-muted/50 cursor-pointer"
                  onClick={() => handleOpenReport(report)}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock size={14} className="text-muted-foreground" />
                      {report.date}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin size={14} className="text-muted-foreground" />
                      {report.location}
                    </div>
                  </td>
                  <td className="p-4">{getStatusBadge(report.status)}</td>
                  <td className="p-4">
                    <span className="text-sm text-muted-foreground">
                      {report.files.length} file(s)
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="rounded-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenReport(report);
                      }}
                    >
                      View
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedReport && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedReport(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background rounded-3xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange/10 flex items-center justify-center">
                    <AlertTriangle className="text-orange" size={20} />
                  </div>
                  <h2 className="font-display text-2xl font-bold">Report Details</h2>
                </div>
                <button 
                  onClick={() => setSelectedReport(null)} 
                  className="p-2 rounded-xl hover:bg-muted"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-xl bg-muted">
                    <p className="text-xs text-muted-foreground">Reporter</p>
                    <p className="font-medium">{selectedReport.name || 'Anonymous'}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-muted">
                    <p className="text-xs text-muted-foreground">Date</p>
                    <p className="font-medium">{selectedReport.date}</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-muted">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                    <MapPin size={12} />
                    Location
                  </div>
                  <p className="font-medium">{selectedReport.location}</p>
                </div>

                <div className="p-4 rounded-xl bg-muted">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <FileText size={12} />
                    Description
                  </div>
                  <p className="text-sm">{selectedReport.description}</p>
                </div>

                {/* Attached Files */}
                {selectedReport.files.length > 0 && (
                  <div className="p-4 rounded-xl border border-border">
                    <p className="text-xs text-muted-foreground mb-3">Attached Files</p>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedReport.files.map((file, i) => (
                        <a
                          key={i}
                          href={file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 p-2 rounded-lg bg-muted hover:bg-muted/80 text-sm"
                        >
                          <ExternalLink size={14} />
                          File {i + 1}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Status Selector */}
                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <Select value={editStatus} onValueChange={setEditStatus}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="in_review">In Review</SelectItem>
                      <SelectItem value="action_taken">Action Taken</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Internal Comment */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare size={16} className="text-muted-foreground" />
                    <label className="text-sm font-medium">Internal Comment</label>
                  </div>
                  <Textarea
                    placeholder="Add internal notes about this report..."
                    value={editComment}
                    onChange={(e) => setEditComment(e.target.value)}
                    rows={3}
                    className="rounded-xl"
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button 
                    onClick={handleSave}
                    className="flex-1 rounded-xl bg-gradient-hero text-white"
                  >
                    <Save size={18} /> Save Changes
                  </Button>
                  <Button 
                    onClick={() => setSelectedReport(null)}
                    variant="outline"
                    className="rounded-xl"
                  >
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

export default ReportsManager;
