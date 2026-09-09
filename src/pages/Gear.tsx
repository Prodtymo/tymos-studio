import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Drum,
  Guitar,
  Headphones,
  Layers,
  Mic,
  Piano,
  Sliders,
  Volume2,
  Wand2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useT, type Lang } from "../lib/i18n";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { Reveal } from "../components/Reveal";

type Item = { key: string; icon: LucideIcon };
type Category = { key: string; items: Item[] };

const CATEGORIES: Category[] = [
  {
    key: "mics",
    items: [
      { key: "tlm102", icon: Mic },
      { key: "sm57", icon: Mic },
      { key: "nt1", icon: Mic },
    ],
  },
  {
    key: "interface",
    items: [
      { key: "apollo", icon: Sliders },
      { key: "hs7", icon: Volume2 },
      { key: "m50x", icon: Headphones },
    ],
  },
  {
    key: "instruments",
    items: [
      { key: "synth", icon: Piano },
      { key: "acoustic", icon: Guitar },
      { key: "percussion", icon: Drum },
    ],
  },
  {
    key: "software",
    items: [
      { key: "daws", icon: Layers },
      { key: "autotune", icon: Wand2 },
      { key: "analog", icon: Sliders },
    ],
  },
];

type Content = { docTitle: string; back: string };
const pageContent: Record<Lang, Content> = {
  sk: { docTitle: "Vybavenie štúdia | Tymo's Studio", back: "Späť na hlavnú stránku" },
  en: { docTitle: "Studio Gear | Tymo's Studio", back: "Back to homepage" },
};

export function Gear() {
  const { t, lang } = useT();
  const c = pageContent[lang];

  useEffect(() => {
    document.title = c.docTitle;
  }, [c.docTitle]);

  return (
    <div className="min-h-screen bg-bg text-ink">
      <Nav />

      <main className="mx-auto max-w-6xl px-5 pb-24 pt-32 sm:px-8">
        <div className="grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
          <Reveal>
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-accent-soft">
              {t("gear_kicker")}
            </span>
            <h1 className="font-display text-balance mt-4 text-3xl font-bold tracking-tight text-ink sm:text-[2.75rem] sm:leading-[1.05]">
              {t("gear_title")}
            </h1>
            <p className="mt-6 text-[15px] leading-relaxed text-ink-dim sm:text-base">{t("gear_desc")}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-2xl border border-border">
              <img
                src="/images/detail/apollo-interface.jpg"
                alt="Universal Audio Apollo interface in Tymo's Studio"
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/[0.06]" />
            </div>
          </Reveal>
        </div>

        <div className="mt-20 space-y-16">
          {CATEGORIES.map((category, ci) => (
            <section key={category.key}>
              <Reveal delay={0.05}>
                <h2 className="font-display text-xl font-semibold text-ink">{t(`gear_cat_${category.key}`)}</h2>
              </Reveal>
              <div className="mt-6 grid gap-5 sm:grid-cols-3">
                {category.items.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <Reveal key={item.key} delay={ci * 0.03 + i * 0.05}>
                      <div className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-colors duration-200 hover:border-border-strong">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent-soft">
                          <Icon className="h-5 w-5" />
                        </div>
                        <h3 className="mt-5 text-[15px] font-semibold text-ink">{t(`gear_item_${item.key}_name`)}</h3>
                        <p className="mt-2 text-[13px] leading-relaxed text-ink-dim">
                          {t(`gear_item_${item.key}_desc`)}
                        </p>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
              {category.key === "mics" && (
                <p className="mt-5 text-[12px] italic leading-relaxed text-ink-faint">{t("gear_mics_note")}</p>
              )}
            </section>
          ))}
        </div>

        <Reveal delay={0.15} className="mt-20 flex flex-col items-start gap-4 border-t border-border pt-10 sm:flex-row sm:items-center sm:justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-[13px] font-medium text-ink transition-colors duration-200 hover:border-accent/40 hover:text-accent-soft"
          >
            <ArrowLeft className="h-4 w-4" />
            {c.back}
          </Link>
          <a
            href="/#booking"
            className="inline-flex items-center gap-2 rounded-full bg-accent-2 px-5 py-2.5 text-[13px] font-semibold text-white transition-transform duration-200 active:scale-[0.97]"
          >
            {t("gear_book_cta")}
          </a>
        </Reveal>
      </main>

      <Footer />
    </div>
  );
}
