/**
 * Soft, static violet glow pools that sit behind the sections below the
 * hero, using a "screen" blend so they lighten/tint whatever is beneath
 * them instead of covering it. Scrolls with the page (not viewport-fixed)
 * so the glow is distributed across the real page height rather than
 * repeating the same pattern on every screen, and it's scoped to a wrapper
 * that starts after the hero so it never washes out the hero photo.
 */
export function AmbientGlow() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[1] mix-blend-screen"
      style={{
        backgroundImage: `
          radial-gradient(ellipse 70% 32% at 22% 6%, rgba(124, 92, 255, 0.13), transparent 68%),
          radial-gradient(ellipse 65% 34% at 82% 30%, rgba(91, 61, 240, 0.10), transparent 66%),
          radial-gradient(ellipse 70% 34% at 18% 55%, rgba(165, 139, 255, 0.09), transparent 66%),
          radial-gradient(ellipse 65% 32% at 85% 78%, rgba(91, 61, 240, 0.09), transparent 66%),
          radial-gradient(ellipse 75% 34% at 25% 98%, rgba(124, 92, 255, 0.11), transparent 68%)
        `,
      }}
    />
  );
}
