import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Plus, Trash2, Edit, X, BookOpen, Eye, EyeOff, Image as ImageIcon, Save
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import blogData from '@/data/blog.json';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  coverImage: string;
  tag: string;
  status: 'draft' | 'published';
  author: string;
  date: string;
}

const tags = ['Success Stories', 'Opinion', 'Movement', 'How-To'];

const BlogManager = () => {
  const [posts, setPosts] = useState<BlogPost[]>(
    blogData.map((p, i) => ({
      id: p.id || `post-${i}`,
      title: p.title,
      content: p.content || '',
      excerpt: p.excerpt || '',
      coverImage: (p as any).coverImage || '/placeholder.svg',
      tag: p.category || 'Movement',
      status: 'published' as const,
      author: p.author || 'NYA Team',
      date: p.date || new Date().toISOString().split('T')[0],
    }))
  );
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: '',
    content: '',
    excerpt: '',
    coverImage: '',
    tag: 'Movement',
    status: 'draft' as 'draft' | 'published',
  });
  const { toast } = useToast();

  const resetForm = () => {
    setForm({
      title: '',
      content: '',
      excerpt: '',
      coverImage: '',
      tag: 'Movement',
      status: 'draft',
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = () => {
    if (!form.title || !form.content) {
      toast({ title: "Title and content are required", variant: "destructive" });
      return;
    }

    if (editingId) {
      setPosts(posts.map(p => 
        p.id === editingId 
          ? { ...p, ...form, excerpt: form.excerpt || form.content.substring(0, 150) + '...' }
          : p
      ));
      console.log('Updated blog post:', { id: editingId, ...form });
      toast({ title: "Post updated! ✏️" });
    } else {
      const newPost: BlogPost = {
        id: `post-${Date.now()}`,
        ...form,
        excerpt: form.excerpt || form.content.substring(0, 150) + '...',
        author: 'Admin',
        date: new Date().toISOString().split('T')[0],
      };
      setPosts([newPost, ...posts]);
      console.log('Created blog post:', newPost);
      toast({ title: "Post created! 📝" });
    }
    resetForm();
  };

  const handleEdit = (post: BlogPost) => {
    setForm({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      coverImage: post.coverImage,
      tag: post.tag,
      status: post.status,
    });
    setEditingId(post.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setPosts(posts.filter(p => p.id !== id));
    console.log('Deleted blog post:', id);
    toast({ title: "Post deleted" });
  };

  const togglePublish = (id: string) => {
    setPosts(posts.map(p => 
      p.id === id 
        ? { ...p, status: p.status === 'published' ? 'draft' : 'published' }
        : p
    ));
    const post = posts.find(p => p.id === id);
    console.log('Toggled publish status:', { id, newStatus: post?.status === 'published' ? 'draft' : 'published' });
    toast({ title: post?.status === 'published' ? "Unpublished" : "Published! 🎉" });
  };

  return (
    <div className="space-y-6">
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
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <Input
                    placeholder="Post title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Cover Image URL</label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="https://..."
                      value={form.coverImage}
                      onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
                      className="rounded-xl"
                    />
                    <Button variant="outline" className="rounded-xl">
                      <ImageIcon size={18} />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Tag</label>
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
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Status</label>
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
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Excerpt (optional)</label>
                  <Textarea
                    placeholder="Short description..."
                    value={form.excerpt}
                    onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                    rows={2}
                    className="rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Content</label>
                  <Textarea
                    placeholder="Write your post content here... (supports markdown)"
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    rows={10}
                    className="rounded-xl font-mono text-sm"
                  />
                </div>

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

      {/* Posts List */}
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
              {post.coverImage && (
                <img 
                  src={post.coverImage} 
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
                <h3 className="font-semibold text-foreground truncate">{post.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-1">{post.excerpt}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {post.author} • {post.date}
                </p>
              </div>
              <div className="flex gap-1">
                <button 
                  onClick={() => togglePublish(post.id)}
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
