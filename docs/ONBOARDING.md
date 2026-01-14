# National Youth Alliance – Developer Onboarding Guide

Welcome to the National Youth Alliance (NYA) project.  
This document is the **single source of truth** for understanding the system, rules, and how to start contributing without breaking anything.

Read this completely before touching any code.

---

## 1. Purpose of This Document

This onboarding guide exists to:
- Help new developers understand the architecture
- Prevent accidental breaking of authentication, admin, or production logic
- Maintain consistency across all modules
- Ensure clean, scalable development

---

## 2. Project Overview

NYA is a full-stack platform consisting of:

- **Public Website** – For users, supporters, members
- **Admin Panel** – For internal operations & content management
- **Supabase Backend** – Auth, database, and security layer

There is **NO custom backend server**. Everything runs via Supabase.

---

## 3. Tech Stack

### Frontend
- React (Vite)
- TypeScript
- Tailwind CSS
- Framer Motion
- shadcn/ui
- Lucide Icons

### Backend
- Supabase
  - PostgreSQL
  - Google OAuth
  - Row Level Security (RLS)

---

## 4. Environment Setup

### Step 1: Clone Repository

```bash
git clone <repo_url>
cd <project_folder>
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Setup Environment Variables

Create `.env` file:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## 5. Project Structure

```
src/
│
├── components/
│   ├── ui/
│   └── common/
│
├── pages/
│   ├── public/
│   └── admin/
│
├── context/
│   └── AuthContext.tsx
│
├── lib/
│   └── supabase.ts
│
└── routes/
    └── AppRoutes.tsx
```

---

## 6. Supabase Client (IMPORTANT)

```ts
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: true,
  },
});
```

⚠️ **DO NOT MODIFY THIS** without explicit approval.  
This configuration is critical for admin auth stability.

---

## 7. Authentication System

### Public Users
- No auth
- Read-only access

### Admin Users
- Google OAuth login
- Must exist in `admins` table
- Permissions checked from database

Flow:

Google Login → Supabase Auth → admins table check → access granted/denied

---

## 8. Admin Rules (STRICT)

### You MUST NOT:
- Hardcode admin IDs
- Bypass permission checks
- Disable RLS
- Add fake auth logic
- Store admin data in localStorage

### You MUST:
- Always fetch admin data from `admins` table
- Respect permission flags
- Use AuthContext

---

## 9. Admin Pages Overview

| Page | Purpose |
|------|---------|
Dashboard | Stats & overview  
Blog Manager | Manage blogs  
Media Manager | Photos, videos, podcasts, press  
Chapter Manager | City chapters  
Team Manager | Core team  
Journey Manager | Org journey timeline  

---

## 10. Public Pages Overview

| Page | Purpose |
|------|---------|
Home | Landing page  
About | Vision, journey, leadership  
Chapters | City chapters  
Media | Public media gallery  
Blogs | Public blogs  
Join | Join form  
Contact | Contact info  

---

## 11. Database Tables (High Level)

### admins
- id (uuid)
- email
- name
- is_master
- permissions (jsonb)

### blogs
- id
- title
- content
- excerpt
- cover_image
- tag
- status
- author
- created_at

### media_photos
- id
- title
- tag
- image_url

### media_videos
- id
- title
- thumbnail_url
- video_link

### media_press
- id
- title
- link
- date_text
- summary

### media_podcasts
- id
- title
- link
- date_text
- duration

### chapters
- id
- city
- state
- lead_name
- lead_contact
- is_active

### team_members
- id
- name
- role
- photo
- social_links
- order_index

---

## 12. How You Should Start Working

### Step 1
Pick **ONE module only** (e.g. Blog Manager)

### Step 2
Understand:
- UI file
- Supabase table
- Permissions

### Step 3
Implement UI first  
Then integrate Supabase  
Then test

---

## 13. Coding Standards

### Always:
- Use async/await
- Handle errors
- Show toast notifications
- Use loading states
- Keep components small

### Never:
- Write business logic in JSX
- Mix admin & public logic
- Commit broken code

---

## 14. Branching Rules

- main → stable only
- dev → active development
- feature/* → new features
- fix/* → bug fixes

---

## 15. Commit Rules

Format:

```
[type]: short description

Example:
feat: add blog editor UI
fix: media delete button not working
```

---

## 16. Known Problem Areas

⚠️ **Do not touch without coordination**

- AuthContext.tsx
- ProtectedRoute logic
- Supabase client config
- Admin permission checks

---

## 17. Testing Rules

Before pushing:
- Test admin login
- Test at least one CRUD action
- Check console for errors
- Check network tab

---

## 18. Communication Rules

If something breaks:
1. Stop
2. Inform project owner
3. Share logs
4. Do NOT hotfix blindly

---

## 19. Design Rules

- Do not change design system without approval
- Maintain consistency
- Use existing components
- Do not add random colors

---

## 20. Responsibility

This is a **production system**.  
You are responsible for:
- Your code quality
- System stability
- Data safety

No shortcuts. No hacks. No experiments in main flow.

---

## 21. Owner & Authority

Project Owner: **Nishit Kumar**  
Organization: **National Youth Alliance**

All architectural decisions go through owner.

---

## 22. Final Note

If you are unsure about anything:
**ASK. Do not assume.**

This project is large, sensitive, and long-term.

Welcome to NYA.
Build responsibly.
