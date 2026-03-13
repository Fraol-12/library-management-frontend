# LMS Frontend – Modern React Library Interface

Responsive single-page application consuming a real Django REST API for library management.

**Live Demo**  
https://<your-vercel-domain>.vercel.app

**Backend API** (built separately)  
https://library-management-api-ym28.onrender.com/

**Backend Repo**  
https://github.com/Fraol-12/library-management-api


## Tech Stack & Architecture

- React 18 + Vite (fast dev & build)
- Tailwind CSS v3 (utility-first, responsive-first design)
- Axios (centralized API client with interceptors)
- React Router v6 (protected routes, dynamic params)
- React Hook Form + Zod (type-safe forms & validation)
- React Hot Toast (non-blocking notifications)
- Context API (lightweight global auth state)
- Vercel (zero-config deployment)

### Key Architectural Decisions

- **Centralized API layer** (`src/api/client.js`)  
  Single Axios instance → request/response interceptors for JWT auto-attachment and global error handling (401 → redirect to login, 403 → permission toast, network errors → user-friendly message)

- **Auth as Context** (`AuthContext.jsx` + `useAuth` hook)  
  Avoids prop drilling, single source of truth for token/user/isAuthenticated

- **Protected routes** (`PrivateRoute.jsx`)  
  Redirects unauthenticated users to /login, protects /dashboard

- **Form handling**  
  react-hook-form for minimal re-renders + Zod for schema validation → consistent validation UX

- **Real-world UX patterns**  
  Loading skeletons, inline errors, disabled states, optimistic updates (borrow/return), toast feedback

## Features Implemented

- Public landing page with hero & feature cards
- Public catalog with search, filter (available/all), loading skeletons
- Book detail view (cover, metadata, synopsis, borrow button)
- JWT auth: register → auto-login, login, logout
- Protected member dashboard with active loans & return functionality
- Responsive design (mobile-first Tailwind)

## How to Run Locally

```bash
# Install dependencies
npm install

# Start dev server
npm run dev