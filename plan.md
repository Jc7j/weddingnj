# Plan: Bridal Party Section

**Detected stack**: Web (Next.js 15 + GSAP + Tailwind 4)

## Context

There's already a `BridesAndGrooms.tsx` (commented out in layout) with placeholder data and a heavy card layout with images/stories. Since the request is for a clean name-only list with no photos, I'll **rewrite this file** with the real data rather than creating a new one.

## Placement

After **StaySection**, before **QASection** — matching the user's request of "under the where to stay section."

```
StaySection
BridalPartySection  ← here
QASection
```

## Design

Match the editorial style used by StaySection and QASection — clean, minimal, elegant:

- Same header pattern: small-caps label + serif heading
- Two-column layout: **Groomsmen** (left) and **Bridesmaids** (right)
- Names listed vertically in a white/30 card with backdrop blur (same as other sections)
- Numbered like QASection for visual rhythm
- Stacks to single column on mobile
- GSAP scroll-triggered fade-in animations (same pattern as StaySection/QASection)
- DecorativeBackground with `variant="light"` and `density="sparse"`
- No images, but data structure allows easy addition later (optional `image` field)

## Data

```
Groomsmen (in order):
1. Rocky Lim
2. Jeffrey Miyamoto
3. Steven CoYu
4. Andrew Guinsatao
5. Bryan Verzosa

Bridesmaids (in order):
1. Stephanie Lam
2. Jasmine CoYu
3. Natalyn Ngo
4. Rosalyn Ngo
5. Manabu Sakurai
```

## Changes

| File | Action |
|------|--------|
| `components/pages/BridesAndGrooms.tsx` | Rewrite with real data, simple name-list layout |
| `components/AuthenticatedContent.tsx` | Uncomment import + add between StaySection and QASection |

## Verification

- `bun build` passes
- Visual check: section renders between Stay and QA with both columns
