import { useEffect, useState, type PointerEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useT } from "../lib/i18n";
const sections = [ ['home','Úvod','Home'], ['music','Hudba','Music'], ['about','Štúdio','Studio'], ['pricing','Cenník','Pricing'], ['booking','Rezervácia','Booking'] ];
export function SectionProgress() {
  const { lang } = useT();
  const reduce = useReducedMotion();
  const [dragging, setDragging] = useState(false);
  const seek = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const fraction = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
    window.scrollTo({ top: fraction * (document.documentElement.scrollHeight - innerHeight), behavior: 'instant' });
  };
  const [state, setState] = useState({ progress: 0, active: 'home', phases: sections.map(() => ({ travel: 0 })) });
  useEffect(() => {
    let frame = 0;
    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      let active = 'home';
      for (const [id] of sections) if ((document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) <= innerHeight * .4) active = id;
      const clamp = (n: number) => Math.max(0, Math.min(1, n));
      const phases = sections.map(([id], index) => {
        const top = document.getElementById(id)?.getBoundingClientRect().top ?? Infinity;
        const next = document.getElementById(sections[index + 1]?.[0] ?? 'contact')?.getBoundingClientRect().top ?? Infinity;
        return { travel: clamp((innerHeight * .9 - top) / Math.max(1, next - top + innerHeight * .65)) };
      });
      setState({ phases, progress: Math.max(0, Math.min(100, max > 0 ? scrollY / max * 100 : 0)), active });
      frame = 0;
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const observer = new ResizeObserver(schedule); observer.observe(document.body);
    window.addEventListener('scroll', schedule, { passive: true }); window.addEventListener('resize', schedule); update();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); };
  }, []);
  return <nav className={`section-progress${dragging ? " is-dragging" : ""}`} aria-label={lang === 'sk' ? 'Sekcie stránky' : 'Page sections'}>
    <div className="section-ruler-hit" role="slider" tabIndex={0} aria-label={lang === 'sk' ? 'Pozícia na stránke' : 'Page position'} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(state.progress)} aria-orientation="vertical"
      onPointerDown={event => { if (event.button !== 0) return; event.preventDefault(); event.currentTarget.setPointerCapture(event.pointerId); setDragging(true); seek(event); }}
      onPointerMove={event => { if (event.currentTarget.hasPointerCapture(event.pointerId)) seek(event); }}
      onPointerUp={event => { if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId); setDragging(false); }}
      onPointerCancel={() => setDragging(false)} onLostPointerCapture={() => setDragging(false)}
      onKeyDown={event => {
        const max = document.documentElement.scrollHeight - innerHeight;
        const targets: Record<string, number> = { Home: 0, End: max, ArrowDown: scrollY + max * .01, ArrowUp: scrollY - max * .01, PageDown: scrollY + innerHeight, PageUp: scrollY - innerHeight };
        if (event.key in targets) { event.preventDefault(); window.scrollTo({ top: targets[event.key], behavior: 'instant' }); }
      }} />
    <div className="section-drag-window" aria-hidden="true" style={{ top: `${Math.max(0, Math.min(84, state.progress - 8))}%` }} />
    <div className="section-ruler" aria-hidden="true">{Array.from({ length: 101 }, (_, i) => <span key={i} style={{ top: `${i}%` }}>{i % 5 === 0 ? i : ''}</span>)}</div>
    <div className="section-marker" aria-hidden="true" style={{ top: `${state.progress}%` }}><span>{String(Math.round(state.progress)).padStart(2,'0')}%</span></div>
    <div className="section-labels">{sections.map(([id, sk, en], index) => {
      const label = (lang === 'sk' ? sk : en).toUpperCase();
      const { travel } = state.phases[index];
      const bottom = 90 - (sections.length - 1 - index) * 3;
      const top = 3 + index * 3;
      // A section travels up the rail independently of overall page progress.
      // The short entry/exit turns connect the two horizontal menus.
      const turn = Math.min(1, travel / .12, (1 - travel) / .12);
      const alongRail = Math.max(0, Math.min(1, (travel - .12) / .76));
      const position = travel < .12
        ? bottom + (76 - bottom) * turn
        : travel > .88 ? top + (20 - top) * turn : 76 - alongRail * 56;
      return <motion.a key={id} href={`#${id}`} aria-label={label} aria-current={state.active === id ? 'location' : undefined}
        style={{ transformOrigin: 'right center' }}
        animate={{ top: `${dragging ? 3 + index * 21 : position}%`, x: dragging ? -24 : 0, scale: dragging ? 1.25 : 1, opacity: dragging ? 1 : .45 + .55 * turn }}
        transition={{ duration: reduce ? 0 : .18, ease: 'easeOut' }}>
        <span aria-hidden="true">{Array.from(label).map((letter, i) => {
          const stagger = label.length > 1 ? (label.length - 1 - i) / (label.length - 1) * .045 : 0;
          // Every letter finishes its turn before the word begins travelling.
          const letterTurn = dragging || reduce ? 0 : Math.max(0, Math.min(1, (travel - stagger) / .075, (1 - travel - stagger) / .075));
          const distance = (label.length - 1 - i) * 10;
          return <motion.span key={i} animate={{ rotate: -90 * letterTurn, x: distance * letterTurn, y: distance * letterTurn }} transition={{ duration: reduce ? 0 : .24, ease: 'easeOut' }}>{letter}</motion.span>;
        })}</span>
      </motion.a>;
    })}</div>
  </nav>;
}
