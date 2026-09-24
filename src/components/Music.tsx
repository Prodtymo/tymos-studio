import { useEffect, useRef, useState } from "react";
import { Play, ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Reveal } from "./Reveal";
import { useT } from "../lib/i18n";
type Track = { title: string; artists: string; tagKey: string; cover: string; link: string };
const TRACKS: Track[] = [
  { title: "REDFLAG", artists: "DEST1NY", tagKey: "music_tag_recorded_mixed_mastered", cover: "https://i.scdn.co/image/ab67616d0000b2731157d95aac07d6e42d644a43", link: "https://open.spotify.com/track/6FdBU9BAgvxF6s6MmNa8GT" },
  { title: "Skiaphos", artists: "Maty Drion, Klara", tagKey: "music_tag_recorded_mixed_mastered", cover: "https://i.scdn.co/image/ab67616d0000b2734dbf3fa7660fcbd40f812934", link: "https://open.spotify.com/track/3VK2k9v1HL7ANRoTeU0q90" },
  { title: "Valletta", artists: "Maty Drion", tagKey: "music_tag_recorded_mixed_mastered", cover: "https://i.scdn.co/image/ab67616d0000b2734dbf3fa7660fcbd40f812934", link: "https://open.spotify.com/track/1xAAIHUNnC9cVWfBLdnKKM" },
  { title: "Spinnin", artists: "Maty Drion, RAF ZODIAC, Marzoo", tagKey: "music_tag_mixed_mastered", cover: "https://i.scdn.co/image/ab67616d0000b2734dbf3fa7660fcbd40f812934", link: "https://open.spotify.com/track/2TasCmuuLDggc0QzEw69Ne" },
  { title: "Som Fajn", artists: "Maty Drion", tagKey: "music_tag_mixed_mastered", cover: "https://i.scdn.co/image/ab67616d0000b2732331f0f34a2ddf09fddaa0fd", link: "https://open.spotify.com/track/03foIU4rnlp9mQdBCTb3sK" },
  { title: "Som Fajn RMX", artists: "Maty Drion, dayindegenerate", tagKey: "music_tag_mixed_mastered", cover: "https://i.scdn.co/image/ab67616d0000b27345fbbe41678b1b016e67dc63", link: "https://open.spotify.com/track/0N6Rb1NXENsLCAml3k5ZeN" },
  { title: "LAVIDA", artists: "Maty Drion", tagKey: "music_tag_mixed_mastered", cover: "https://i.scdn.co/image/ab67616d0000b27383ebcb660949f86158dad9f6", link: "https://open.spotify.com/track/0iMr506UWnARkTtln1g2Rq" },
  { title: "Vienna", artists: "Maty Drion", tagKey: "music_tag_mixed_mastered", cover: "https://i.scdn.co/image/ab67616d0000b2738bf0ebdda8f59d54cb25b822", link: "https://open.spotify.com/track/5862aLbteM9btpkt9XbP1D" },
  { title: "Nech To Tak", artists: "Maty Drion feat. Miku", tagKey: "music_tag_recorded_mixed_mastered", cover: "https://i.scdn.co/image/ab67616d0000b27365d5d98e6ebb2d34a1bea9c0", link: "https://open.spotify.com/track/7Bm0gWC8PWFergyK4irq7x" },
];


