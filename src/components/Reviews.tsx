import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Reveal } from "./Reveal";
import { useT, type Lang } from "../lib/i18n";

const GOOGLE_REVIEW_URL = "https://g.page/r/CR-OathU8KHLEAE/review";

type Testimonial = {
  name: string;
  rating: number;
  relative: Record<Lang, string>;
  quote: Record<Lang, string>;
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Marek Baňárek",
    rating: 5,
    relative: { sk: "pred 48 minútami", en: "48 minutes ago" },
    quote: { sk: "Bombasticky, chalani boli pohodoví, veľmi sa mi tam páčilo, moc odporúčam.", en: "Awesome vibe, the guys were super chill, I loved it there — highly recommend." },
  },
  {
    name: "Klara Zakova",
    rating: 5,
    relative: { sk: "pred 24 minútami", en: "24 minutes ago" },
    quote: { sk: "Príjemné prostredie a naozaj skvelý prístup, odporúčam aj bez skúseností s nahrávaním.", en: "Pleasant space and a genuinely great approach — I'd recommend it even without recording experience." },
  },
  {
    name: "jayden tii",
    rating: 5,
    relative: { sk: "pred 21 hodinami", en: "21 hours ago" },
    quote: { sk: "Veľmi profesionálny prístup", en: "Very professional approach" },
  },
  {
    name: "Adrián Chudý",
    rating: 5,
    relative: { sk: "pred dňom", en: "a day ago" },
    quote: { sk: "Profesionálny prístup, útulné prostredie", en: "Professional approach, cozy environment" },
  },
  {
    name: "Jaroslav Šubika",
    rating: 5,
    relative: { sk: "pred 3 dňami", en: "3 days ago" },
    quote: { sk: "Príjemné prostredie, skvelá spolupráca", en: "Pleasant environment, great collaboration" },
  },
  {
    name: "Matej Drinka",
    rating: 5,
    relative: { sk: "pred 2 týždňami", en: "2 weeks ago" },
    quote: { sk: "Sak moje tracky o tom svedčia", en: "My tracks speak for themselves" },
  },
  {
    name: "Damian",
    rating: 5,
    relative: { sk: "pred 19 hodinami", en: "19 hours ago" },
    quote: {
      sk: "Strašný zvuk 🙏 kapitánstvo úplne pri nahrávaní, stále fresh veci, nové spôsoby recordu jeden od druhého, nápady strieľajú jak rotačák, energia tam srší jak v universe. 🪬",
      en: "Insane sound 🙏 total command of the room while recording, always fresh stuff, new ways of recording one after another, ideas shooting out like a pinwheel — the energy in there sparks like the universe. 🪬",
    },
  },
];

export function Reviews() {
  const { t, lang } = useT();
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const scrollToIndex = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-review-card]");
    if (!card) return;
    const step = card.offsetWidth + 20;
    const clamped = Math.max(0, Math.min(TESTIMONIALS.length - 1, i));
    track.scrollTo({ left: step * clamped, behavior: "smooth" });
    setIndex(clamped);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const card = track.querySelector<HTMLElement>("[data-review-card]");
      if (!card) return;
      const step = card.offsetWidth + 20;
      setIndex(Math.round(track.scrollLeft / step));
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="reviews" className="border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="text-center">
          <h2 className="font-display text-balance text-3xl font-bold tracking-tight text-ink sm:text-[2.75rem]">
            {t("reviews_title")}
          </h2>
          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-5 py-2.5 text-[13px] font-semibold text-accent-soft transition-colors duration-200 hover:bg-accent/15"
          >
            <Star className="h-3.5 w-3.5 fill-accent-soft" />
            {t("reviews_cta")}
          </a>
        </Reveal>

        <Reveal delay={0.08} className="relative mt-14">
          <div className="hidden justify-end gap-2 pb-4 sm:flex">
            <button
              type="button"
              aria-label="Previous review"
              onClick={() => scrollToIndex(index - 1)}
              disabled={index === 0}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-ink transition-colors duration-200 hover:border-border-strong hover:bg-white/5 disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next review"
              onClick={() => scrollToIndex(index + 1)}
              disabled={index >= TESTIMONIALS.length - 1}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-ink transition-colors duration-200 hover:border-border-strong hover:bg-white/5 disabled:opacity-30"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div
            ref={trackRef}
            className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 pt-2"
          >
            {TESTIMONIALS.map((r) => (
              <figure
                key={r.name}
                data-review-card
                className="flex w-[82%] shrink-0 snap-start flex-col rounded-2xl border border-border bg-surface p-6 transition-[transform,border-color] duration-200 hover:-translate-y-1 hover:border-border-strong sm:w-[47%] md:w-[calc((100%-2.5rem)/3)]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-3 text-[12px] font-semibold text-ink">
                    {r.name.slice(0, 1).toUpperCase()}
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: r.rating }).map((_, j) => (
                      <Star key={j} className="h-3.5 w-3.5 fill-accent-soft text-accent-soft" />
                    ))}
                  </div>
                </div>
                <blockquote className="mt-4 flex-1 text-[14px] leading-relaxed text-ink/90">
                  &ldquo;{r.quote[lang]}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center justify-between border-t border-border pt-4 text-[13px]">
                  <span className="font-medium text-ink">{r.name}</span>
                  <span className="text-[11px] text-ink-faint">{r.relative[lang]}</span>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-6 flex justify-center gap-1.5">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to review ${i + 1}`}
                onClick={() => scrollToIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  i === index ? "w-6 bg-accent" : "w-1.5 bg-border hover:bg-border-strong"
                }`}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
