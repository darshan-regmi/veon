# Veon — Personal App Store

![Veon](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![Firebase](https://img.shields.io/badge/Firebase-Firestore%20%2B%20Auth-yellow?style=flat-square&logo=firebase)
![Supabase](https://img.shields.io/badge/Supabase-Storage-3ECF8E?style=flat-square&logo=supabase)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=flat-square)

**Veon** is a personal web app store for showcasing and distributing Android apps. Think of it as a mini Play Store — curated, clean, and fully yours.

Built with **Next.js 16**, **Firebase**, and **Supabase Storage**, Veon gives you full control over branding, download links, version history, and app updates.

---

## Features

- **App Catalog** — Browse all apps with search and category filtering
- **App Detail Pages** — Screenshots carousel, features list, version changelog
- **Download Tracking** — Every download is counted in Firestore
- **Admin Panel** — Add, edit, and delete apps behind a protected route
- **GitHub Integration** — Sync version, release date, download URL, and changelog from GitHub Releases (supports private repos via PAT)
- **Image Uploads** — App icons and screenshots uploaded to Supabase Storage
- **APK Hosting** — APK files hosted on GitHub Releases (free, unlimited)
- **Auth** — Firebase Authentication (Email/Password + Google Sign-In)
- **Role-based Access** — Admin role stored in Firestore `users` collection
- **SEO** — `sitemap.ts`, `robots.ts`, Open Graph tags, JSON-LD structured data

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Database | Firebase Firestore |
| Authentication | Firebase Auth |
| Image Storage | Supabase Storage |
| APK Storage | GitHub Releases |
| Hosting | Cloudflare Pages |

---

## Project Structure

```
veon/
├── app/
│   ├── layout.tsx                    # Root layout with AuthProvider + SEO metadata
│   ├── page.tsx                      # Homepage with featured apps from Firestore
│   ├── apps/
│   │   ├── page.tsx                  # App catalog (search + category filter)
│   │   └── [slug]/
│   │       └── page.tsx              # App detail (screenshots, features, changelog)
│   ├── admin/
│   │   ├── page.tsx                  # Admin dashboard (stats + app management)
│   │   └── apps/
│   │       ├── add/page.tsx          # Add new app form
│   │       └── edit/[id]/page.tsx    # Edit existing app form
│   ├── api/
│   │   └── github/
│   │       └── release/route.ts      # Server-side GitHub release proxy (uses PAT)
│   ├── auth/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── privacy/page.tsx
│   ├── terms/page.tsx
│   ├── robots.ts
│   └── sitemap.ts
│
├── components/
│   ├── AppCard.tsx                   # App listing card
│   ├── DownloadButton.tsx            # Tracks downloads + opens APK URL
│   ├── Screenshots.tsx               # Portrait screenshot carousel
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ProtectedRoute.tsx            # Wraps admin pages (requireAdmin prop)
│   └── ui/                           # shadcn/ui primitives
│
├── lib/
│   ├── types.ts                      # App interface + AppInput type
│   ├── firebase.ts                   # Firebase client initialization
│   ├── firebase-admin.ts             # Firebase Admin SDK (server-side)
│   ├── firestore.ts                  # getAllApps, getFeaturedApps, getAppBySlug, etc.
│   ├── auth.tsx                      # AuthContext + useAuth hook
│   ├── github.ts                     # getLatestRelease() — calls /api/github/release
│   ├── supabase.ts                   # Supabase client
│   ├── storage.ts                    # uploadImage() via Supabase Storage
│   └── utils.ts
│
├── hooks/
│   └── use-toast.ts
│
├── public/
│   ├── manifest.json
│   ├── og-image.png
│   ├── logo.png
│   └── favicon.png
│
├── .env.local                        # Environment variables (never commit this)
├── next.config.ts
├── postcss.config.mjs
└── tsconfig.json
```

---

## Quick Start

### Prerequisites

- Node.js 20+
- npm
- Firebase project
- Supabase project
- GitHub account

### 1. Clone the repository

```bash
git clone https://github.com/darshan-regmi/veon.git
cd veon
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root (see [Environment Variables](#environment-variables) section below).

### 4. Set up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com) → create a project
2. **Authentication** → Sign-in method → enable **Email/Password** and **Google**
3. **Firestore** → Create database → start in production mode
4. **Project Settings** → Your apps → copy the Firebase config into `.env.local`

Set Firestore security rules (**Firestore → Rules**):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    function isSignedIn() {
      return request.auth != null;
    }

    function isAdmin() {
      return isSignedIn() &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    match /users/{userId} {
      allow read: if isSignedIn() && (request.auth.uid == userId || isAdmin());
      allow create: if isSignedIn() && request.auth.uid == userId;
      allow update: if isSignedIn() && request.auth.uid == userId &&
                       request.resource.data.role == resource.data.role;
      allow delete: if isAdmin();
    }

    match /apps/{appId} {
      allow read: if true;
      allow create, update, delete: if isAdmin();
    }
  }
}
```

### 5. Set up Supabase Storage

1. Go to [supabase.com](https://supabase.com) → create a project
2. **Storage** → New bucket → name: `app-images` → enable **Public bucket**
3. **Storage** → Policies → add these policies for `app-images`:

```sql
CREATE POLICY "Public read"     ON storage.objects FOR SELECT USING (bucket_id = 'app-images');
CREATE POLICY "Allow uploads"   ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'app-images');
CREATE POLICY "Allow updates"   ON storage.objects FOR UPDATE USING (bucket_id = 'app-images');
CREATE POLICY "Allow deletes"   ON storage.objects FOR DELETE USING (bucket_id = 'app-images');
```

4. **Project Settings** → API → copy URL and anon key into `.env.local`

### 6. Run the development server

```bash
npm run dev
```

Visit `http://localhost:3000`

---

## Environment Variables

Create `.env.local` in the project root:

```bash
# ─── Firebase (Client) ────────────────────────────────────────────────────────
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123

# ─── Firebase Admin (Server-side) ─────────────────────────────────────────────
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxx@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIE...\n-----END PRIVATE KEY-----\n"

# ─── Supabase Storage ─────────────────────────────────────────────────────────
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# ─── GitHub (Private repo support) ────────────────────────────────────────────
# Fine-grained PAT with Contents: Read-only on your app repos
GITHUB_TOKEN=github_pat_...
```

> `GITHUB_TOKEN` is optional — without it the GitHub sync still works for public repos.
> `FIREBASE_PRIVATE_KEY` must keep the `\n` newlines inside double quotes.

---

## Firestore Data Schema

**Collection: `apps`**

```typescript
{
  id: string;           // auto-generated by Firestore
  name: string;         // "Veil Poetry App"
  slug: string;         // "veil-poetry-app" — used in /apps/[slug] URL
  description: string;
  icon: string;         // Supabase Storage public URL
  screenshots: string[];// Supabase Storage public URLs
  features: string[];   // ["Minimal interface", "Dark mode", ...]
  version: string;      // "1.0.0"
  releaseDate: string;  // "2025-11-29"
  downloadUrl: string;  // GitHub Releases APK URL
  changelog: Record<string, string>; // { "1.0.0": "Initial release\n..." }
  category: string;     // "entertainment"
  downloads: number;    // incremented on each download
  featured: boolean;    // shows on homepage if true
  developer?: string;
  githubRepo?: string;  // "owner/repo" — used for GitHub sync
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

**Collection: `users`**

```typescript
{
  email: string;
  displayName?: string;
  photoURL?: string;
  role: "admin" | "user";
  createdAt: Timestamp;
}
```

> To make yourself admin: find your user document in Firestore → set `role` to `"admin"`.

---

## Admin Panel

Access at `/admin` (requires admin role).

| Action | Route |
|---|---|
| Dashboard + stats | `/admin` |
| Add new app | `/admin/apps/add` |
| Edit app | `/admin/apps/edit/[id]` |

### GitHub Sync

In the add/edit form, enter a repo as `owner/repo` and click **Sync**. It auto-fills:
- Version number
- Release date
- APK download URL (first `.apk` asset)
- Changelog (release notes)

Requires a GitHub fine-grained PAT with **Contents: Read-only** permission set as `GITHUB_TOKEN` in `.env.local`.

---

## Firestore Index

The featured apps query requires a composite index. On first load, Firestore will log an error with a direct link to create it. Click the link — it takes ~30 seconds.

The index is: **Collection** `apps` → **Fields** `featured ASC, createdAt DESC`.

---

## Deployment

### Cloudflare Pages

1. Push to GitHub
2. **Cloudflare Pages** → Connect GitHub repo
3. Build settings:
   - Framework: **Next.js**
   - Build command: `npm run build`
   - Build output: `.next`
4. **Environment variables** → add all variables from `.env.local`

---

## Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## License

MIT — see [LICENSE](./LICENSE)

---

**Made with care in Nepal by [Darshan Regmi](https://github.com/darshan-regmi)**
