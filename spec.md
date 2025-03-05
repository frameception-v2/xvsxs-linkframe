```markdown
# Farcaster Link Tree Frame Specification

## 1. OVERVIEW

### Core Functionality
- Dynamic link tree display with social connections
- Three primary sections:
  1. Permanent social links (Farcaster, GitHub)
  2. Recently shared content links
  3. Context-aware interaction panel
- Smooth navigation between link categories
- Real-time updates for recent links

### UX Flow
1. Initial view: Vertical card stack with profile summary
2. Primary interaction: Card expansion on hover/tap
3. Navigation: 
   - Swipe gestures (mobile)
   - Arrow keys (desktop)
   - Section chips for quick jumps
4. Link activation: 
   - Direct launch in new tab
   - Context menu with copy/QR options

## 2. TECHNICAL REQUIREMENTS

### Frontend Components
```html
<div class="frame-container">
  <header class="profile-header">
    <canvas id="avatar-glow"></canvas>
    <div class="social-badges">
      <!-- Dynamically generated from API -->
    </div>
  </header>
  
  <main class="link-stack">
    <section class="link-card" data-type="permanent">
      <div class="link-content"></div>
      <div class="link-actions"></div>
    </section>
    
    <section class="link-carousel" data-type="recent">
      <!-- Horizontal scroll container -->
    </section>
  </main>
</div>
```

### API Integrations
```typescript
// Fetch link data
const fetchLinks = async () => {
  const response = await fetch('/farcaster/frame/list');
  const data = await response.json();
  return data.pages.flatMap(page => 
    page.buttons.map(btn => ({
      title: btn.title,
      action: btn.action_type,
      target: btn.next_page?.redirect_url
    }))
};
```

### State Management
```javascript
const useLinkState = () => {
  const [links, setLinks] = useState({
    permanent: [],
    recent: [],
    context: null
  });

  const updateContext = (newContext) => {
    setLinks(prev => ({
      ...prev,
      context: {...prev.context, ...newContext}
    }));
  };

  return { links, updateContext };
};
```

### Mobile Responsiveness
- CSS Grid with fractional units
- Touch-friendly sizing (minimum 48px touch targets)
- Dynamic viewport units (dvh)
- Hardware-accelerated transitions

## 3. FRAMES v2 IMPLEMENTATION

### Interactive Elements
| Element Type | Interaction | Animation |
|--------------|-------------|-----------|
| Link Cards   | Tilt on hover | Spring physics |
| Section Chips | Color pulse | CSS keyframes |
| Context Panel | Slide-up | Cubic bezier |

### Input Handling
```javascript
document.addEventListener('keydown', (e) => {
  if (e.code === 'ArrowUp') navigateSection(-1);
  if (e.code === 'ArrowDown') navigateSection(1);
});

const handleSwipe = (direction) => {
  if (direction.x > 50) showNextLink();
  if (direction.x < -50) showPrevLink();
};
```

### Notification System
```typescript
const showToast = (message) => {
  const toast = document.createElement('div');
  toast.className = 'link-toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => toast.remove(), 2000);
};
```

## 4. MOBILE CONSIDERATIONS

### Touch Optimization
- 300ms click delay prevention
- Passive event listeners for smooth scrolling
- Visual touch feedback with ::active states
- Overscroll behavior containment

### Performance Strategy
- CSS will-change properties
- Link prefetching on hover
- Critical CSS inlined
- Dynamic import for heavy modules

## 5. CONSTRAINTS COMPLIANCE

### Confirmed Implementation Boundaries
- ✅ No database requirements (All data client-side cached)
- ✅ No smart contracts (Pure UI interactions)
- ✅ No external integrations beyond Farcaster/Neynar APIs
- ✅ Complexity limited to core functionality

### Resource Usage Limits
| Resource Type | Budget |
|---------------|--------|
| JS Bundle      | <85kB  |
| CSS            | <12kB  |
| Fonts          | System-only |
| Animations     | 60fps target |

---

**Implementation Timeline**
1. Core scaffold: 2 days
2. API integration: 1 day
3. Animation system: 1.5 days
4. Mobile optimization: 1 day
5. Testing/QA: 0.5 day

Total: 6 development days
```