# LMS Frontend – React Library Management Interface

Modern single-page application consuming a production-grade Django REST API for library operations.

**Live Demo**  
https://library-management-frontend-sepia.vercel.app

**Backend API** (separate repository)  
https://library-management-api-ym28.onrender.com/api

**Backend Repository**  
https://github.com/Fraol-12/library-management-api



## Tech Stack

- **Framework** — React 18 + Vite  
- **Styling** — Tailwind CSS v3 (utility-first, mobile-first)  
- **API Client** — Axios with request/response interceptors  
- **Routing** — React Router v6 (protected routes, dynamic params)  
- **Forms & Validation** — react-hook-form + Zod  
- **Notifications** — react-hot-toast  
- **State Management** — React Context API (lightweight auth store)  
- **Deployment** — Vercel (zero-config CI/CD)

## Architectural Decisions & Rationale

- **Single API Client** (`src/api/client.js`)  
  Centralized Axios instance with JWT bearer token injection and global error handling (401 → redirect to login, 403 → permission toast, network failures → user-friendly message). Eliminates duplicated auth/error logic.

- **Auth as Context** (`AuthContext.jsx` + `useAuth` hook)  
  Single source of truth for authentication state. Avoids prop drilling while keeping bundle size minimal (no Redux/Zustand needed for this scope).

- **Protected Routes Pattern** (`PrivateRoute.jsx`)  
  Declarative authorization: unauthenticated users are redirected to `/login`. Role checks (staff vs member) added when needed.

- **Form Handling**  
  `react-hook-form` for minimal re-renders + `zod` for schema-based validation → consistent validation UX, type safety, and easy extension.

- **Real-world UX Patterns**  
  - Loading skeletons instead of blank states  
  - Inline validation + disabled actions  
  - Optimistic UI on borrow/return (future rollback)  
  - Non-blocking toasts for every async action

## Core Features

- Public landing page with hero & value proposition cards
- Catalog with server-side search & availability filtering
- Book detail view (cover, metadata, synopsis, borrow action)
- JWT authentication flow: register → auto-login, login, logout
- Protected member dashboard showing active loans + return functionality
- Responsive design (mobile-first Tailwind breakpoints)

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev