# National Youth Alliance – Full Project Documentation

> Internal documentation for developers working on NYA website, admin panel, and backend.

---

## 1. Project Overview

**Project Name:** National Youth Alliance (NYA)

The National Youth Alliance platform is the official digital infrastructure for managing the organization’s public presence, chapters, team, media, and internal administration.

The system includes:
- Public Website (for visitors, members, and supporters)
- Admin Panel (for internal management)
- Supabase Backend (database, authentication, security)

This project is designed to be scalable, modular, and secure.

---

## 2. High Level Architecture

Frontend (React + Vite)  
↓  
Supabase (Auth + PostgreSQL + RLS)  
↓  
Public Users / Admin Users

There is no custom backend server. All backend logic is handled using Supabase.

---

## 3. Tech Stack

### Frontend
- React (Vite)
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide Icons
- shadcn/ui components

### Backend
- Supabase
  - PostgreSQL Database
  - Supabase Auth (Google OAuth)
  - Row Level Security (RLS)

---

## 4. Folder Structure

src/
│
├── components/
│   ├── ui/
│   ├── common/
│
├── pages/
│   ├── public/
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Chapters.tsx
│   │   ├── Media.tsx
│   │   ├── Blogs.tsx
│   │   ├── Join.tsx
│   │   └── Contact.tsx
│   │
│   └── admin/
│       ├── Dashboard.tsx
│       ├── BlogManager.tsx
│       ├── MediaManager.tsx
│       ├── ChapterManager.tsx
│       ├── TeamManager.tsx
│       └── AuthGuard.tsx
│
├── context/
│   └── AuthContext.tsx
│
├── lib/
│   └── supabase.ts
│
└── routes/
    └── AppRoutes.tsx

---

## 5. Supabase Configuration

Environment Variables:

VITE_SUPABASE_URL=your_url  
VITE_SUPABASE_ANON_KEY=your_anon_key  

supabase.ts:

```ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: true,
  },
});
```

This configuration is intentional to avoid session conflicts in admin flow.

---

## 6. Authentication Flow

### Public Users
- No authentication required
- Read-only access

### Admin Users
- Google OAuth login
- Must exist in `admins` table
- Permissions are checked from DB

Flow:

Google Login  
→ Supabase Auth  
→ Check in admins table  
→ Allow or deny access  

---

## 7. Admin Table Schema

Table: admins

- id (uuid, primary key)
- email (text)
- name (text)
- is_master (boolean)
- permissions (jsonb)
- created_at (timestamp)

Permissions example:

```json
{
  "blogs": true,
  "media": true,
  "chapters": false,
  "team": true
}
```

---

## 8. Public Pages

### Home Page
- Hero section
- Mission
- CTA to Join

### About Page
- Vision
- Journey
- Leadership

### Chapters Page
- City-wise chapters list
- Fetched from `chapters` table

### Media Page
- Photos
- Videos
- Press
- Podcasts
- All fetched from respective media tables

### Blogs Page
- Only `status = published` blogs
- Fetched from `blogs` table

### Join Page
- Form submission
- Inserts into `join_requests` table

### Contact Page
- Static info + contact form

---

## 9. Admin Pages

### Dashboard
- Overview stats
- Total chapters
- Total members
- Total blogs

---

### Blog Manager

Responsibilities:
- Create blog
- Edit blog
- Delete blog
- Publish / Unpublish

Table: blogs

- id
- title
- content
- excerpt
- cover_image
- tag
- status (draft | published)
- author
- created_at

Rules:
- Only published blogs show on public site
- Drafts are hidden

---

### Media Manager

Tables:

media_photos  
- id  
- title  
- tag  
- image_url  
- created_at  

media_videos  
- id  
- title  
- thumbnail_url  
- video_link  
- created_at  

media_press  
- id  
- title  
- link  
- date_text  
- summary  
- created_at  

media_podcasts  
- id  
- title  
- link  
- date_text  
- duration  
- created_at  

---

### Chapter Manager

Table: chapters

- id
- city
- state
- lead_name
- lead_contact
- is_active

---

### Team Manager

Table: team_members

- id
- name
- role
- photo
- social_links
- order_index

---

## 10. Routing Rules

### Public Routes

/
 /about  
 /chapters  
 /media  
 /blogs  
 /join  
 /contact  

### Admin Routes

/admin  
/admin/blogs  
/admin/media  
/admin/chapters  
/admin/team  

All admin routes must be wrapped with AuthGuard.

---

## 11. Coding Rules

### Do NOT
- Use local JSON for production
- Hardcode data
- Bypass Supabase
- Disable RLS

### Always
- Fetch from Supabase
- Handle errors
- Show toast notifications
- Use loading states
- Respect permissions

---

## 12. Known Issues

- Admin add actions sometimes freeze
- MediaManager insert issues
- BlogManager insert issues

These are under refactor and should not be worked on without coordination.

---

## 13. How New Developers Should Work

1. Do not touch AuthContext without permission
2. Pick one module only
3. Complete UI first
4. Then integrate Supabase
5. Test with real data

---

## 14. Deployment

Frontend:
- Vercel or Netlify

Backend:
- Supabase hosted

---

## 15. Roadmap

- Fix admin CRUD freezes
- Stabilize Media Manager
- Stabilize Blog Manager
- Finish public pages
- Add analytics
- Add notifications

---

## 16. Ownership

Project Owner: Nishit Kumar  
Organization: National Youth Alliance  

All architectural decisions must go through owner.
