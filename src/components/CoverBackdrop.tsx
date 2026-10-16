import { useRef } from "react";
import { motion, useMotionValue, useSpring, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";
import { TRACKS } from "../lib/tracks";

const covers = [
  { track: 0, x: 6, y: 23, size: 166, angle: -13, depth: 1.3 },
  { track: 1, x: 83, y: 20, size: 156, angle: 12, depth: 0.8 },
  { track: 2, x: -3, y: 61, size: 190, angle: 9, depth: 0.7 },
  { track: 3, x: 89, y: 57, size: 178, angle: -10, depth: 1.2 },
  { track: 5, x: 20, y: 81, size: 120, angle: -7, depth: 0.6 },
  { track: 7, x: 70, y: 84, size: 130, angle: 14, depth: 0.9 },
  { track: 8, x: 28, y: 9, size: 94, angle: 7, depth: 0.4 },
  { track: 9, x: 65, y: 6, size: 105, angle: -12, depth: 0.5 },
];
function Cover({ item, x, y, progress, reduce }: { item: typeof covers[number]; x: MotionValue<number>; y: MotionValue<number>; progress: MotionValue<number>; reduce: boolean }) {
  const dx = useTransform(x, v => reduce ? 0 : v * item.depth);
  const dy = useTransform([y, progress], ([pointer, scroll]) => reduce ? 0 : Number(pointer) * item.depth - Number(scroll) * 160 * item.depth);
  const rotate = useTransform(progress, v => item.angle + (reduce ? 0 : v * (34 + item.depth * 28)));
  const scale = useTransform(progress, v => reduce ? 1 : 1 + v * (item.depth >= 0.9 ? 0.48 : 0.16));
  return <motion.div className="hero-cover" style={{ left: `${item.x}%`, top: `${item.y}%`, width: item.size, x: dx, y: dy, rotate, scale }}>
    <img src={TRACKS[item.track].cover} alt="" width="300" height="300" draggable={false} />
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
  const px = useMotionValue(0), py = useMotionValue(0);
  const x = useSpring(px, { stiffness: 45, damping: 22 }), y = useSpring(py, { stiffness: 45, damping: 22 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // A lightly damped spring carries the artwork briefly past a scroll stop.
  const coverProgress = useSpring(scrollYProgress, { stiffness: 75, damping: 15, mass: 0.8, restDelta: 0.0001 });
  const orbitRotation = useTransform(coverProgress, [0, 1], [0, reduce ? 0 : 38]);
  const ringRotation = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 75]);
  const ringScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.2]);
  return <div ref={ref} aria-hidden="true" className="cover-backdrop absolute inset-0"
    onPointerMove={e => { if (reduce || e.pointerType !== "mouse") return; const r = e.currentTarget.getBoundingClientRect(); px.set(((e.clientX-r.left)/r.width-.5)*32); py.set(((e.clientY-r.top)/r.height-.5)*26); }}
    onPointerLeave={() => { px.set(0); py.set(0); }}>
    <motion.div className="absolute inset-0 pointer-events-none" style={{ rotate: ringRotation, scale: ringScale }}>
      <motion.div className="absolute inset-0" animate={reduce ? { rotate: 0 } : { rotate: 360 }} transition={{ duration: 100, repeat: Infinity, ease: "linear" }}>
        <LiquidOrbit variant="one" />
      </motion.div>
      <motion.div className="absolute inset-0" animate={reduce ? { rotate: 0 } : { rotate: -360 }} transition={{ duration: 140, repeat: Infinity, ease: "linear" }}>
        <LiquidOrbit variant="two" />
      </motion.div>
    </motion.div>
    <motion.div className="hero-cover-field absolute inset-0 pointer-events-none" style={{ rotate: orbitRotation }}>
      {covers.map(item => <Cover key={item.track} item={item} x={x} y={y} progress={coverProgress} reduce={reduce} />)}
    </motion.div>
    <div className="hero-cover-shade" />
  </div>;
}
