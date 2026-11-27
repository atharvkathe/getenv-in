# DESIGN.md — getenv.in

> The visual and UX rules for the getenv.in redesign. Follow them on every page.
> If something isn't covered here, choose the simpler, quieter option.

## 1. Direction: "Terminal Chai" ☕

A dark, focused developer terminal with Indian warmth. It should feel like a sharp tool made
by an engineer who also has taste, **not** a generic AI-SaaS template.

Three words: **precise, warm, confident.**

### Never do this

- ❌ Purple/blue gradients, glowing blobs, glassmorphism
- ❌ 3D stock illustrations, floating laptop mockups, fake dashboards
- ❌ Emoji in UI chrome (copy can be playful; components stay clean)
- ❌ More than one accent color on a screen
- ❌ Centered walls of text, or every section looking the same

## 2. Color tokens

Put these in one theme file (CSS variables or Tailwind theme) and use **tokens only**,
never hard-coded hex values in components.

| Token          | Value     | Use                                                  |
| -------------- | --------- | ---------------------------------------------------- |
| `--bg`         | `#0E0F11` | Page background                                      |
| `--surface`    | `#16181C` | Cards, panels                                        |
| `--surface-2`  | `#1E2126` | Hover, inputs, code blocks                           |
| `--border`     | `#2A2E35` | 1px borders and dividers                             |
| `--text`       | `#ECE7DF` | Main text (warm off-white, not pure white)           |
| `--muted`      | `#9A968F` | Secondary text, labels                               |
| `--accent`     | `#FF8A1F` | Saffron: primary buttons, links, key highlights only |
| `--accent-ink` | `#0E0F11` | Text on accent buttons                               |
| `--success`    | `#3DDC97` | "tests passed", checkmarks                           |
| `--danger`     | `#FF5C5C` | Errors, "free stuff fails here" ✗ marks              |
| `--prompt`     | `#A6E3A1` | Terminal `$` prompts in code cards                   |

Rule: the accent covers **5% or less** of any screen. If everything is orange, nothing stands out.

## 3. Typography (all free on Google Fonts)

| Role                    | Font                       | Notes                                            |
| ----------------------- | -------------------------- | ------------------------------------------------ |
| Headings                | **Space Grotesk** 600/700  | Tight letter-spacing (-0.02em) on big headings   |
| Body                    | **IBM Plex Sans** 400/500  | 16–18px, line-height 1.6                         |
| Code / labels / numbers | **JetBrains Mono** 400/500 | Code, file trees, prices, small uppercase labels |

Scale: 14 / 16 / 18 / 24 / 32 / 48 / 64 (hero only).
Small uppercase mono labels (12px, letter-spacing 0.08em, `--muted`) sit above section
headings, e.g. `// HOW IT WORKS`.

## 4. Layout

- Max content width **1200px**; text blocks max **680px** wide.
- 8px spacing grid. Sections get generous vertical space (96–128px on desktop, 64px on mobile).
- **Mobile first.** Every page must look intentional at 375px.
- Mostly left-aligned. Center only the hero headline and the final CTA.
- Borders over shadows. Cards: `--surface`, 1px `--border`, radius **12px**, no drop shadows.

## 5. Key components

**Terminal card** (the signature element)
A code block styled like a terminal window: 3 small dots, a mono title bar (e.g.
`~/my-saas — claude`), `--prompt` coloured `$`, and a typed-out sequence showing a kit
being installed and `verify/` tests going green (`✓ 24 passed`). It appears in the hero.

**Kit card**
Name + one-line problem → mini file-tree preview (mono, `--muted`) → 2–3 "edge cases
covered" chips → price in mono → "View kit" link. The whole card is clickable; on hover the
border shifts to `--accent`.

**Free vs Kit comparison table**
Two columns: "Free rules online" with ✗ in `--danger`, and "getenv kit" with ✓ in `--success`.
This is the core sales argument, so make it easy to scan.

**Buttons**

- Primary: `--accent` background, `--accent-ink` text, radius 8px, 44px min height.
- Secondary: transparent, 1px `--border`, `--text`.
- Only one primary button per section.

**Inputs** (the .env generator, waitlist)
`--surface-2` background, 1px `--border`, `--accent` focus ring (2px). Labels always visible
(never placeholder-only).

**Price display**
Mono font, e.g. `₹1,499`, and show "one-time · 6 months of updates" under it in `--muted`.

## 6. Homepage section order

1. **Hero**: headline, subline, primary CTA "Browse kits", secondary CTA "Free .env generator", terminal card
2. **Problem**: 3 short cards: "AI gets UPI Autopay wrong", "GST place-of-supply bugs", "WhatsApp 24h window rejections"
3. **Free vs Kit table**
4. **Kits grid**: 3 live kits + 1 waitlist kit (marked "Waitlist")
5. **How it works**: 3 steps: Buy → Drop into repo → Agent builds + passes verify/
6. **Free .env generator**: the existing tool, embedded or linked prominently
7. **FAQ**
8. **Final CTA + footer**

## 7. Motion

- Subtle only: 150–200ms ease-out on hover/focus, plus one terminal typing animation in the hero.
- Respect `prefers-reduced-motion`: show the final terminal state with no typing.
- No scroll-jacking, no parallax.

## 8. Accessibility (non-negotiable)

- WCAG AA contrast (the tokens above pass; recheck any new color).
- Visible focus states on everything interactive.
- Every tap target is at least 44×44px.
- Semantic HTML: one `<h1>` per page, headings in order, real `<button>`/`<a>`.
- The site must be usable by keyboard alone.

## 9. Copy voice

Direct, confident, a little witty. Short sentences. Speak to a developer as a peer.

- ✅ "Your agent writes the webhook. Our tests catch the bug."
- ❌ "Revolutionize your workflow with cutting-edge AI-powered solutions."

Use ₹ and Indian context naturally (UPI, GST, WhatsApp) because that's the whole point.
