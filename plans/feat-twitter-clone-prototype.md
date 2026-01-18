# feat: Twitter/X Clone UI Prototype

## Implementation Status

**Status:** ✅ COMPLETE
**Implemented on:** 2026-01-18
**Dev server:** http://localhost:3000

| Phase | Status | Progress |
|-------|--------|----------|
| Phase 1: Foundation + Home Feed | ✅ Complete | 8/8 tasks |
| Phase 2: Remaining Pages | ✅ Complete | 7/7 tasks |
| Phase 3: Polish | ✅ Mostly Complete | 4/5 tasks |

---

## Enhancement Summary

**Deepened on:** 2026-01-18
**Research agents used:** 8 parallel agents
- Frontend Design Specialist
- TypeScript Reviewer (Kieran)
- Performance Oracle
- Security Sentinel
- Architecture Strategist
- Code Simplicity Reviewer
- Pattern Recognition Specialist
- Motion Design Principles

### Key Improvements
1. **Simplified scope** - Cut messages feature, reduce 6 phases to 3
2. **Premium UI patterns** - Multi-layer shadows, refined animations, polished hover states
3. **Type-safe architecture** - Separated entity types from viewer context, fixed recursive Tweet type
4. **Performance optimizations** - Virtualized lists, server-only Faker, optimized images
5. **Security-first patterns** - XSS prevention, URL validation, CSP headers
6. **Motion design system** - Specific animation timings per component frequency

### Simplification Summary
**Original:** 6 phases, 20+ components, Messages feature, Faker.js, profile tabs
**Simplified:** 3 phases, ~12 components, static mock data, single profile view

---

## Overview

Build a beautiful, fully functional Twitter/X clone prototype using Next.js 16, Shadcn/ui components, and Tailwind CSS. The prototype will feature all core Twitter UI elements with static dummy data, allowing for interactive exploration without database persistence. Focus is on usability, clean design, and responsive layouts.

**Stack:**
- Next.js 16 (App Router, stable)
- React 19.2 (with useOptimistic, View Transitions)
- Shadcn/ui component library
- Tailwind CSS v4
- TypeScript (strict mode)
- next-themes (dark mode)
- Lucide React icons

---

## Problem Statement / Motivation

You want to prototype and visualize a Twitter-like social media application before committing to backend infrastructure. This allows you to:

1. **Experiment with UI/UX** - Click around, test interactions, and refine the design
2. **Validate design decisions** - See how features look and feel in context
3. **Prepare for database integration** - Establish component structure and data shapes
4. **Share with stakeholders** - Demonstrate the vision before full development

---

## Proposed Solution

A fully interactive prototype with:

- **Complete page structure** matching Twitter's layout
- **Functional UI interactions** (likes, retweets, bookmarks toggle in-memory)
- **Static dummy data** for tweets, users, notifications
- **Dark/light mode** toggle with system preference support
- **Responsive design** for mobile, tablet, and desktop

### Scope Decisions (YAGNI Applied)

**Included:**
- Home feed with ~15 static tweets
- Tweet interactions (like, retweet, bookmark, share)
- Compose modal (basic)
- Profile page (single view)
- Explore page (search + trending)
- Notifications page
- Bookmarks page
- Single tweet view
- Dark mode
- Responsive layout

**Cut (not needed for prototype validation):**
- ~~Messages feature~~ → "Coming Soon" placeholder
- ~~Profile tabs (4 views)~~ → Single "Posts" view
- ~~Infinite scroll~~ → Render all tweets (only ~15)
- ~~Skeleton loaders~~ → No async = no loading states
- ~~Faker.js~~ → Static hardcoded data is simpler
- ~~Retweet dropdown~~ → Simple toggle button

---

## Technical Approach

### Architecture

