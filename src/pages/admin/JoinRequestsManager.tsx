import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Rocket, MapPin, GraduationCap, X, Check, XCircle, MessageSquare, Eye, Clock
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import joinRequestsData from '@/data/joinRequests.json';

interface JoinRequest {
  id: string;
  type: 'team' | 'chapter' | 'ambassador';
  name: string;
  email: string;
  city: string;
  reason: string;
  discordUsername?: string;
  instagramUsername?: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
  internalNote?: string;
}

const JoinRequestsManager = () => {
  const [requests, setRequests] = useState<JoinRequest[]>(
    (joinRequestsData.requests as any[]).map(r => ({
      ...r,
      reason: r.reason || r.why || r.plan || '',
    }))
  );
  const [selectedRequest, setSelectedRequest] = useState<JoinRequest | null>(null);
  const [internalNote, setInternalNote] = useState('');
  const { toast } = useToast();

  const getRequestsByType = (type: string) => 
    requests.filter(r => r.type === type);

  const handleApprove = (id: string) => {
    setRequests(requests.map(r => 
      r.id === id ? { ...r, status: 'approved' } : r
    ));
    console.log('Approved request:', id);
    toast({ title: "Request approved! ✅" });
    setSelectedRequest(null);
  };

  const handleReject = (id: string) => {
    setRequests(requests.map(r => 
      r.id === id ? { ...r, status: 'rejected' } : r
    ));
    console.log('Rejected request:', id);
    toast({ title: "Request rejected" });
    setSelectedRequest(null);
  };

  const handleAddNote = (id: string) => {
    if (!internalNote.trim()) return;
    
    setRequests(requests.map(r => 
      r.id === id ? { ...r, internalNote } : r
    ));
    console.log('Added note to request:', { id, note: internalNote });
    toast({ title: "Note added! 📝" });
    setInternalNote('');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green/10 text-green">Approved</span>;
      case 'rejected':
        return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-destructive/10 text-destructive">Rejected</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-orange/10 text-orange">Pending</span>;
    }
  };

  const RequestCard = ({ request }: { request: JoinRequest }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-xl border border-border p-4 hover:border-primary/30 transition-all"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            {getStatusBadge(request.status)}
          </div>
          <h3 className="font-semibold text-foreground">{request.name}</h3>
          <p className="text-sm text-muted-foreground">{request.city}</p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
            <Clock size={12} />
            {request.date}
          </div>
        </div>
        <div className="flex gap-1">
          <button 
            onClick={() => setSelectedRequest(request)}
            className="p-2 rounded-lg hover:bg-muted"
          >
            <Eye size={16} />
          </button>
          {request.status === 'pending' && (
            <>
              <button 
                onClick={() => handleApprove(request.id)}
                className="p-2 rounded-lg hover:bg-green/10 text-green"
              >
                <Check size={16} />
              </button>
              <button 
                onClick={() => handleReject(request.id)}
                className="p-2 rounded-lg hover:bg-destructive/10 text-destructive"
              >
                <XCircle size={16} />
              </button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-display text-3xl font-bold">Join Requests</h1>
        <p className="text-muted-foreground mt-1">
          Review and manage applications for Team, Chapter, and Ambassador roles
        </p>
      </motion.div>

      <Tabs defaultValue="team" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 h-12 rounded-xl">
          <TabsTrigger value="team" className="rounded-lg flex gap-2">
            <Rocket size={16} /> Join Team
            <span className="ml-1 px-2 py-0.5 rounded-full bg-primary/20 text-xs">
              {getRequestsByType('team').filter(r => r.status === 'pending').length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="chapter" className="rounded-lg flex gap-2">
            <MapPin size={16} /> Start Chapter
            <span className="ml-1 px-2 py-0.5 rounded-full bg-primary/20 text-xs">
              {getRequestsByType('chapter').filter(r => r.status === 'pending').length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="ambassador" className="rounded-lg flex gap-2">
            <GraduationCap size={16} /> Ambassador
            <span className="ml-1 px-2 py-0.5 rounded-full bg-primary/20 text-xs">
              {getRequestsByType('ambassador').filter(r => r.status === 'pending').length}
            </span>
          </TabsTrigger>
        </TabsList>

        {['team', 'chapter', 'ambassador'].map(type => (
          <TabsContent key={type} value={type} className="space-y-3">
            {getRequestsByType(type).length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No requests yet
              </div>
            ) : (
              getRequestsByType(type).map(request => (
                <RequestCard key={request.id} request={request} />
              ))
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedRequest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedRequest(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background rounded-3xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl font-bold">Request Details</h2>
                <button 
                  onClick={() => setSelectedRequest(null)} 
                  className="p-2 rounded-xl hover:bg-muted"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  {getStatusBadge(selectedRequest.status)}
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-muted capitalize">
                    {selectedRequest.type === 'team' ? 'Join Team' : 
                     selectedRequest.type === 'chapter' ? 'Start Chapter' : 'Campus Ambassador'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-xl bg-muted">
                    <p className="text-xs text-muted-foreground">Name</p>
                    <p className="font-medium">{selectedRequest.name}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-muted">
                    <p className="text-xs text-muted-foreground">City</p>
                    <p className="font-medium">{selectedRequest.city}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-muted col-span-2">
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="font-medium">{selectedRequest.email}</p>
                  </div>
                  {selectedRequest.discordUsername && (
                    <div className="p-3 rounded-xl bg-muted">
                      <p className="text-xs text-muted-foreground">Discord</p>
                      <p className="font-medium">{selectedRequest.discordUsername}</p>
                    </div>
                  )}
                  {selectedRequest.instagramUsername && (
                    <div className="p-3 rounded-xl bg-muted">
                      <p className="text-xs text-muted-foreground">Instagram</p>
                      <p className="font-medium">@{selectedRequest.instagramUsername}</p>
                    </div>
                  )}
                </div>

                <div className="p-4 rounded-xl bg-muted">
                  <p className="text-xs text-muted-foreground mb-2">Why they want to join</p>
                  <p className="text-sm">{selectedRequest.reason}</p>
                </div>

                <div className="p-4 rounded-xl bg-muted">
                  <p className="text-xs text-muted-foreground mb-2">Applied on</p>
                  <p className="text-sm">{selectedRequest.date}</p>
                </div>

                {/* Internal Note Section */}
                <div className="border-t border-border pt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare size={16} className="text-muted-foreground" />
                    <p className="text-sm font-medium">Internal Note</p>
                  </div>
                  {selectedRequest.internalNote ? (
                    <p className="text-sm text-muted-foreground p-3 rounded-xl bg-muted">
                      {selectedRequest.internalNote}
                    </p>
                  ) : (
                    <div className="space-y-2">
                      <Textarea
                        placeholder="Add an internal note..."
                        value={internalNote}
                        onChange={(e) => setInternalNote(e.target.value)}
                        rows={2}
                        className="rounded-xl"
                      />
                      <Button 
                        onClick={() => handleAddNote(selectedRequest.id)}
                        size="sm"
                        className="rounded-full"
                      >
                        Add Note
                      </Button>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                {selectedRequest.status === 'pending' && (
                  <div className="flex gap-2 pt-4">
                    <Button 
                      onClick={() => handleApprove(selectedRequest.id)}
                      className="flex-1 rounded-xl bg-green text-white hover:bg-green/90"
                    >
                      <Check size={18} /> Approve
                    </Button>
                    <Button 
                      onClick={() => handleReject(selectedRequest.id)}
                      variant="outline"
                      className="flex-1 rounded-xl border-destructive text-destructive hover:bg-destructive/10"
                    >
                      <XCircle size={18} /> Reject
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default JoinRequestsManager;
