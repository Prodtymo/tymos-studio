import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { useT } from "../lib/i18n";

const PHOTOS = [
  "session-1",
  "session-2",
  "session-3",
  "session-4",
  "session-5",
  "session-6",
  "session-7",
];

export function Gallery() {
  const { t } = useT();
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCards = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-gallery-card]");
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section id="gallery" className="border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-lg">
            <h2 className="font-display text-balance text-3xl font-bold tracking-tight text-ink sm:text-[2.75rem]">
              {t("gallery_title")}
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-dim">{t("gallery_desc")}</p>
          </div>
          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => scrollByCards(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-ink transition-colors duration-200 hover:border-border-strong hover:bg-white/5"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => scrollByCards(1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-ink transition-colors duration-200 hover:border-border-strong hover:bg-white/5"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.08} className="relative mt-10">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-bg to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-bg to-transparent sm:w-24" />
        <div
          ref={trackRef}
          className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 sm:px-8"
        >
          {PHOTOS.map((p, i) => (
            <div
              key={p}
              data-gallery-card
              className="relative aspect-[3/4] w-[62vw] shrink-0 snap-center overflow-hidden rounded-2xl border border-border bg-surface sm:w-[34vw] md:w-[24vw] lg:w-[19vw]"
            >
              <img
                src={`/images/gallery/${p}.jpg`}
                alt={`Session at Tymo's Studio, photo ${i + 1}`}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-[1.04]"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/[0.06]" />
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