```
app/
├── layout.tsx                    # Root layout with providers
├── globals.css                   # Tailwind + CSS variables
├── (main)/                       # Main app layout group
│   ├── layout.tsx                # 3-column layout: sidebar, main, right
│   ├── home/page.tsx             # Home feed
│   ├── explore/page.tsx          # Search + trending
│   ├── notifications/page.tsx    # Notifications list
│   ├── bookmarks/page.tsx        # Saved tweets
│   ├── messages/page.tsx         # "Coming Soon" placeholder
│   ├── [username]/page.tsx       # User profiles
│   └── status/
│       └── [tweetId]/page.tsx    # Single tweet view
└── compose/
    └── tweet/page.tsx            # Mobile compose (full screen)

components/
├── ui/                           # Shadcn components
├── layout/
│   ├── sidebar.tsx               # Desktop left navigation
│   ├── mobile-nav.tsx            # Mobile bottom navigation
│   ├── mobile-header.tsx         # Mobile top bar
│   └── right-sidebar.tsx         # Trending + Who to follow
├── tweet-card.tsx                # Tweet with inline actions
├── compose-modal.tsx             # Create tweet dialog
├── profile-header.tsx            # Banner, avatar, bio
├── notification-item.tsx         # Notification row
├── trending-topic.tsx            # Trending item
├── theme-provider.tsx
└── mode-toggle.tsx

lib/
├── types.ts                      # All TypeScript interfaces
├── mock-data.ts                  # Static tweets, users, notifications
└── utils.ts                      # cn(), formatNumber(), formatTime()
```

### Research Insight: Architecture

**Best Practices Applied:**
- Route groups `(main)` correctly share 3-column layout
- `[username]` dynamic route needs validation to avoid catch-all conflicts
- Colocate page-specific components, share cross-feature components
- Default to Server Components, add `'use client'` only for interactions

**Recommendation:** Consider parallel routes for compose modal in future:
```
app/(main)/@modal/compose/tweet/page.tsx
```
This enables URL-shareable compose states.

---

### Data Model

```typescript
// lib/types.ts

// Simplified User - only fields actually displayed
interface User {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
  verified: boolean;
  bio?: string;
  followersCount: number;
  followingCount: number;
}

// Tweet without recursive replyTo (use replyToId instead)
interface Tweet {
  id: string;
  content: string;
  author: User;
  createdAt: string;        // Pre-formatted: "2h", "Jan 15"
  imageUrl?: string;        // Single image for simplicity
  likeCount: number;
  retweetCount: number;
  replyCount: number;
  isLiked: boolean;
  isRetweeted: boolean;
  isBookmarked: boolean;
  replyToId?: string;       // Reference by ID, not nested object
}

// Simple notification - no discriminated union needed for prototype
interface Notification {
  id: string;
  type: 'like' | 'retweet' | 'follow' | 'reply';
  actor: User;
  tweet?: Tweet;
  createdAt: string;
}

interface TrendingTopic {
  id: string;
  name: string;
  category: string;
  postCount: string;        // Pre-formatted: "12.5K posts"
}
```

### Research Insight: TypeScript

**Critical Fixes Applied:**
1. **Removed recursive `replyTo?: Tweet`** - Causes infinite types, use `replyToId: string` instead
2. **Simplified User type** - Only 7 fields actually needed for display
3. **Pre-formatted timestamps** - Store as strings like "2h", no Date parsing needed
4. **Removed viewer state from entities** - `isLiked`, `isRetweeted`, `isBookmarked` are fine for prototype, but production should separate

**React 19 Pattern for Optimistic UI:**
```typescript
const [optimistic, setOptimistic] = useOptimistic(
  { likes: tweet.likeCount, isLiked: tweet.isLiked },
  (state, action: 'like' | 'unlike') => ({
    likes: action === 'like' ? state.likes + 1 : state.likes - 1,
    isLiked: action === 'like',
  })
);
```

---

### Implementation Phases (Simplified)

#### Phase 1: Foundation + Home Feed (End-to-End Slice) ✅

