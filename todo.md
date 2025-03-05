Here's the prioritized implementation checklist:

```markdown
### Foundation Layer
- [ ] Create Next.js 14 app with TypeScript template (`npx create-next-app@latest`)
- [x] Install core dependencies: @neynar/nodejs-sdk, framer-motion, use-gesture, qrcode.react
- [x] Configure tailwind.config.js with custom colors, fonts, and animations
- [ ] Create /app/layout.tsx with root layout structure and font loading
- [x] Set up /styles/globals.css with CSS variables and base styles
- [ ] Implement /lib/api/neynarClient.ts with TypeScript interfaces

### Profile System
- [ ] Create ProfileHeader component in /components/ui/ProfileHeader.tsx
- [ ] Add Canvas element for dynamic glow effect in ProfileHeader
- [ ] Implement social badges flex container with platform icons
- [ ] Integrate Next/Image for profile picture with size variants
- [ ] Add TypeScript props interface for user data and badges

### Data Layer
- [ ] Create /api/frame/[page].ts API route with GET handler
- [ ] Implement Neynar API proxy with headers and query param validation
- [ ] Set up zod schema for frame response validation
- [ ] Add error handling with custom HTTP status codes
- [ ] Configure SWR caching strategy with 60s revalidation

### Core Components
- [ ] Create LinkStack component with vertical flex layout
- [ ] Implement IntersectionObserver for scroll position tracking
- [ ] Add keyboard navigation (up/down arrows) event listeners
- [ ] Create AnimatedLinkCard component with spring animation setup
- [ ] Implement tilt effect using perspective transform in LinkCard

### Mobile Experience
- [ ] Integrate useGesture for swipe detection in LinkStack
- [ ] Configure dynamic viewport units (dvh) in global CSS
- [ ] Add touch action: pan-y CSS property to scroll container
- [ ] Implement navigator.vibrate for haptic feedback
- [ ] Set up touch event passthrough for iOS overscroll

### Animation System
- [ ] Create CSS flip animation @keyframes in globals.css
- [ ] Add hardware-accelerated transform presets in Tailwind
- [ ] Implement shared layout IDs for card transitions
- [ ] Configure spring animation constants in theme config
- [ ] Add gradient border effects using pseudo-elements

### Performance
- [ ] Enable CSS containment for link card render boundaries
- [ ] Set up dynamic imports for ContextPanel and QR code
- [ ] Configure next.config.js font/image optimizations
- [ ] Implement link prefetching on hover for main actions
- [ ] Add bundle analyzer to build process

### Final Assembly
- [ ] Wire data fetching in page.tsx using neynarClient
- [ ] Connect ProfileHeader props to fetched user data
- [ ] Implement global event bus for cross-component actions
- [ ] Add error boundaries around data-dependent components
- [ ] Set up loading skeletons for async states

### Quality Assurance
- [ ] Implement Lighthouse CI with performance budget
- [ ] Add screen reader announcements for state changes
- [ ] Test Chrome/Firefox/Safari rendering consistency
- [ ] Verify mobile viewport behavior on iOS/Android
- [ ] Audit animation smoothness (90fps target)
```

Implementation order follows:
1. Foundation → 2. Data → 3. Components → 4. Interactions → 5. Polish

Critical path:
1. Next.js setup → 2. API proxy → 3. Profile header → 4. Link stack → 5. Mobile gestures

Mobile-specific tasks are integrated at the component level (touch handling) and global CSS level (viewport units). Each animation task includes performance considerations through hardware acceleration and containment.
