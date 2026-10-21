import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useScroll, useTransform, useReducedMotion, useAnimationFrame, type MotionValue } from "framer-motion";
import { TRACKS } from "../lib/tracks";

const uniqueArtwork = TRACKS.filter((track, index, all) => all.findIndex(other => (other.artworkKey ?? other.cover) === (track.artworkKey ?? track.cover)) === index);
// Stable artwork positions on two rings; the centre stays open for the copy.
const covers = uniqueArtwork.map((_, index) => {
  const outer = index % 2 === 0;
  const count = outer ? Math.ceil(uniqueArtwork.length / 2) : Math.floor(uniqueArtwork.length / 2);
  const angle = (Math.floor(index / 2) / count) * Math.PI * 2 - Math.PI / 2 + (outer ? 0 : .25);
  return { track: index, x: 46 + Math.cos(angle) * (outer ? 47 : 36), y: 44 + Math.sin(angle) * (outer ? 43 : 34), size: outer ? 130 : 95, angle: index % 2 ? 10 : -12, depth: outer ? 1 : .55 };
});
function Cover({ item, x, y, progress, reduce, mobile, artwork, orbit, sway }: { item: typeof covers[number]; x: MotionValue<number>; y: MotionValue<number>; progress: MotionValue<number>; reduce: boolean; mobile: boolean; artwork: string; orbit: MotionValue<number>; sway: MotionValue<number> }) {
  const dx = useTransform(x, v => reduce ? 0 : v * item.depth);
  const dy = useTransform([y, progress], ([pointer, scroll]) => reduce ? 0 : Number(pointer) * item.depth - Number(scroll) * (mobile ? 35 : 160) * item.depth);
  const rotate = useTransform([orbit, sway], ([rotation, swing]) => reduce ? item.angle * .3 : -Number(rotation) + item.angle * .3 + Number(swing) * item.depth);
  const scale = useTransform(progress, v => reduce ? 1 : 1 + v * (mobile ? 0.12 : item.depth >= 0.9 ? 0.48 : 0.16));
  return <motion.div className="hero-cover" style={{ left: `${item.x}%`, top: `${item.y}%`, width: mobile ? item.size * .8 : item.size, x: dx, y: dy, rotate, scale }}>
    <img src={artwork} alt="" width="300" height="300" draggable={false} />
  </motion.div>;
}
function LiquidOrbit({ variant }: { variant: "one" | "two" }) {
  return <svg className={`hero-orbit hero-orbit-${variant}`} viewBox="0 0 1100 680" preserveAspectRatio="none" fill="none">
    <ellipse className="orbit-pipe" cx="550" cy="340" rx="546" ry="336" />
    <g className="orbit-liquid">
      <ellipse className="orbit-flow orbit-flow-violet" cx="550" cy="340" rx="546" ry="336" pathLength="100" />
      <ellipse className="orbit-flow orbit-flow-blue" cx="550" cy="340" rx="546" ry="336" pathLength="100" />
      <ellipse className="orbit-flow orbit-flow-pink" cx="550" cy="340" rx="546" ry="336" pathLength="100" />
    </g>
  </svg>;
}
export function CoverBackdrop() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = !!useReducedMotion();
  const [mobile, setMobile] = useState(() => window.matchMedia('(max-width: 767px)').matches);
  useEffect(() => {
    const query = window.matchMedia('(max-width: 767px)');
    const update = () => setMobile(query.matches);
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  const idleOrbit = useMotionValue(0);
  const idleTime = useRef(0);
  useAnimationFrame((_, delta) => {
    if (reduce || document.hidden || ref.current?.classList.contains('hero-paused')) return;
    idleTime.current += Math.min(delta, 50);
    idleOrbit.set(Math.sin(idleTime.current / 18000) * (mobile ? 4 : 6));
  });
  const px = useMotionValue(0), py = useMotionValue(0);
  const x = useSpring(px, { stiffness: 45, damping: 22 }), y = useSpring(py, { stiffness: 45, damping: 22 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // A lightly damped spring carries the artwork briefly past a scroll stop.
  const coverProgress = useSpring(scrollYProgress, { stiffness: 55, damping: 13, mass: 0.9, restDelta: 0.0001 });
  const scrollRotation = useTransform(coverProgress, [0, 1], [0, reduce ? 0 : mobile ? 52 : 46]);
  const orbitRotation = useTransform([scrollRotation, idleOrbit], ([scroll, idle]) => reduce ? 0 : Number(scroll) + Number(idle));
  const hangingRotation = useSpring(orbitRotation, { stiffness: 110, damping: 13, mass: .6 });
  const sway = useTransform([orbitRotation, hangingRotation], ([current, lagged]) => Math.max(-7, Math.min(7, (Number(current) - Number(lagged)) * .7)));
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let visible = true;
    const update = () => element.classList.toggle('hero-paused', !visible || document.hidden);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    observer.observe(element);
    document.addEventListener('visibilitychange', update);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', update); };
  }, []);
  const ringRotation = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 75]);
  const ringScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.2]);
  return <div ref={ref} aria-hidden="true" className="cover-backdrop absolute inset-0"
    onPointerMove={e => { if (reduce || e.pointerType !== "mouse") return; const r = e.currentTarget.getBoundingClientRect(); px.set(((e.clientX-r.left)/r.width-.5)*32); py.set(((e.clientY-r.top)/r.height-.5)*26); }}
    onPointerLeave={() => { px.set(0); py.set(0); }}>
    <div className="hero-scene">
    <motion.div className="absolute inset-0 pointer-events-none" style={{ rotate: ringRotation, scale: ringScale }}>
      <div className="hero-ring-spin hero-ring-spin-one absolute inset-0">
        <LiquidOrbit variant="one" />
      </div>
      <div className="hero-ring-spin hero-ring-spin-two absolute inset-0">
        <LiquidOrbit variant="two" />
      </div>
    </motion.div>
    <motion.div className="hero-cover-field absolute inset-0 pointer-events-none" style={{ rotate: orbitRotation }}>
      {covers.map((item, index) => <Cover key={item.track} item={item} x={x} y={y} progress={coverProgress} reduce={reduce} mobile={mobile} orbit={orbitRotation} sway={sway} artwork={uniqueArtwork[index].cover} />)}
    </motion.div>
    </div>
    <div className="hero-cover-shade" />
  </div>;
}