**Tasks:**
- [x] Initialize Next.js 16 with `npx create-next-app@latest`
- [x] Install Shadcn/ui: `npx shadcn@latest init`
- [x] Add components: `avatar button card dialog dropdown-menu tabs textarea sheet`
- [x] Set up next-themes with flash prevention
- [x] Create static mock data in `lib/mock-data.ts`
- [x] Build 3-column layout with sidebar
- [x] Build tweet card with inline actions
- [x] Build home feed page

**Files:**
- `app/layout.tsx` - Root layout with ThemeProvider
- `app/globals.css` - Twitter color palette
- `app/(main)/layout.tsx` - 3-column responsive layout
- `components/layout/sidebar.tsx`
- `components/tweet-card.tsx`
- `lib/mock-data.ts` - All static data
- `lib/types.ts` - All interfaces

#### Phase 2: Remaining Pages ✅

**Tasks:**
- [x] Build explore page (search bar + trending list)
- [x] Build notifications page
- [x] Build bookmarks page with empty state
- [x] Build profile page (single view)
- [x] Build single tweet view
- [x] Build compose modal
- [x] Build mobile navigation

**Files:**
- `app/(main)/explore/page.tsx`
- `app/(main)/notifications/page.tsx`
- `app/(main)/bookmarks/page.tsx`
- `app/(main)/[username]/page.tsx`
- `app/(main)/status/[tweetId]/page.tsx`
- `components/compose-modal.tsx`
- `components/layout/mobile-nav.tsx`
- `components/layout/mobile-header.tsx`

#### Phase 3: Polish (If Time Permits) ✅

**Tasks:**
- [x] Add FAB for mobile compose
- [x] Add empty states
- [x] Test responsive breakpoints
- [ ] Add keyboard navigation *(skipped - optional)*
- [x] Verify dark mode consistency

---

## Component Specifications

### Tweet Card (Premium Design)

```tsx
// components/tweet-card.tsx
interface TweetCardProps {
  tweet: Tweet;
  onLike: () => void;
  onRetweet: () => void;
  onBookmark: () => void;
}
```

### Research Insight: Premium UI Styling

**Tailwind Classes for Polish:**
```tsx
<article className="
  group
  relative
  px-4 py-3
  bg-white dark:bg-zinc-900
  border-b border-zinc-100 dark:border-zinc-800/50
  transition-all duration-200 ease-out
  hover:bg-zinc-50/80 dark:hover:bg-zinc-800/30
  cursor-pointer
">
```

**Avatar with Hover Ring:**
```tsx
<div className="
  w-12 h-12
  rounded-full
  overflow-hidden
  ring-2 ring-transparent
  transition-all duration-300 ease-out
  group-hover:ring-sky-500/20
  shadow-sm shadow-black/5
">
```

**Action Button Pattern:**
```tsx
<button className="
  group/btn
  flex items-center gap-2
  px-3 py-2
  rounded-full
  text-zinc-500 dark:text-zinc-400
  text-sm tabular-nums
  transition-all duration-200 ease-out
  hover:text-rose-500 hover:bg-rose-500/10
">
  <Heart className="w-5 h-5 transition-transform group-hover/btn:scale-110" />
  <span>{count}</span>
</button>
```

**Multi-Layer Shadows (Jakub Krehel style):**
```tsx
<div className="
  shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.04)]
  dark:shadow-[0_1px_3px_rgba(0,0,0,0.2),0_4px_12px_rgba(0,0,0,0.15)]
">
```

---

### Compose Modal

```tsx
// Features
- Avatar of current user
- Auto-expanding textarea
- Character counter (circular SVG progress)
- 280 character limit with visual warning at 260+
- Post button disabled when empty or over limit
- Close with X or click outside
```