export function Music() {
  const { t, lang } = useT();
  const [active, setActive] = useState<Track | null>(null);
  const slider = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const updateEdges = () => {
    const el = slider.current;
    if (el) setEdges({ start: el.scrollLeft <= 2, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2 });
  };
  useEffect(() => {
    const el = slider.current;
    if (!el) return;
    const observer = new ResizeObserver(updateEdges);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  const browse = (direction: number) => {
    const el = slider.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };
  return (
    <section id="music" className="overflow-hidden border-t border-border py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent-soft">{lang === "sk" ? "Najprv si to vypočuj" : "Hear it first"}</p>
            <h2 id="music-title" className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">{t("music_title")}</h2>
            <p className="mt-4 text-base text-ink-dim">{lang === "sk" ? "Výber z trackov, na ktorých som pracoval. Od prvého takeu až po finálny master." : "A selection of tracks I’ve worked on. From the first take to the final master."}</p>
          </div>
          <a href="#pricing" className="inline-flex min-h-11 items-center gap-2 text-sm text-accent-soft">{t("hero_cta_pricing")} <ArrowUpRight size={18} /></a>
        </Reveal>
        <div className="mt-8 flex items-center justify-between gap-4">
          <p className="text-sm text-ink-dim"><span className="font-semibold text-ink">{TRACKS.length} {lang === "sk" ? "skladieb" : "tracks"}</span><span className="mx-2 text-ink-faint">/</span>{lang === "sk" ? "Prejdi celý výber" : "Explore the selection"}</p>
          <div className="flex gap-2">
            <button type="button" aria-label={lang === "sk" ? "Predošlé skladby" : "Previous tracks"} aria-controls="track-list" disabled={edges.start} onClick={() => browse(-1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-border-strong hover:bg-white/5 disabled:opacity-30"><ChevronLeft size={20} /></button>
            <button type="button" aria-label={lang === "sk" ? "Ďalšie skladby" : "Next tracks"} aria-controls="track-list" disabled={edges.end} onClick={() => browse(1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-border-strong hover:bg-white/5 disabled:opacity-30"><ChevronRight size={20} /></button>
          </div>
        </div>
      </div>
      <div ref={slider} id="track-list" role="region" aria-labelledby="music-title" tabIndex={0} onScroll={updateEdges}
        onKeyDown={(event) => { if (event.target !== event.currentTarget) return; if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); browse(event.key === "ArrowRight" ? 1 : -1); } }}
        className="mt-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-5 [scroll-padding-inline:1.25rem] sm:px-8 sm:[scroll-padding-inline:2rem] lg:px-[max(2rem,calc((100vw-72rem)/2+2rem))] lg:[scroll-padding-inline:max(2rem,calc((100vw-72rem)/2+2rem))]">
        {TRACKS.map((tr, index) => <article key={tr.link} className="flex w-[76vw] max-w-[300px] shrink-0 snap-start flex-col rounded-2xl border border-border bg-surface p-3.5 sm:w-[240px]">
          <div className="relative">
            <img src={tr.cover} alt="" width="300" height="300" loading="lazy" className="aspect-square w-full rounded-xl object-cover" />
            <span aria-hidden="true" className="absolute left-3 top-3 rounded-full bg-black/70 px-2.5 py-1 text-xs text-white">{String(index + 1).padStart(2, "0")}</span>
          </div>
          <h3 className="mt-4 text-lg font-semibold">{tr.title}</h3>
          <p className="mt-1 min-h-10 text-sm text-ink-dim">{tr.artists}</p>
          <p className="mt-2 min-h-9 text-xs leading-relaxed text-accent-soft">{t(tr.tagKey)}</p>
          <button type="button" onClick={() => setActive(tr)} aria-pressed={active?.link === tr.link} aria-controls="music-player" aria-label={`${lang === "sk" ? "Načítať prehrávač" : "Load player"}: ${tr.title}`} className="mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-border-strong text-sm hover:bg-white/5 aria-pressed:border-accent aria-pressed:text-accent-soft"><Play size={16} />{lang === "sk" ? "Vypočuť na stránke" : "Listen here"}</button>
        </article>)}
      </div>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div id="music-player">
          {active && <div className="mt-5 rounded-2xl border border-border bg-surface p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between gap-4">
              <p className="text-sm font-medium" aria-live="polite">{active.title} <span className="text-ink-dim">— {active.artists}</span></p>
              <button type="button" onClick={() => setActive(null)} aria-label={lang === "sk" ? "Zavrieť prehrávač" : "Close player"} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border"><X size={18} /></button>
            </div>
            <iframe key={active.link} title={`Spotify: ${active.title} — ${active.artists}`} src={active.link.replace("/track/", "/embed/track/")} width="100%" height="152" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" className="rounded-xl border-0" />
            <a href={active.link} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex min-h-11 items-center text-sm text-accent-soft underline">{lang === "sk" ? "Prehrávač sa nenačítal? Otvoriť Spotify" : "Player not loading? Open Spotify"}</a>
          </div>}
        </div>
        <p className="mt-4 text-xs leading-relaxed text-ink-faint">{lang === "sk" ? "Prehrávač Spotify sa načíta až po kliknutí. Dostupnosť prehrávania závisí od Spotify." : "Spotify’s player loads only when you click. Playback availability is controlled by Spotify."}</p>
      </div>
    </section>
  );
}
