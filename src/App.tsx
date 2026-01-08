import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import { AdminLayout } from "@/components/admin/AdminLayout";

// Public pages
import Index from "./pages/Index";
import About from "./pages/About";
import Team from "./pages/Team";
import Chapters from "./pages/Chapters";
import Resources from "./pages/Resources";
import Media from "./pages/Media";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Join from "./pages/Join";
import JoinNYA from "./pages/JoinNYA";
import Report from "./pages/Report";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Maintenance from "./pages/Maintenance";

// Admin pages
import Login from "./pages/admin/Login";
import AccessDenied from "./pages/admin/AccessDenied";
import Dashboard from "./pages/admin/Dashboard";
import HomeManager from "./pages/admin/HomeManager";
import JourneyManager from "./pages/admin/JourneyManager";
import TeamManager from "./pages/admin/TeamManager";
import ChaptersManager from "./pages/admin/ChaptersManager";
import MediaManager from "./pages/admin/MediaManager";
import ResourcesManager from "./pages/admin/ResourcesManager";
import BlogManager from "./pages/admin/BlogManager";
import JoinRequestsManager from "./pages/admin/JoinRequestsManager";
import ReportsManager from "./pages/admin/ReportsManager";
import ActivityLogs from "./pages/admin/ActivityLogs";
import AdminsManager from "./pages/admin/AdminsManager";
import SettingsManager from "./pages/admin/SettingsManager";
import { ScrollToTop } from "@/components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/team" element={<Team />} />
            <Route path="/chapters" element={<Chapters />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/media" element={<Media />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/join" element={<Join />} />
            <Route path="/join-nya" element={<JoinNYA />} />
            <Route path="/report" element={<Report />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/503" element={<Maintenance />} />
          
            {/* Admin Routes - temporarily inaccessible */}
            {/**
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/access-denied" element={<AccessDenied />} />
            <Route path="/admin" element={<ProtectedRoute><AdminLayout><Dashboard /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/home" element={<ProtectedRoute requiredPermission="homeManager"><AdminLayout><HomeManager /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/journey" element={<ProtectedRoute requiredPermission="journeyManager"><AdminLayout><JourneyManager /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/team" element={<ProtectedRoute requiredPermission="team"><AdminLayout><TeamManager /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/chapters" element={<ProtectedRoute requiredPermission="chapters"><AdminLayout><ChaptersManager /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/media" element={<ProtectedRoute requiredPermission="media"><AdminLayout><MediaManager /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/resources" element={<ProtectedRoute requiredPermission="resources"><AdminLayout><ResourcesManager /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/blog" element={<ProtectedRoute requiredPermission="blog"><AdminLayout><BlogManager /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/join-requests" element={<ProtectedRoute requiredPermission="joinRequests"><AdminLayout><JoinRequestsManager /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/reports" element={<ProtectedRoute requiredPermission="reports"><AdminLayout><ReportsManager /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/logs" element={<ProtectedRoute requiredPermission="logs"><AdminLayout><ActivityLogs /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/admins" element={<ProtectedRoute requiredPermission="admins"><AdminLayout><AdminsManager /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/settings" element={<ProtectedRoute requiredPermission="settings"><AdminLayout><SettingsManager /></AdminLayout></ProtectedRoute>} />
            */}
          
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