**Character Counter Pattern:**
```tsx
<svg className="w-8 h-8 -rotate-90">
  <circle cx="16" cy="16" r="14" fill="none" strokeWidth="2"
    className="stroke-zinc-200 dark:stroke-zinc-700" />
  <circle cx="16" cy="16" r="14" fill="none" strokeWidth="2"
    strokeLinecap="round"
    strokeDasharray={88}
    strokeDashoffset={88 - (88 * (chars / 280))}
    className={chars > 280 ? 'stroke-rose-500' : chars > 260 ? 'stroke-amber-500' : 'stroke-sky-500'}
  />
</svg>
```

---

### Navigation Sidebar

```tsx
const navItems = [
  { href: "/home", icon: Home, label: "Home" },
  { href: "/explore", icon: Search, label: "Explore" },
  { href: "/notifications", icon: Bell, label: "Notifications" },
  { href: "/messages", icon: Mail, label: "Messages" },
  { href: "/bookmarks", icon: Bookmark, label: "Bookmarks" },
  { href: `/${currentUser.username}`, icon: User, label: "Profile" },
];
```

**Nav Item with Active State:**
```tsx
<a className={cn(
  "flex items-center gap-4 px-4 py-3 rounded-full",
  "text-xl transition-all duration-200",
  "hover:bg-zinc-100 dark:hover:bg-zinc-800/50",
  isActive && "font-bold"
)}>
```

---

## Motion Design System

### Research Insight: Animation Timings

| Component | Frequency | Duration | Easing |
|-----------|-----------|----------|--------|
| Like button | High | 200ms | ease-out + scale bounce |
| Retweet toggle | Medium | 150ms | ease-out |
| Modal open | Low | 350ms | spring, bounce: 0 |
| Modal close | Low | 250ms | ease-out (subtler than open) |
| Hover states | Very High | 150ms | ease-out |
| Page transitions | High | 150ms | opacity only |
| FAB appear | Once | 400ms | spring, bounce: 0.1 |

**Like Button Animation (Heart Pop):**
```css
@keyframes heart-pop {
  0% { transform: scale(1); }
  40% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

.liked .heart-icon {
  animation: heart-pop 0.3s ease-out;
}
```

**Modal Enter/Exit:**
```tsx
const modalVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 8, filter: "blur(4px)" },
  visible: { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, scale: 0.98, y: 4, filter: "blur(4px)" }  // Subtler than enter
};
```

**Critical Rule:** Never animate from `scale(0)` - use `0.8-0.95` minimum.

---

## Security Patterns

### Research Insight: XSS Prevention

**Safe Tweet Content Rendering:**
```tsx
// React auto-escapes, but be explicit about intent
function TweetContent({ content }: { content: string }) {
  // Parse @mentions and #hashtags into safe React elements
  const parts = content.split(/(@\w+|#\w+)/g);

  return (
    <p className="whitespace-pre-wrap break-words">
      {parts.map((part, i) => {
        if (part.startsWith('@')) {
          return <Link key={i} href={`/${part.slice(1)}`} className="text-sky-500">{part}</Link>;
        }
        if (part.startsWith('#')) {
          return <Link key={i} href={`/search?q=${encodeURIComponent(part)}`} className="text-sky-500">{part}</Link>;
        }
        return part;
      })}
    </p>
  );
}
```

**URL Validation for Profile Websites:**
```typescript
function isValidHttpUrl(string: string): boolean {
  try {
    const url = new URL(string);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

// Usage
{user.website && isValidHttpUrl(user.website) && (
  <a href={user.website} target="_blank" rel="noopener noreferrer nofollow">
    {new URL(user.website).hostname}
  </a>
)}
```

**Content Security Policy (add to next.config.ts):**
```typescript
async headers() {
  return [{
    source: '/(.*)',
    headers: [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    ],
  }];
}
```

---

## Performance Optimizations

### Research Insight: Critical Performance Patterns

**1. Server-Only Mock Data (Faker would be here, but we use static):**
```typescript
// lib/mock-data.ts
// Static data - no runtime generation, zero bundle impact
export const users: User[] = [
  { id: "1", name: "Elon Musk", username: "elonmusk", avatarUrl: "/avatars/elon.jpg", verified: true, ... },
  // ...
];
```

