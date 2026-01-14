import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Trash2, Image as ImageIcon, Video, Newspaper, Mic, X, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

/* ================= TYPES ================= */
interface Photo {
  id: string;
  title: string;
  tag: string;
  image_url: string;
}

interface VideoItem {
  id: string;
  title: string;
  thumbnail_url: string;
  video_link: string;
}

interface PressItem {
  id: string;
  title: string;
  link: string;
  date_text: string;
  summary: string;
}

interface PodcastItem {
  id: string;
  title: string;
  link: string;
  date_text: string;
  duration: string;
}

const photoTags = ['Events', 'Chapters', 'Campaigns', 'Training', 'Outreach', 'Rally'];

/* ================= COMPONENT ================= */
const MediaManager = () => {
  const { toast } = useToast();

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [press, setPress] = useState<PressItem[]>([]);
  const [podcasts, setPodcasts] = useState<PodcastItem[]>([]);

  /* ================= FETCH ALL ================= */
  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    await Promise.all([fetchPhotos(), fetchVideos(), fetchPress(), fetchPodcasts()]);
  };

  const fetchPhotos = async () => {
    const { data, error } = await supabase.from('media_photos').select('*').order('created_at', { ascending: false });
    if (!error) setPhotos(data || []);
  };

  const fetchVideos = async () => {
    const { data, error } = await supabase.from('media_videos').select('*').order('created_at', { ascending: false });
    if (!error) setVideos(data || []);
  };

  const fetchPress = async () => {
    const { data, error } = await supabase.from('media_press').select('*').order('created_at', { ascending: false });
    if (!error) setPress(data || []);
  };

  const fetchPodcasts = async () => {
    const { data, error } = await supabase.from('media_podcasts').select('*').order('created_at', { ascending: false });
    if (!error) setPodcasts(data || []);
  };

  /* ================= PHOTOS ================= */
  const [photoForm, setPhotoForm] = useState({ title: '', tag: '', image_url: '' });

  const handleAddPhoto = async () => {
    if (!photoForm.title || !photoForm.tag || !photoForm.image_url) {
      toast({ title: 'All fields required', variant: 'destructive' });
      return;
    }

    await supabase.from('media_photos').insert([photoForm]);
    setPhotoForm({ title: '', tag: '', image_url: '' });
    fetchPhotos();
    toast({ title: 'Photo added' });
  };

  const handleDeletePhoto = async (id: string) => {
    await supabase.from('media_photos').delete().eq('id', id);
    fetchPhotos();
    toast({ title: 'Photo deleted' });
  };

  /* ================= VIDEOS ================= */
  const [videoForm, setVideoForm] = useState({ title: '', thumbnail_url: '', video_link: '' });
  const [showVideoForm, setShowVideoForm] = useState(false);

 const handleAddVideo = async () => {
  console.log("ADD VIDEO CLICKED", videoForm);

  if (!videoForm.title || !videoForm.thumbnail_url || !videoForm.video_link) {
    toast({ title: 'All fields required', variant: 'destructive' });
    return;
  }

const { data, error } = await supabase
  .from('media_videos')
  .insert({
    title: videoForm.title,
    thumbnail_url: videoForm.thumbnail_url,
    video_link: videoForm.video_link,
  });


  console.log("SUPABASE RESPONSE:", { data, error });

  if (error) {
    console.error("VIDEO INSERT ERROR:", error);
    toast({ title: error.message, variant: 'destructive' });
    return;
  }

  toast({ title: 'Video added' });
  setVideoForm({ title: '', thumbnail_url: '', video_link: '' });
  setShowVideoForm(false);
  fetchVideos();
};


  /* ================= PRESS ================= */
  const [pressForm, setPressForm] = useState({ title: '', link: '', date_text: '', summary: '' });
  const [showPressForm, setShowPressForm] = useState(false);

  const handleAddPress = async () => {
    if (!pressForm.title || !pressForm.link || !pressForm.summary) {
      toast({ title: 'All fields required', variant: 'destructive' });
      return;
    }

    await supabase.from('media_press').insert([pressForm]);
    setPressForm({ title: '', link: '', date_text: '', summary: '' });
    setShowPressForm(false);
    fetchPress();
    toast({ title: 'Press added' });
  };

  const handleDeletePress = async (id: string) => {
    await supabase.from('media_press').delete().eq('id', id);
    fetchPress();
    toast({ title: 'Press deleted' });
  };

  /* ================= PODCASTS ================= */
  const [podcastForm, setPodcastForm] = useState({ title: '', link: '', date_text: '', duration: '' });
  const [showPodcastForm, setShowPodcastForm] = useState(false);

  const handleAddPodcast = async () => {
    if (!podcastForm.title || !podcastForm.link || !podcastForm.duration) {
      toast({ title: 'All fields required', variant: 'destructive' });
      return;
    }

    await supabase.from('media_podcasts').insert([podcastForm]);
    setPodcastForm({ title: '', link: '', date_text: '', duration: '' });
    setShowPodcastForm(false);
    fetchPodcasts();
    toast({ title: 'Podcast added' });
  };

  const handleDeletePodcast = async (id: string) => {
    await supabase.from('media_podcasts').delete().eq('id', id);
    fetchPodcasts();
    toast({ title: 'Podcast deleted' });
  };

  /* ================= UI ================= */
  return (
    <div className="space-y-6">

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-3xl font-bold">Media Manager</h1>
        <p className="text-muted-foreground mt-1">Manage photos, videos, press coverage, and podcasts</p>
      </motion.div>

      <Tabs defaultValue="photos" className="space-y-6">

        <TabsList className="grid w-full grid-cols-4 h-12 rounded-xl">
          <TabsTrigger value="photos" className="flex gap-2"><ImageIcon size={16}/>Photos</TabsTrigger>
          <TabsTrigger value="videos" className="flex gap-2"><Video size={16}/>Videos</TabsTrigger>
          <TabsTrigger value="press" className="flex gap-2"><Newspaper size={16}/>Press</TabsTrigger>
          <TabsTrigger value="podcasts" className="flex gap-2"><Mic size={16}/>Podcasts</TabsTrigger>
        </TabsList>

        {/* PHOTOS */}
        <TabsContent value="photos" className="space-y-4">
          <div className="bg-card rounded-2xl border p-6 space-y-4">
            <h3 className="font-semibold text-lg">Add New Photo</h3>

            <div className="grid sm:grid-cols-2 gap-4">
              <Input value={photoForm.title} onChange={e => setPhotoForm({ ...photoForm, title: e.target.value })} placeholder="Photo Title" />
              <select value={photoForm.tag} onChange={e => setPhotoForm({ ...photoForm, tag: e.target.value })} className="w-full px-4 py-2 rounded-xl bg-background border border-border">
                <option value="">Select Tag</option>
                {photoTags.map(tag => <option key={tag} value={tag}>{tag}</option>)}
              </select>
            </div>

            <div className="flex gap-2">
              <Input value={photoForm.image_url} onChange={e => setPhotoForm({ ...photoForm, image_url: e.target.value })} placeholder="Image URL" />
              <Button type="button" onClick={handleAddPhoto}><Plus size={18}/> Add Image</Button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map(photo => (
              <div key={photo.id} className="relative group rounded-xl overflow-hidden bg-muted">
                <img src={photo.image_url} className="w-full aspect-square object-cover" />
                <div className="p-3 bg-card">
                  <h4 className="font-medium text-sm truncate">{photo.title}</h4>
                  <span className="text-xs text-muted-foreground">{photo.tag}</span>
                </div>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); handleDeletePhoto(photo.id); }}
                  className="absolute top-2 right-2 w-8 h-8 bg-destructive text-white rounded-lg opacity-0 group-hover:opacity-100 flex items-center justify-center"
                >
                  <Trash2 size={14}/>
                </button>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* VIDEOS */}
        <TabsContent value="videos" className="space-y-4">
          <div className="flex justify-end">
            <Button type="button" onClick={() => setShowVideoForm(true)}><Plus size={18}/> Add Video</Button>
          </div>

          {showVideoForm && (
            <div className="bg-card rounded-2xl border-2 border-primary p-6 space-y-4">
              <Input value={videoForm.title} onChange={e => setVideoForm({ ...videoForm, title: e.target.value })} placeholder="Title" />
              <Input value={videoForm.thumbnail_url} onChange={e => setVideoForm({ ...videoForm, thumbnail_url: e.target.value })} placeholder="Thumbnail URL" />
              <Input value={videoForm.video_link} onChange={e => setVideoForm({ ...videoForm, video_link: e.target.value })} placeholder="Video Link" />

              <div className="flex gap-2">
                <Button type="button" onClick={handleAddVideo}><Plus size={16}/> Add</Button>
                <Button type="button" variant="outline" onClick={() => setShowVideoForm(false)}><X size={16}/> Cancel</Button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map(video => (
              <div key={video.id} className="relative group rounded-2xl overflow-hidden bg-muted">
                <img src={video.thumbnail_url} className="w-full aspect-video object-cover" />
                <div className="p-3 bg-card">
                  <h4 className="font-medium text-sm truncate">{video.title}</h4>
                </div>

                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 pointer-events-none">
                  <a
                    href={video.video_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center pointer-events-auto"
                  >
                    <ExternalLink size={16}/>
                  </a>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); handleDeleteVideo(video.id); }}
                    className="w-10 h-10 bg-destructive text-white rounded-full flex items-center justify-center pointer-events-auto"
                  >
                    <Trash2 size={16}/>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* PRESS */}
        <TabsContent value="press" className="space-y-4">
          <div className="flex justify-end">
            <Button type="button" onClick={() => setShowPressForm(true)}><Plus size={18}/> Add Press</Button>
          </div>

          {showPressForm && (
            <div className="bg-card rounded-2xl border-2 border-primary p-6 space-y-4">
              <Input value={pressForm.title} onChange={e => setPressForm({ ...pressForm, title: e.target.value })} placeholder="Title" />
              <Input value={pressForm.link} onChange={e => setPressForm({ ...pressForm, link: e.target.value })} placeholder="Link" />
              <Input value={pressForm.date_text} onChange={e => setPressForm({ ...pressForm, date_text: e.target.value })} placeholder="Date" />
              <Input value={pressForm.summary} onChange={e => setPressForm({ ...pressForm, summary: e.target.value })} placeholder="Summary" />

              <div className="flex gap-2">
                <Button type="button" onClick={handleAddPress}><Plus size={16}/> Add</Button>
                <Button type="button" variant="outline" onClick={() => setShowPressForm(false)}><X size={16}/> Cancel</Button>
              </div>
            </div>
          )}

          {press.map(item => (
            <div key={item.id} className="bg-card rounded-xl border p-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.date_text}</p>
              </div>
              <div className="flex gap-2">
                <a href={item.link} target="_blank" rel="noopener noreferrer"><ExternalLink size={16}/></a>
                <button type="button" onClick={(e) => { e.stopPropagation(); handleDeletePress(item.id); }} className="text-destructive">
                  <Trash2 size={16}/>
                </button>
              </div>
            </div>
          ))}
        </TabsContent>

        {/* PODCASTS */}
        <TabsContent value="podcasts" className="space-y-4">
          <div className="flex justify-end">
            <Button type="button" onClick={() => setShowPodcastForm(true)}><Plus size={18}/> Add Podcast</Button>
          </div>

          {showPodcastForm && (
            <div className="bg-card rounded-2xl border-2 border-primary p-6 space-y-4">
              <Input value={podcastForm.title} onChange={e => setPodcastForm({ ...podcastForm, title: e.target.value })} placeholder="Title" />
              <Input value={podcastForm.link} onChange={e => setPodcastForm({ ...podcastForm, link: e.target.value })} placeholder="Link" />
              <Input value={podcastForm.date_text} onChange={e => setPodcastForm({ ...podcastForm, date_text: e.target.value })} placeholder="Date" />
              <Input value={podcastForm.duration} onChange={e => setPodcastForm({ ...podcastForm, duration: e.target.value })} placeholder="Duration" />

              <div className="flex gap-2">
                <Button type="button" onClick={handleAddPodcast}><Plus size={16}/> Add</Button>
                <Button type="button" variant="outline" onClick={() => setShowPodcastForm(false)}><X size={16}/> Cancel</Button>
              </div>
            </div>
          )}

          {podcasts.map(item => (
            <div key={item.id} className="bg-card rounded-xl border p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-hero text-white flex items-center justify-center">
                  <Mic size={18}/>
                </div>
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.date_text}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <a href={item.link} target="_blank" rel="noopener noreferrer"><ExternalLink size={16}/></a>
                <button type="button" onClick={(e) => { e.stopPropagation(); handleDeletePodcast(item.id); }} className="text-destructive">
                  <Trash2 size={16}/>
                </button>
              </div>
            </div>
          ))}
        </TabsContent>

      </Tabs>
    </div>
  );
};

export default MediaManager;
