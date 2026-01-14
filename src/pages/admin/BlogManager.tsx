import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Plus, Trash2, Edit, X, Eye, EyeOff, Image as ImageIcon, Save
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  cover_image: string;
  tag: string;
  status: 'draft' | 'published';
  date: string;
}

const tags = ['Success Stories', 'Opinion', 'Movement', 'How-To'];

const BlogManager = () => {
  const { toast } = useToast();

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: '',
    content: '',
    excerpt: '',
    cover_image: '',
    tag: 'Movement',
    status: 'draft' as 'draft' | 'published',
  });

  /* ================= FETCH ================= */
  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('FETCH BLOG ERROR:', error);
      toast({ title: 'Failed to load blog posts', variant: 'destructive' });
    } else {
      setPosts(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  /* ================= HELPERS ================= */
  const resetForm = () => {
    setForm({
      title: '',
      content: '',
      excerpt: '',
      cover_image: '',
      tag: 'Movement',
      status: 'draft',
    });
    setEditingId(null);
    setShowForm(false);
  };

  /* ================= CREATE / UPDATE ================= */
  const handleSubmit = async () => {
  console.log("BLOG SUBMIT CLICKED", form);

  if (!form.title || !form.content) {
    toast({ title: 'Title and content are required', variant: 'destructive' });
    return;
  }

  const payload = {
    title: form.title,
    content: form.content,
    excerpt: form.excerpt || form.content.substring(0, 150) + '...',
    cover_image: form.cover_image || null,
    tag: form.tag,
    status: form.status,
    date: new Date().toISOString(),
    author_admin_id: null, // IMPORTANT (until you wire admin id)
  };

  console.log("BLOG PAYLOAD:", payload);

  const { data, error } = await supabase
    .from('blog_posts')
    .insert([payload])
    .select();

  console.log("BLOG SUPABASE RESPONSE:", { data, error });

  if (error) {
    console.error("BLOG INSERT ERROR:", error);
    toast({ title: error.message, variant: 'destructive' });
    return;
  }

  toast({ title: 'Post created successfully 📝' });
  resetForm();
  fetchPosts();
};


  /* ================= EDIT ================= */
  const handleEdit = (post: BlogPost) => {
    setForm({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      cover_image: post.cover_image || '',
      tag: post.tag,
      status: post.status,
    });
    setEditingId(post.id);
    setShowForm(true);
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('DELETE BLOG ERROR:', error);
      toast({ title: error.message, variant: 'destructive' });
      return;
    }

    toast({ title: 'Post deleted 🗑️' });
    fetchPosts();
  };

  /* ================= TOGGLE STATUS ================= */
  const togglePublish = async (post: BlogPost) => {
    const newStatus = post.status === 'published' ? 'draft' : 'published';

    const { error } = await supabase
      .from('blog_posts')
      .update({ status: newStatus })
      .eq('id', post.id);

    if (error) {
      console.error('TOGGLE BLOG ERROR:', error);
      toast({ title: error.message, variant: 'destructive' });
      return;
    }

    toast({ title: newStatus === 'published' ? 'Published 🎉' : 'Unpublished' });
    fetchPosts();
  };

  /* ================= UI ================= */
  return (
    <div className="space-y-6">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="font-display text-3xl font-bold">Blog Manager</h1>
          <p className="text-muted-foreground mt-1">Create and manage blog posts</p>
        </div>
        <Button
          onClick={() => setShowForm(true)}
          className="rounded-full bg-gradient-hero text-white"
        >
          <Plus size={18} /> New Post
        </Button>
      </motion.div>

      {/* FORM MODAL */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={resetForm}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background rounded-3xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >

              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl font-bold">
                  {editingId ? 'Edit Post' : 'Create New Post'}
                </h2>
                <button onClick={resetForm} className="p-2 rounded-xl hover:bg-muted">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">

                <Input
                  placeholder="Post title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="rounded-xl"
                />

                <div className="flex gap-2">
                  <Input
                    placeholder="Cover image URL"
                    value={form.cover_image}
                    onChange={(e) => setForm({ ...form, cover_image: e.target.value })}
                    className="rounded-xl"
                  />
                  <Button variant="outline" className="rounded-xl">
                    <ImageIcon size={18} />
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Select value={form.tag} onValueChange={(v) => setForm({ ...form, tag: v })}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {tags.map(tag => (
                        <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={form.status}
                    onValueChange={(v) => setForm({ ...form, status: v as 'draft' | 'published' })}
                  >
                    <SelectTrigger className="rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Textarea
                  placeholder="Excerpt (optional)"
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  rows={2}
                  className="rounded-xl"
                />

                <Textarea
                  placeholder="Write your post content here..."
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  rows={10}
                  className="rounded-xl font-mono text-sm"
                />

                <div className="flex gap-2 pt-4">
                  <Button onClick={handleSubmit} className="flex-1 rounded-xl bg-gradient-hero text-white">
                    <Save size={18} /> {editingId ? 'Update Post' : 'Create Post'}
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

      {/* POSTS LIST */}
      <div className="space-y-3">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
            className="bg-card rounded-xl border border-border p-4 hover:border-primary/30 transition-all"
          >
            <div className="flex items-start gap-4">

              {post.cover_image && (
                <img
                  src={post.cover_image}
                  alt=""
                  className="w-20 h-20 rounded-xl object-cover shrink-0"
                />
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    post.status === 'published'
                      ? 'bg-green/10 text-green'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {post.status}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    {post.tag}
                  </span>
                </div>

                <h3 className="font-semibold truncate">{post.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-1">{post.excerpt}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date(post.date).toLocaleDateString()}
                </p>
              </div>

              <div className="flex gap-1">
                <button
                  onClick={() => togglePublish(post)}
                  className="p-2 rounded-lg hover:bg-muted"
                  title={post.status === 'published' ? 'Unpublish' : 'Publish'}
                >
                  {post.status === 'published' ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                <button
                  onClick={() => handleEdit(post)}
                  className="p-2 rounded-lg hover:bg-muted"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="p-2 rounded-lg hover:bg-destructive/10 text-destructive"
                >
                  <Trash2 size={16} />
                </button>
              </div>

            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
};

export default BlogManager;