**2. Image Optimization:**
```tsx
import Image from 'next/image';

<Image
  src={user.avatarUrl}
  alt={user.name}
  width={48}
  height={48}
  className="rounded-full"
  loading="lazy"
/>
```

**3. Dark Mode Without Flash:**
```tsx
// app/layout.tsx
<html lang="en" suppressHydrationWarning>
  <head>
    <script dangerouslySetInnerHTML={{
      __html: `
        (function() {
          const theme = localStorage.getItem('theme') || 'system';
          const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          const isDark = theme === 'dark' || (theme === 'system' && systemDark);
          document.documentElement.classList.toggle('dark', isDark);
        })();
      `,
    }} />
  </head>
```

**4. Selective Client Components:**
```
// Server Components (default)
- app/(main)/home/page.tsx
- components/tweet-card.tsx (display only)
- components/profile-header.tsx

// Client Components ('use client')
- components/tweet-actions.tsx (has onClick)
- components/compose-modal.tsx (has state)
- components/mode-toggle.tsx (has onClick)
```

---

## Mock Data Specification

```typescript
// lib/mock-data.ts

export const currentUser: User = {
  id: "user-1",
  name: "Your Name",
  username: "yourhandle",
  avatarUrl: "/avatars/you.jpg",
  verified: false,
  bio: "Building cool things with code",
  followersCount: 1234,
  followingCount: 567,
};

export const users: User[] = [
  { id: "user-2", name: "Elon Musk", username: "elonmusk", avatarUrl: "/avatars/elon.jpg", verified: true, ... },
  { id: "user-3", name: "React", username: "reactjs", avatarUrl: "/avatars/react.jpg", verified: true, ... },
  { id: "user-4", name: "Next.js", username: "nextjs", avatarUrl: "/avatars/nextjs.jpg", verified: true, ... },
];

export const tweets: Tweet[] = [
  {
    id: "tweet-1",
    content: "Just mass-released 420 features. You're welcome.",
    author: users[0],
    createdAt: "2h",
    likeCount: 50000,
    retweetCount: 5000,
    replyCount: 2000,
    isLiked: false,
    isRetweeted: false,
    isBookmarked: false,
  },
  // 15-20 more tweets...
];

export const notifications: Notification[] = [
  { id: "notif-1", type: "like", actor: users[0], tweet: tweets[0], createdAt: "1h" },
  // 10-15 notifications...
];

export const trending: TrendingTopic[] = [
  { id: "trend-1", name: "#BuildInPublic", category: "Technology", postCount: "12.5K posts" },
  // 5-10 trending topics...
];
```

---

## Responsive Breakpoint Design

