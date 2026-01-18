---
title: "P1 Critical Fixes: Layout Hydration & Security Headers"
category: code-review-fixes
tags:
  - next.js
  - react
  - performance
  - security
  - client-components
  - memo
  - csp
  - error-handling
module:
  - app/(main)/layout.tsx
  - components/tweet-card.tsx
  - components/compose-provider.tsx
  - next.config.ts
symptom:
  - Entire component tree hydrating unnecessarily due to "use client" in layout
  - O(n) re-renders on TweetCard components causing performance degradation
  - Unhandled Promise rejection when clipboard API fails
  - Missing Content Security Policy headers exposing security vulnerabilities
root_cause:
  - Layout component contained client-side compose state forcing full tree hydration
  - TweetCard component lacked React.memo wrapper causing unnecessary re-renders
  - handleShare function called clipboard API without try/catch
  - next.config.ts missing security headers configuration
date_solved: 2026-01-18
commit: cc2382e
---

# P1 Critical Fixes: Layout Hydration & Security Headers

## Summary

Four critical issues identified during code review were resolved in a single commit. The fixes address performance degradation from improper client/server component boundaries and security vulnerabilities from missing headers.

## Issues & Solutions

### 1. Layout as Client Component (Performance - Critical)

**Problem**: The `app/(main)/layout.tsx` used `"use client"` to manage compose modal state, forcing the entire layout tree to hydrate client-side. This negates SSR benefits for all pages.

**Solution**: Extract compose state to a context provider, keeping the layout as a Server Component.

#### Created: `components/compose-provider.tsx`

```tsx
"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { ComposeModal } from "@/components/compose-modal";

interface ComposeContextValue {
  openCompose: () => void;
}

const ComposeContext = createContext<ComposeContextValue | null>(null);

export function useCompose() {
  const context = useContext(ComposeContext);
  if (!context) {
    throw new Error("useCompose must be used within a ComposeProvider");
  }
  return context;
}

export function ComposeProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openCompose = useCallback(() => {
    setIsOpen(true);
  }, []);

  return (
    <ComposeContext.Provider value={{ openCompose }}>
      {children}
      <ComposeModal open={isOpen} onOpenChange={setIsOpen} />
    </ComposeContext.Provider>
  );
}
```

#### Updated: `app/(main)/layout.tsx` (now Server Component)

```tsx
import { Sidebar } from "@/components/layout/sidebar";
import { RightSidebar } from "@/components/layout/right-sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { MobileHeader } from "@/components/layout/mobile-header";
import { MobileComposeButton } from "@/components/mobile-compose-button";
import { ComposeProvider } from "@/components/compose-provider";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ComposeProvider>
      <div className="relative min-h-screen">
        <MobileHeader />
        {/* ... rest of layout */}
        <MobileComposeButton />
      </div>
    </ComposeProvider>
  );
}
```

---

### 2. Missing React.memo on TweetCard (Performance - High)

**Problem**: TweetCard component lacked memoization, causing O(n) re-renders when any tweet in the feed updated.

**Solution**: Wrap component in `memo()` and use `useCallback` for event handlers.

```tsx
import { useState, memo, useCallback } from "react";

export const TweetCard = memo(function TweetCard({ tweet, onBookmarkChange }: TweetCardProps) {
  // ... component implementation
});
```

---

### 3. Unhandled Promise in handleShare (Security - Medium)

**Problem**: `navigator.clipboard.writeText()` can throw if permission is denied or API unavailable, causing unhandled rejection.

**Solution**: Wrap in try/catch and fail silently.

```tsx
const handleShare = useCallback(async (e: React.MouseEvent) => {
  e.preventDefault();
  e.stopPropagation();
  const url = `${window.location.origin}/status/${tweet.id}`;
  try {
    await navigator.clipboard.writeText(url);
  } catch {
    // Clipboard API not available or denied - fail silently
  }
}, [tweet.id]);
```

---

### 4. Missing CSP Headers (Security - Medium)

**Problem**: No Content Security Policy or other security headers configured.

**Solution**: Add comprehensive security headers to `next.config.ts`.

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https://ui-avatars.com https://picsum.photos https://fastly.picsum.photos",
              "font-src 'self'",
              "connect-src 'self'",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
```

## Prevention Strategies

### Avoiding "use client" in Layouts

- Keep layouts as Server Components by default
- Extract interactive parts into separate Client Components
- Use context providers to wrap children rather than adding state to layout

### When to Use React.memo

Use `memo()` when:
- Component renders frequently with same props
- Component is in a list rendered via `.map()`
- Component has expensive render logic
- Parent re-renders often but child props stay stable

### Clipboard API Best Practices

- Always wrap in try/catch
- Provide user feedback on success/failure
- Consider creating a reusable `useClipboard` hook
- Enable `@typescript-eslint/no-floating-promises` ESLint rule

### Security Headers Checklist

| Header | Purpose |
|--------|---------|
| Content-Security-Policy | Prevents XSS attacks |
| X-Frame-Options | Prevents clickjacking |
| X-Content-Type-Options | Prevents MIME sniffing |
| Referrer-Policy | Controls referrer information |
| Permissions-Policy | Restricts browser features |

## Files Changed

- `app/(main)/layout.tsx` - Removed "use client", uses ComposeProvider
- `components/compose-provider.tsx` - New context provider (created)
- `components/mobile-compose-button.tsx` - New client component (created)
- `components/layout/sidebar.tsx` - Uses useCompose hook
- `components/tweet-card.tsx` - Added memo(), useCallback, try/catch
- `next.config.ts` - Added security headers

## References

- [Next.js Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [React.memo](https://react.dev/reference/react/memo)
- [MDN Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
