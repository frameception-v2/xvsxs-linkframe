Here's the optimized prompt sequence for incremental implementation:

```markdown
# Prompt Sequence for Farcaster Link Tree Frame

## 1. Project Scaffolding
```text
Create a Next.js 14 app with TypeScript template. Structure:
- /app/layout.tsx with root layout
- /app/page.tsx as entry point
- /components/ui/ for shared components
- /lib/api/ for API clients
- /styles/globals.css with CSS variables

Configure tailwind.config.js with:
- Custom color scheme (primary: #814FEF)
- Font stack: system-ui first
- Safe area padding utilities
- Animation presets for spring/slide
```

## 2. Profile Header Component
```text
Create ProfileHeader component with:
- Canvas element for dynamic glow effect
- Flex container for social badges
- Responsive sizing (48px-64px)
- Position-absolute for overlay effect
- Next/Image for profile picture

Include TypeScript interface:
interface SocialBadge {
  platform: 'farcaster' | 'github';
  url: string;
}

Add props for:
- userName: string
- userBio: string
- badges: SocialBadge[]
```

## 3. Core API Client
```text
Create neynarClient.ts in /lib/api:
- Type definitions for FrameResponse
- fetchFrameData async function
- Cache strategy (revalidate every 60s)
- Error handling with custom errors

Implement API route /api/frame/[page].ts:
- GET handler
- Type-safe query params
- Proxy to Neynar API with headers
- Response validation with zod
```

## 4. Link Stack Component
```text
Create LinkStack component with:
- Vertical flex layout
- Section chips navigation
- IntersectionObserver for scroll tracking
- Keyboard event listeners
- Context provider for shared state

Use generics for link types:
type FrameLink = {
  title: string;
  actionType: 'post' | 'redirect';
  target: string;
  timestamp?: number;
}
```

## 5. Link Card Component
```text
Create AnimatedLinkCard component with:
- Spring animation on hover
- Tilt effect using perspective transform
- Dynamic height transition
- Shared layout IDs for smooth transitions
- Action button with context menu

Implement CSS for:
- Card flip animation
- Gradient borders
- Hardware-accelerated transforms
- Accessible focus states
```

## 6. Mobile Touch Handling
```text
Add touch gesture support:
- useGesture React hook integration
- Swipe thresholds (50px)
- Velocity-based animation
- Overscroll prevention
- Haptic feedback (navigator.vibrate)

Implement mobile-specific:
- Dynamic viewport units (dvh)
- Input type detection
- Safe area insets
- 300ms click delay prevention
```

## 7. Context Panel System
```text
Create ContextPanel component with:
- Slide-up animation
- QR code generation (qrcode.react)
- Clipboard API integration
- Dynamic positioning relative to active card
- Portal implementation for overlays

Add analytics tracking:
- Link impressions
- Interaction types
- Error reporting
- Performance metrics
```

## 8. Performance Optimization
```text
Implement optimizations:
- CSS containment for link cards
- Dynamic import for heavy components
- Link prefetching strategy
- Critical CSS inlining
- Bundle analysis setup

Configure next.config.js for:
- Font optimization
- Image optimization
- Cache headers
- Route prefetching
```

## 9. Final Integration
```text
Wire all components in page.tsx:
- Fetch data using neynarClient
- Pass props to ProfileHeader and LinkStack
- Setup global event listeners
- Add error boundaries
- Implement loading states

Add final touches:
- Theme configuration
- Accessibility audit
- Cross-browser testing
- Performance budget checks
```
```

Each prompt builds on previous implementation while maintaining strict boundaries. The sequence follows:
1. Foundation → 2. Visual Elements → 3. Data Layer → 4. Interaction → 5. Polish

Key technical considerations addressed:
- Gradual state management expansion
- Type safety progression
- Animation performance isolation
- Mobile-first responsive implementation
- API surface containment

Mobile-specific requirements are woven throughout with dedicated touch handling and viewport management steps. No database/smart contract requirements are maintained through client-side caching and API proxy pattern.