```
┌────────────────────────────────────────────────────────────────────────────┐
│ DESKTOP (xl: 1280px+)                                                       │
├────────────────────────────────────────────────────────────────────────────┤
│ ┌──────────────┬─────────────────────────────────┬───────────────────────┐ │
│ │   SIDEBAR    │           MAIN FEED             │    RIGHT SIDEBAR      │ │
│ │   275px      │           600px max             │       350px           │ │
│ └──────────────┴─────────────────────────────────┴───────────────────────┘ │
└────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐
│ TABLET (md: 768px - 1279px)                                                 │
├────────────────────────────────────────────────────────────────────────────┤
│ ┌────────┬─────────────────────────────────────────────────────────────┐   │
│ │ ICONS  │                      MAIN FEED                              │   │
│ │ 68px   │                      Full width                             │   │
│ └────────┴─────────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐
│ MOBILE (< 768px)                                                            │
├────────────────────────────────────────────────────────────────────────────┤
│ ┌──────────────────────────────────────────────────────────────────────┐   │
│ │  [Avatar]        Logo        [Settings]     ← Top Header              │   │
│ ├──────────────────────────────────────────────────────────────────────┤   │
│ │                         MAIN FEED                                    │   │
│ ├──────────────────────────────────────────────────────────────────────┤   │
│ │  [Home]  [Explore]  [Notifications]  [Messages]  ← Bottom Nav        │   │
│ └──────────────────────────────────────────────────────────────────────┘   │
│  FAB [+] for compose (bottom right)                                        │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## Acceptance Criteria

### Functional Requirements

- [x] Home feed displays ~15 tweets with dummy data
- [x] Tweet cards show author, content, timestamp, engagement counts
- [x] Like button toggles with count update
- [x] Retweet button toggles with count update
- [x] Bookmark button toggles and updates Bookmarks page
- [x] Share button copies link to clipboard
- [x] Compose modal opens from sidebar button and mobile FAB
- [x] Character counter shows remaining characters (280 limit)
- [x] Profile page shows user info and their tweets
- [x] Explore page has search bar and trending topics
- [x] Notifications page shows notification items
- [x] Bookmarks page shows saved tweets or empty state
- [x] Single tweet view shows tweet with context
- [x] Clicking tweet card navigates to single tweet view
- [x] Dark mode toggle switches theme instantly
- [x] Theme preference persists in localStorage

### Non-Functional Requirements

- [x] Responsive: Mobile (<768px), Tablet (768-1279px), Desktop (1280px+)
- [x] All interactive elements have visible focus states
- [x] Buttons and links have hover states
- [ ] Animations respect `prefers-reduced-motion` *(not implemented)*

### Quality Gates

- [x] TypeScript strict mode with no errors
- [x] All components render without console errors
- [x] Works in Chrome

---

## Dependencies & Prerequisites

### Required Packages

```json
{
  "dependencies": {
    "next": "^16.1.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "next-themes": "^0.4.0",
    "lucide-react": "^0.400.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.0.0"
  }
}
```

### Shadcn Components to Install

```bash
npx shadcn@latest add avatar button card dialog dropdown-menu tabs textarea sheet
```

---

## Risk Analysis & Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| `[username]` route conflicts | High | Medium | Add route validation or consider `/u/[username]` |
| Dark mode flickers on load | Medium | Low | Inline script before hydration |
| XSS in user content | Low | High | React escapes by default; validate URLs |
| Mobile navigation incomplete | Low | Medium | Test on real devices |

---

## Future Considerations

When adding database integration later:

1. **Replace mock data** with API calls (Server Actions or tRPC)
2. **Add authentication** (NextAuth.js, Clerk, or custom)
3. **Implement real-time** updates (WebSockets, Supabase Realtime)
4. **Add image uploads** (UploadThing, Cloudinary)
5. **Separate entity types from viewer context** (as noted in TypeScript review)
6. **Add virtualization** for long lists (@tanstack/react-virtual)
7. **Add Messages feature** (cut from prototype scope)

The component structure and data models are designed to make this transition smooth.

---

## References

### External References
- [Next.js 16 Blog Post](https://nextjs.org/blog/next-16)
- [React 19 Best Practices](https://vercel.com/blog/introducing-react-best-practices)
- [Shadcn/ui Components](https://ui.shadcn.com/)
- [Shadcn/ui Dark Mode](https://ui.shadcn.com/docs/dark-mode/next)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev/icons/)

### Design Inspiration
- [Twitter/X Web App](https://x.com)
- [weiwei2694/x-twitter-clone](https://github.com/weiwei2694/x-twitter-clone)
- [ccrsxx/twitter-clone](https://github.com/ccrsxx/twitter-clone)

---

## Summary

This **deepened** plan outlines a simplified Twitter/X clone prototype with:

- **3 implementation phases** (reduced from 6)
- **~12 components** (reduced from 20+)
- **Premium UI patterns** with specific Tailwind classes
- **Motion design system** with per-component timings
- **Security-first patterns** for future-proofing
- **Performance optimizations** ready for scaling
- **Static mock data** (no Faker.js complexity)

The prototype is scoped for rapid validation while maintaining patterns that scale to production.
