import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, Trash2, Upload, Image as ImageIcon, Video, Newspaper, Mic, X, ExternalLink
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import mediaData from '@/data/media.json';

interface Photo { id: string; url: string; title: string; tag: string; }
interface VideoItem { id: string; thumbnail: string; link: string; title: string; }
interface PressItem { id: string; title: string; link: string; date: string; }
interface PodcastItem { id: string; title: string; link: string; date: string; }

const photoTags = ['Events', 'Chapters', 'Campaigns', 'Training', 'Outreach', 'Rally'];

const MediaManager = () => {
  const [photos, setPhotos] = useState<Photo[]>(
    mediaData.photos.map((p, i) => ({ id: p.id || `p-${i}`, url: p.url, title: p.title || '', tag: p.category || '' }))
  );
  const [videos, setVideos] = useState<VideoItem[]>(
    mediaData.videos.map((v, i) => ({ id: v.id || `v-${i}`, thumbnail: v.thumbnail, link: v.embedUrl, title: v.title || '' }))
  );
  const [press, setPress] = useState<PressItem[]>(
    mediaData.pressReleases.map((p, i) => ({ id: p.id || `pr-${i}`, title: p.title, link: '#', date: p.date }))
  );
  const [podcasts, setPodcasts] = useState<PodcastItem[]>(
    mediaData.podcasts.map((p, i) => ({ id: p.id || `pod-${i}`, title: p.title, link: '#', date: p.date }))
  );
  const { toast } = useToast();

  // Photo handlers
  const [photoForm, setPhotoForm] = useState({ url: '', title: '', tag: '' });
  
  const handleAddPhoto = () => {
    if (!photoForm.url.trim()) {
      toast({ title: "Please enter a Google Drive image link", variant: "destructive" });
      return;
    }
    if (!photoForm.title.trim()) {
      toast({ title: "Please enter a title", variant: "destructive" });
      return;
    }
    if (!photoForm.tag) {
      toast({ title: "Please select a tag", variant: "destructive" });
      return;
    }
    setPhotos([...photos, { id: `p-${Date.now()}`, ...photoForm }]);
    console.log('Added photo:', photoForm);
    toast({ title: "Photo added! 📸" });
    setPhotoForm({ url: '', title: '', tag: '' });
  };

  const handleDeletePhoto = (id: string) => {
    setPhotos(photos.filter(p => p.id !== id));
    toast({ title: "Photo removed" });
  };

  // Video handlers
  const [videoForm, setVideoForm] = useState({ thumbnail: '', link: '', title: '' });
  const [showVideoForm, setShowVideoForm] = useState(false);

  const handleAddVideo = () => {
    if (!videoForm.thumbnail || !videoForm.link || !videoForm.title) {
      toast({ title: "All fields required", variant: "destructive" });
      return;
    }
    setVideos([...videos, { id: `v-${Date.now()}`, ...videoForm }]);
    setVideoForm({ thumbnail: '', link: '', title: '' });
    setShowVideoForm(false);
    console.log('Added video:', videoForm);
    toast({ title: "Video added! 🎬" });
  };

  // Press handlers
  const [pressForm, setPressForm] = useState({ title: '', link: '', date: '' });
  const [showPressForm, setShowPressForm] = useState(false);

  const handleAddPress = () => {
    if (!pressForm.title || !pressForm.link) {
      toast({ title: "Title and link required", variant: "destructive" });
      return;
    }
    setPress([...press, { id: `pr-${Date.now()}`, ...pressForm }]);
    setPressForm({ title: '', link: '', date: '' });
    setShowPressForm(false);
    console.log('Added press:', pressForm);
    toast({ title: "Press item added! 📰" });
  };

  // Podcast handlers
  const [podcastForm, setPodcastForm] = useState({ title: '', link: '', date: '' });
  const [showPodcastForm, setShowPodcastForm] = useState(false);

  const handleAddPodcast = () => {
    if (!podcastForm.title || !podcastForm.link) {
      toast({ title: "Title and link required", variant: "destructive" });
      return;
    }
    setPodcasts([...podcasts, { id: `pod-${Date.now()}`, ...podcastForm }]);
    setPodcastForm({ title: '', link: '', date: '' });
    setShowPodcastForm(false);
    console.log('Added podcast:', podcastForm);
    toast({ title: "Podcast added! 🎙️" });
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-display text-3xl font-bold">Media Manager</h1>
        <p className="text-muted-foreground mt-1">
          Manage photos, videos, press coverage, and podcasts
        </p>
      </motion.div>

      <Tabs defaultValue="photos" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 h-12 rounded-xl">
          <TabsTrigger value="photos" className="rounded-lg flex gap-2">
            <ImageIcon size={16} /> Photos
          </TabsTrigger>
          <TabsTrigger value="videos" className="rounded-lg flex gap-2">
            <Video size={16} /> Videos
          </TabsTrigger>
          <TabsTrigger value="press" className="rounded-lg flex gap-2">
            <Newspaper size={16} /> Press
          </TabsTrigger>
          <TabsTrigger value="podcasts" className="rounded-lg flex gap-2">
            <Mic size={16} /> Podcasts
          </TabsTrigger>
        </TabsList>

        {/* Photos Tab */}
        <TabsContent value="photos" className="space-y-4">
          <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
            <h3 className="font-semibold text-lg">Add New Photo</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                placeholder="Photo Title"
                value={photoForm.title}
                onChange={(e) => setPhotoForm({ ...photoForm, title: e.target.value })}
                className="rounded-xl"
              />
              <select
                value={photoForm.tag}
                onChange={(e) => setPhotoForm({ ...photoForm, tag: e.target.value })}
                className="w-full px-4 py-2 rounded-xl bg-background border border-border focus:border-primary outline-none"
              >
                <option value="">Select Tag</option>
                {photoTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Paste Google Drive image link"
                value={photoForm.url}
                onChange={(e) => setPhotoForm({ ...photoForm, url: e.target.value })}
                className="flex-1 rounded-xl"
              />
              <Button onClick={handleAddPhoto} className="rounded-full bg-gradient-hero text-white">
                <Plus size={18} /> Add Image
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.03 }}
                className="relative group rounded-xl overflow-hidden bg-muted"
              >
                <div className="aspect-square">
                  <img src={photo.url} alt={photo.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-3 bg-card">
                  <h4 className="font-medium text-sm truncate">{photo.title || 'Untitled'}</h4>
                  {photo.tag && (
                    <span className="text-xs text-muted-foreground">{photo.tag}</span>
                  )}
                </div>
                <button
                  onClick={() => handleDeletePhoto(photo.id)}
                  className="absolute top-2 right-2 w-8 h-8 bg-destructive text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                >
                  <Trash2 size={14} />
                </button>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Videos Tab */}
        <TabsContent value="videos" className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={() => setShowVideoForm(true)} className="rounded-full bg-gradient-hero text-white">
              <Plus size={18} /> Add Video
            </Button>
          </div>
          
          {showVideoForm && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl border-2 border-primary p-6 space-y-4"
            >
              <Input
                placeholder="Video Title"
                value={videoForm.title}
                onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
                className="rounded-xl"
              />
              <Input
                placeholder="Thumbnail URL"
                value={videoForm.thumbnail}
                onChange={(e) => setVideoForm({ ...videoForm, thumbnail: e.target.value })}
                className="rounded-xl"
              />
              <Input
                placeholder="Video Link (YouTube, etc.)"
                value={videoForm.link}
                onChange={(e) => setVideoForm({ ...videoForm, link: e.target.value })}
                className="rounded-xl"
              />
              <div className="flex gap-2">
                <Button onClick={handleAddVideo} className="rounded-full">
                  <Plus size={16} /> Add
                </Button>
                <Button onClick={() => setShowVideoForm(false)} variant="outline" className="rounded-full">
                  <X size={16} /> Cancel
                </Button>
              </div>
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="relative group rounded-2xl overflow-hidden bg-muted"
              >
                <img src={video.thumbnail} alt={video.title} className="w-full aspect-video object-cover" />
                <div className="p-3 bg-card">
                  <h4 className="font-medium text-sm truncate">{video.title || 'Untitled'}</h4>
                </div>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <a href={video.link} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <ExternalLink size={16} />
                  </a>
                  <button
                    onClick={() => setVideos(videos.filter(v => v.id !== video.id))}
                    className="w-10 h-10 bg-destructive text-white rounded-full flex items-center justify-center"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Press Tab */}
        <TabsContent value="press" className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={() => setShowPressForm(true)} className="rounded-full bg-gradient-hero text-white">
              <Plus size={18} /> Add Press
            </Button>
          </div>

          {showPressForm && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl border-2 border-primary p-6 space-y-4"
            >
              <Input
                placeholder="Title"
                value={pressForm.title}
                onChange={(e) => setPressForm({ ...pressForm, title: e.target.value })}
                className="rounded-xl"
              />
              <Input
                placeholder="Link"
                value={pressForm.link}
                onChange={(e) => setPressForm({ ...pressForm, link: e.target.value })}
                className="rounded-xl"
              />
              <Input
                placeholder="Date (e.g., January 2024)"
                value={pressForm.date}
                onChange={(e) => setPressForm({ ...pressForm, date: e.target.value })}
                className="rounded-xl"
              />
              <div className="flex gap-2">
                <Button onClick={handleAddPress} className="rounded-full">
                  <Plus size={16} /> Add
                </Button>
                <Button onClick={() => setShowPressForm(false)} variant="outline" className="rounded-full">
                  <X size={16} /> Cancel
                </Button>
              </div>
            </motion.div>
          )}

          <div className="space-y-3">
            {press.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
                className="bg-card rounded-xl border border-border p-4 flex items-center justify-between group hover:border-primary/30 transition-all"
              >
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.date}</p>
                </div>
                <div className="flex gap-2">
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-muted">
                    <ExternalLink size={16} />
                  </a>
                  <button onClick={() => setPress(press.filter(p => p.id !== item.id))} className="p-2 rounded-lg hover:bg-destructive/10 text-destructive">
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Podcasts Tab */}
        <TabsContent value="podcasts" className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={() => setShowPodcastForm(true)} className="rounded-full bg-gradient-hero text-white">
              <Plus size={18} /> Add Podcast
            </Button>
          </div>

          {showPodcastForm && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl border-2 border-primary p-6 space-y-4"
            >
              <Input
                placeholder="Episode Title"
                value={podcastForm.title}
                onChange={(e) => setPodcastForm({ ...podcastForm, title: e.target.value })}
                className="rounded-xl"
              />
              <Input
                placeholder="Episode Link"
                value={podcastForm.link}
                onChange={(e) => setPodcastForm({ ...podcastForm, link: e.target.value })}
                className="rounded-xl"
              />
              <Input
                placeholder="Date (e.g., January 2024)"
                value={podcastForm.date}
                onChange={(e) => setPodcastForm({ ...podcastForm, date: e.target.value })}
                className="rounded-xl"
              />
              <div className="flex gap-2">
                <Button onClick={handleAddPodcast} className="rounded-full">
                  <Plus size={16} /> Add
                </Button>
                <Button onClick={() => setShowPodcastForm(false)} variant="outline" className="rounded-full">
                  <X size={16} /> Cancel
                </Button>
              </div>
            </motion.div>
          )}

          <div className="space-y-3">
            {podcasts.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
                className="bg-card rounded-xl border border-border p-4 flex items-center justify-between group hover:border-primary/30 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-hero text-white flex items-center justify-center">
                    <Mic size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.date}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-muted">
                    <ExternalLink size={16} />
                  </a>
                  <button onClick={() => setPodcasts(podcasts.filter(p => p.id !== item.id))} className="p-2 rounded-lg hover:bg-destructive/10 text-destructive">
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MediaManager;
