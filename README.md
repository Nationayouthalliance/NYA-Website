# National Youth Alliance (NYA) – Full Stack Platform

Welcome to the official repository of National Youth Alliance (NYA).  
This project contains the public website, admin dashboard, authentication system, and complete content management infrastructure for NYA.

This is a production-grade system built with strict permission control, structured architecture, and Supabase as the backend.

---

PROJECT OVERVIEW

NYA is a youth-led organization platform that includes:
- Public website (Home, About, Blogs, Media, Team, Chapters, Journey, etc.)
- Admin dashboard for managing all content
- Role-based access control
- Secure Google OAuth authentication
- Supabase-powered backend (Postgres + Auth + RLS)

---

TECH STACK

Frontend:
- React + TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- shadcn/ui

Backend:
- Supabase
  - PostgreSQL database
  - Auth (Google OAuth)
  - Row Level Security (RLS)

---

FOLDER STRUCTURE

/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   │   ├── public/
│   │   └── admin/
│   ├── layouts/
│   ├── hooks/
│   ├── context/
│   │   └── AuthContext.tsx
│   ├── lib/
│   │   └── supabase.ts
│   ├── data/
│   └── styles/
├── docs/
│   ├── API_AND_DB_SCHEMA.md
│   └── ONBOARDING.md
├── .env
├── package.json
└── README.md

---

AUTHENTICATION SYSTEM

Only Google OAuth is used.
No email/password login.
Every user must exist in the admins table to access admin panel.

Authentication flow:
Google Sign-In → Supabase Auth → Check admins table → Allow or Deny

---

ADMIN SYSTEM

All admin access is controlled via the admins table.

Each admin has:
- id (UUID from auth)
- email
- name
- is_master (true or false)
- permissions (JSON object)

Example permissions:
{
  "blogs": true,
  "media": true,
  "chapters": false,
  "team": true,
  "journey": false
}

---

SECURITY MODEL

This project uses strict Row Level Security (RLS).

Public Users:
- Can only read published content
- No write access anywhere

Admin Users:
- Can create, update, delete based on permissions
- Access is validated via auth.uid() IN (SELECT id FROM admins)

---

DATABASE OVERVIEW

Main tables:

admins – Admin access control  
blogs – Blog posts  
media_photos – Photo gallery  
media_videos – Video gallery  
media_press – Press coverage  
media_podcasts – Podcasts  
chapters – City chapters  
team_members – Team profiles  
journey_timeline – Organization journey timeline  

Full schema is documented in:
docs/API_AND_DB_SCHEMA.md

---

PUBLIC PAGES

Public pages are read-only and include:
- Home
- About
- Blogs
- Media
- Team
- Chapters
- Journey

These pages fetch data directly from Supabase using select() with RLS protection.

---

ADMIN PAGES

Admin dashboard includes:
- Blog Manager
- Media Manager (Photos, Videos, Press, Podcasts)
- Chapter Manager
- Team Manager
- Journey Manager
- Admin & Permission Manager

Each admin page:
- Checks permissions
- Uses Supabase for CRUD
- Handles errors and loading states

---

SUPABASE CLIENT CONFIGURATION

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: true,
  },
});

Do not change this unless you fully understand the auth implications.

---

IMPORTANT RULES

Do NOT bypass RLS  
Do NOT hardcode admin IDs  
Do NOT add custom backend server  
Do NOT store secrets in frontend  
Do NOT modify auth flow without approval  

Always use Supabase client  
Always check permissions before actions  
Always handle errors  

---

DEBUGGING GUIDE

If something is not working:
1. Check browser console
2. Check network tab
3. Check Supabase table data
4. Check RLS policies
5. Check admin permissions
6. Check AuthContext logs

---

FOR NEW DEVELOPERS

Before writing code:
1. Read docs/API_AND_DB_SCHEMA.md
2. Understand the permission system
3. Understand RLS
4. Ask before changing schema

This is a sensitive system. Changes can break production.

---

SETUP INSTRUCTIONS

1. Clone repo
2. Install dependencies
   npm install
3. Create .env file:
   VITE_SUPABASE_URL=your_url
   VITE_SUPABASE_ANON_KEY=your_key
4. Run:
   npm run dev

---

OWNERSHIP AND AUTHORITY

Project Owner: Nishit Kumar  
Organization: National Youth Alliance

All major changes require owner approval.

---

FINAL NOTE

This project is:
- Permission-sensitive
- Security-sensitive
- Production-critical

Do not experiment blindly. Do not guess. Ask first.

END OF README
