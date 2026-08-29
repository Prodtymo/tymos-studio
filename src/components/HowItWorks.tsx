import { Reveal } from "./Reveal";
import { useT } from "../lib/i18n";

export function HowItWorks() {
  const { t } = useT();
  const steps = [1, 2, 3, 4].map((n) => ({
    title: t(`how_step${n}_title`),
    desc: t(`how_step${n}_desc`),
  }));

  return (
    <section id="how-it-works" className="border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-accent-soft">
            {t("how_kicker")}
          </span>
          <h2 className="font-display text-balance mt-4 text-3xl font-bold tracking-tight text-ink sm:text-[2.75rem]">
            {t("how_title")}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-dim">{t("how_desc")}</p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ title, desc }, i) => (
            <Reveal key={title} delay={i * 0.06}>
              <div className="relative h-full rounded-2xl border border-border bg-surface p-6">
                <span className="font-mono text-2xl font-bold tracking-tight text-accent-soft/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-[15px] font-semibold text-ink">{title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-dim">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
