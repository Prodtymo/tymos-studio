import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useT } from "../lib/i18n";

export function Hero() {
  const { t } = useT();
  const reduce = useReducedMotion();

  return (
    <section id="home" className="relative flex min-h-[100svh] items-end overflow-hidden pb-20 pt-32 sm:items-center sm:pb-0">
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero/studio-wide.jpg"
          alt="Tymo's Studio recording room with acoustic panels and ambient purple lighting"
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-bg/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/50 to-transparent" />
        <div className="absolute inset-0 bg-bg/25" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8">
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", bounce: 0, duration: 0.6, delay: 0.1 }}
          className="max-w-2xl"
        >
          <span className="font-mono inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-accent-soft">
            {t("hero_badge")}
          </span>

          <h1 className="font-display text-balance mt-6 text-[13vw] font-bold leading-[0.98] tracking-[-0.03em] text-ink sm:text-6xl md:text-7xl">
            {t("hero_title_1_lead")} <span className="text-accent-soft">{t("hero_title_1_accent")}</span>
            <br />
            <span className="text-ink-dim">{t("hero_title_2")}</span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-dim sm:text-lg">
            {t("hero_desc")}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#booking"
              className="group inline-flex items-center gap-2 rounded-full bg-accent-2 px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_0_0_1px_var(--color-ring-highlight),0_18px_40px_-14px_var(--color-accent-glow)] transition-transform duration-200 active:scale-[0.97]"
            >
              {t("hero_cta_book")}
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
            <a
              href="#pricing"
              className="rounded-full border border-border-strong px-6 py-3.5 text-[15px] font-medium text-ink transition-colors duration-200 hover:bg-white/5"
            >
              {t("hero_cta_pricing")}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
