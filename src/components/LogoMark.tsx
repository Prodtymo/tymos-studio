/**
 * The chosen logo mark ("Vinyl Crescent", refined with a thin bite + spindle
 * hole), as a currentColor icon so it can sit on any background across the
 * site (dark nav/footer, hero photo, etc.) without needing separate light
 * and dark asset variants.
 *
 * The spindle hole is cut with a single compound path (fill-rule="evenodd":
 * outer crescent subpath + inner circle subpath), not an SVG <mask>. Masks
 * get rasterized to an offscreen bitmap by the browser, and that bitmap
 * doesn't reliably scale with device pixel ratio -- at the small size this
 * mark renders at in the nav (32px), that showed up as visibly jagged/
 * pixelated edges on retina displays. A compound path is pure geometry, so
 * it's composited directly and stays crisp at any size or DPR. It also
 * sidesteps duplicate-id issues from rendering the same <mask id> multiple
 * times on one page (nav + footer + page header all mount this component).
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(256,256) rotate(-50)">
        <path
          fillRule="evenodd"
          fill="currentColor"
          d="M157.5,-87.14 A180,180 0 1,0 157.5,87.14 A180,180 0 0,1 157.5,-87.14 Z
             M34,0 A34,34 0 1,0 -34,0 A34,34 0 1,0 34,0 Z"
        />
      </g>
    </svg>
  );
}
