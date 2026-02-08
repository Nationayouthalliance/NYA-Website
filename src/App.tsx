import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ScrollToTop } from "@/components/ScrollToTop";
import SEO from "@/components/SEO";

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
            <Route path="/" element={<><SEO title="Youth Organization in India | National Youth Alliance" description="National Youth Alliance (NYA) is a youth-led organization in India empowering young citizens for transparency and accountability." /><Index /></>} />
            <Route path="/about" element={<><SEO title="About National Youth Alliance" description="Learn about the mission, vision, and values of National Youth Alliance." /><About /></>} />
            <Route path="/team" element={<><SEO title="NYA Team | National Youth Alliance" description="Meet the team behind National Youth Alliance driving youth-led change in India." /><Team /></>} />
            <Route path="/chapters" element={<><SEO title="NYA Chapters Across India" description="Explore National Youth Alliance chapters operating across India." /><Chapters /></>} />
            <Route path="/resources" element={<><SEO title="Resources | National Youth Alliance" description="Reports, documents, and resources published by National Youth Alliance." /><Resources /></>} />
            <Route path="/media" element={<><SEO title="Media | National Youth Alliance" description="Photos, videos, and media coverage of National Youth Alliance." /><Media /></>} />
            <Route path="/blog" element={<><SEO title="Blog | National Youth Alliance" description="Articles and updates from National Youth Alliance." /><Blog /></>} />
            <Route path="/blog/:slug" element={<><SEO title="NYA Blog Post" description="Article published by National Youth Alliance." /><BlogPost /></>} />
            <Route path="/join" element={<><SEO title="Join National Youth Alliance" description="Join National Youth Alliance and be part of a youth-led movement." /><Join /></>} />
            <Route path="/join-nya" element={<><SEO title="Join NYA | National Youth Alliance" description="Apply to become a member of National Youth Alliance." /><JoinNYA /></>} />
            <Route path="/report" element={<><SEO title="Report an Issue | National Youth Alliance" description="Report issues securely to National Youth Alliance." /><Report /></>} />
            <Route path="/contact" element={<><SEO title="Contact National Youth Alliance" description="Get in touch with National Youth Alliance." /><Contact /></>} />
            <Route path="/503" element={<><SEO title="Maintenance | NYA" description="Website under maintenance." noIndex /><Maintenance /></>} />

            {/* Admin Routes (NO INDEX) */}
            <Route path="/admin/login" element={<><SEO title="Admin Login | NYA" description="Admin Login" noIndex /><Login /></>} />
            <Route path="/admin/access-denied" element={<><SEO title="Access Denied" description="Access Denied" noIndex /><AccessDenied /></>} />

            <Route path="/admin" element={<><SEO title="Admin Dashboard" description="Admin Dashboard" noIndex /><ProtectedRoute><AdminLayout><Dashboard /></AdminLayout></ProtectedRoute></>} />
            <Route path="/admin/home" element={<><SEO title="Home Manager" description="Admin" noIndex /><ProtectedRoute requiredPermission="homeManager"><AdminLayout><HomeManager /></AdminLayout></ProtectedRoute></>} />
            <Route path="/admin/journey" element={<><SEO title="Journey Manager" description="Admin" noIndex /><ProtectedRoute requiredPermission="journeyManager"><AdminLayout><JourneyManager /></AdminLayout></ProtectedRoute></>} />
            <Route path="/admin/team" element={<><SEO title="Team Manager" description="Admin" noIndex /><ProtectedRoute requiredPermission="team"><AdminLayout><TeamManager /></AdminLayout></ProtectedRoute></>} />
            <Route path="/admin/chapters" element={<><SEO title="Chapters Manager" description="Admin" noIndex /><ProtectedRoute requiredPermission="chapters"><AdminLayout><ChaptersManager /></AdminLayout></ProtectedRoute></>} />
            <Route path="/admin/media" element={<><SEO title="Media Manager" description="Admin" noIndex /><ProtectedRoute requiredPermission="media"><AdminLayout><MediaManager /></AdminLayout></ProtectedRoute></>} />
            <Route path="/admin/resources" element={<><SEO title="Resources Manager" description="Admin" noIndex /><ProtectedRoute requiredPermission="resources"><AdminLayout><ResourcesManager /></AdminLayout></ProtectedRoute></>} />
            <Route path="/admin/blog" element={<><SEO title="Blog Manager" description="Admin" noIndex /><ProtectedRoute requiredPermission="blog"><AdminLayout><BlogManager /></AdminLayout></ProtectedRoute></>} />
            <Route path="/admin/join-requests" element={<><SEO title="Join Requests" description="Admin" noIndex /><ProtectedRoute requiredPermission="joinRequests"><AdminLayout><JoinRequestsManager /></AdminLayout></ProtectedRoute></>} />
            <Route path="/admin/reports" element={<><SEO title="Reports Manager" description="Admin" noIndex /><ProtectedRoute requiredPermission="reports"><AdminLayout><ReportsManager /></AdminLayout></ProtectedRoute></>} />
            <Route path="/admin/logs" element={<><SEO title="Activity Logs" description="Admin" noIndex /><ProtectedRoute requiredPermission="logs"><AdminLayout><ActivityLogs /></AdminLayout></ProtectedRoute></>} />
            <Route path="/admin/admins" element={<><SEO title="Admins Manager" description="Admin" noIndex /><ProtectedRoute requiredPermission="admins"><AdminLayout><AdminsManager /></AdminLayout></ProtectedRoute></>} />
            <Route path="/admin/settings" element={<><SEO title="Settings Manager" description="Admin" noIndex /><ProtectedRoute requiredPermission="settings"><AdminLayout><SettingsManager /></AdminLayout></ProtectedRoute></>} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />

          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
