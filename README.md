# Veon — Personal App Store

![Veon](https://img.shields.io/badge/Next.js-15+-black?style=flat-square&logo=next.js)
![Firebase](https://img.shields.io/badge/Firebase-9+-yellow?style=flat-square&logo=firebase)
![Cloudflare](https://img.shields.io/badge/Cloudflare-Pages-orange?style=flat-square&logo=cloudflare)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![Status](https://img.shields.io/badge/Status-In%20Development-blue?style=flat-square)

**Veon** is a personal web app store designed to showcase and distribute your Android apps. Think of it as a mini-Play Store, but curated, clean, and personalized to your brand.

Built with **Next.js 15**, **Firebase**, and **Cloudflare Pages**, Veon gives you full control over branding, download links, and app updates while maintaining a professional, minimal aesthetic.

## ✨ Features

### Core Features
- **🏠 Homepage / Hero Section**: Clean introduction with featured app showcase
- **📱 App Catalog**: Browse all hosted apps with descriptions, versions, and download buttons
- **📊 Download Management**: Track downloads and manage app versions
- **🖼️ Media Gallery**: Screenshot carousel for each app
- **⚡ Admin Panel**: Firebase Authentication + Firestore integration for easy app management
- **🔗 GitHub Integration**: Auto-fetch latest releases from GitHub Releases
- **📈 Version Tracking**: Automatic changelog and version history management
- **🎨 Custom Branding**: Fully personalized design reflecting your creative identity

### Tech Stack Highlights
- **Frontend**: Next.js 15 (App Router) + Tailwind CSS
- **Backend**: Firebase Firestore + Firebase Authentication
- **Hosting**: Cloudflare Pages (unlimited bandwidth, free SSL)
- **APK Storage**: GitHub Releases (unlimited storage)
- **Edge Functions**: Cloudflare Workers (optional redirects & analytics)

## 🚀 Quick Start

### Prerequisites
- Node.js 20+ and npm/yarn
- Firebase account
- GitHub account
- Git installed

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/darshan-regmi/veon.git
cd veon
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup Firebase**
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Create a new project: `veon-app-store`
   - Enable Authentication (Email/Password + Google Sign-In)
   - Create a Firestore Database (Test mode)
   - Copy your Firebase config

4. **Configure environment variables**
```bash
# Create .env.local
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

5. **Run development server**
```bash
npm run dev
```

Visit `http://localhost:3000` to see Veon in action!

## 📁 Project Structure

```
veon/
├── app/
│   ├── layout.tsx              # Root layout with AuthProvider
│   ├── page.tsx                # Homepage with featured apps
│   ├── apps/
│   │   ├── page.tsx            # App catalog
│   │   └── [slug]/
│   │       └── page.tsx        # Individual app detail page
│   ├── admin/
│   │   └── page.tsx            # Admin panel (Firebase Auth required)
│   ├── api/
│   │   └── download/           # Download tracking endpoint
│   ├── globals.css             # Tailwind styles
│   └── favicon.ico
│
├── components/
│   ├── AppCard.tsx             # App listing card component
│   ├── DownloadButton.tsx       # Download with tracking
│   ├── Hero.tsx                # Homepage hero section
│   └── Screenshots.tsx         # App screenshot carousel
│
├── context/
│   └── AuthContext.tsx         # Global auth state
│
├── hooks/
│   └── useAuth.ts              # Firebase auth hook
│
├── lib/
│   ├── firebase.ts             # Firebase initialization
│   ├── firestore.ts            # Firestore helpers
│   ├── github.ts               # GitHub API integration
│   └── types.ts                # TypeScript interfaces
│
├── public/                      # Static assets
├── .env.local                  # Environment variables (git ignored)
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── README.md                   # This file
```

## 🔐 Firebase Setup

### Firestore Collections

**Collection: `apps`**
```typescript
{
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  features: string[];
  version: string;
  releaseDate: string;
  downloadUrl: string;
  screenshots: string[];
  category: string;
  downloads: number;
  changelog: Record<string, string>;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public read access
    match /apps/{appId} {
      allow read: if true;
      allow write: if request.auth != null && 
                      request.auth.token.email == 'your-email@gmail.com';
    }
  }
}
```

## 🤖 Admin Panel

Access the admin panel at `/admin` to:
- Add new apps
- Update app information
- Manage screenshots and features
- Track downloads

**Note**: Only authenticated users can access the admin panel. Configure authorized emails in Firestore security rules.

## 📦 GitHub Releases Integration

Veon automatically fetches the latest release and updates your app catalog. No manual configuration needed!

### Setup GitHub Actions for Auto-Release

Create `.github/workflows/release.yml` in your Android app repository:

```yaml
name: Build and Release APK

on:
  push:
    tags:
      - 'v*'

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up JDK
        uses: actions/setup-java@v3
        with:
          java-version: '17'
          distribution: 'temurin'
      - name: Build Release APK
        run: ./gradlew assembleRelease
      - name: Create Release
        uses: softprops/action-gh-release@v1
        with:
          files: app/build/outputs/apk/release/*.apk
          generate_release_notes: true
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## 🌐 Deployment

### Deploy to Cloudflare Pages

1. **Push code to GitHub**
```bash
git add .
git commit -m "feat: add new features"
git push origin dev
```

2. **Create PR and merge to main** (triggers auto-deployment)

3. **Setup Cloudflare Pages**
   - Go to [Cloudflare Pages](https://pages.cloudflare.com)
   - Connect your GitHub repository
   - Build settings:
     - Framework: **Next.js (Static HTML Export)**
     - Build command: `npx next build`
     - Build output: `out`

4. **Access your site**
   - Automatic URL: `veon.pages.dev`
   - Optional: Add custom domain (e.g., `veon.app`, `veon.tech`)

## 🔄 Git Workflow

### Branch Strategy

```
main (production) ← tested & stable
  ↑
 dev (development) ← where you work
  ↑
feature branches ← individual features
```

### Common Commands

```bash
# Switch to dev branch
git checkout dev

# Create a feature branch
git checkout -b feature/firestore-setup

# Commit changes
git add .
git commit -m "feat: add Firestore integration"

# Push to GitHub
git push origin feature/firestore-setup

# Merge to dev
git checkout dev
git merge feature/firestore-setup

# When ready to deploy, merge dev to main
git checkout main
git merge dev
git push origin main  # Auto-deploys to Cloudflare Pages!
```

## 📥 Firestore Helper Functions

### Get All Apps
```typescript
import { getAllApps } from '@/lib/firestore';
const apps = await getAllApps();
```

### Get Featured Apps
```typescript
import { getFeaturedApps } from '@/lib/firestore';
const featured = await getFeaturedApps();
```

### Get App by Slug
```typescript
import { getAppBySlug } from '@/lib/firestore';
const app = await getAppBySlug('poem-reader');
```

### Track Downloads
```typescript
import { incrementDownloads } from '@/lib/firestore';
await incrementDownloads('app-id');
```

## 🎨 Customization

### Update Branding
- **Header/Navigation**: Change logo, title, and social links
- **Colors & Styles**: Customize Tailwind color scheme in `globals.css`
- **About Section**: Add your bio and personal touch

### Your Social Links
- Instagram: [@_darshan_regmi](https://instagram.com/_darshan_regmi)
- Instagram: [@bydarshanregmi](https://instagram.com/bydarshanregmi)

## 🔂 Performance

- **Static Generation**: Most pages pre-rendered for speed
- **Incremental Static Regeneration (ISR)**: Auto-update without rebuilds
- **Global CDN**: Cloudflare Pages worldwide distribution
- **Edge Caching**: Automatic cache optimization

## 💴 Development Commands

```bash
# Run with Turbopack for faster builds
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 📜 License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) file for details.

## 😋 Built by

**Darshan Regmi** — Full-stack Developer & Poetry Enthusiast

- 📸 Instagram: [@_darshan_regmi](https://instagram.com/_darshan_regmi) | [@bydarshanregmi](https://instagram.com/bydarshanregmi)
- 💻 GitHub: [@darshan-regmi](https://github.com/darshan-regmi)

---

**Made with ❤️ and ☕ in Nepal**

*"Build once, deploy everywhere"* — Ship your apps to the world with Veon 🚀