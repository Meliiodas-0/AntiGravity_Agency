

# Fix "What we handle" and "How it works" Sections

Both sections are currently broken -- they create massive empty scroll gaps and the content is invisible due to faulty scroll-linked animation math. Here's the fix.

---

## Problems Found

### "What we handle" (Capabilities)
- Creates 350vh of scroll height (3.5x the screen) but only shows content briefly
- Cards start fully invisible (opacity: 0) and only flash into view during a tiny scroll window
- Most of the section is a blank dark screen

### "How it works" (Process)
- Creates 320vh of scroll height for just 4 steps
- The card animations (scale/glow) don't work because `useScroll` with a target ref inside a sticky+overflow container doesn't track correctly
- The horizontal scroll translation math is off, cutting off content

---

## The Fix

### Capabilities - Simpler, More Reliable Pinned Animation
- Reduce the scroll container height from 350vh to a more reasonable 200vh (still enough for the pinned effect but no giant empty gaps)
- Change the card animation so cards start at a slightly reduced state (opacity: 0.3, scale: 0.9) rather than fully invisible -- this way the section never looks empty
- Adjust the scroll math so all 6 cards animate in smoothly across the full scroll range
- Cards will scale from 0.9 to 1 and fade from 0.3 to 1 as you scroll, with a staggered timing

### Process - Fix Horizontal Scroll
- Reduce the scroll container height from 320vh to 200vh (4 steps don't need that much scroll distance)
- Remove the broken per-card `useScroll` animation (doesn't work inside sticky containers)
- Replace with `whileInView` entrance animations that actually fire
- Fix the horizontal translation percentage to properly account for the title card width
- Add a simple scale-up and opacity entrance for each card as it slides into view

### Contact - Fix Zoom Wrapper
- The ContactZoomWrapper also starts at opacity: 0 which can make it invisible
- Change starting opacity from 0 to 0.3 so the section is always at least partially visible

---

## Technical Details

### Files Modified
- **`src/components/Capabilities.tsx`**: Reduce container height, change card initial opacity from 0 to 0.3, widen the scroll animation range per card
- **`src/components/Process.tsx`**: Remove broken per-card useScroll, replace with whileInView animations, keep horizontal scroll
- **`src/components/motion/HorizontalScroll.tsx`**: Reduce height multiplier from 80vh to 50vh per item, fix x translation math
- **`src/components/ContactForm.tsx`**: Fix ContactZoomWrapper starting opacity

### No new files or dependencies needed
