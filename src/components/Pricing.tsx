import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "./Reveal";
import { useT } from "../lib/i18n";

type Tier = {
  key: string;
  price: string;
  unit?: string;
  features: string[];
  notes?: string[];
  ctaHref?: string;
  ctaLabel?: string;
};

const ONESTOP_ITEMS = ["session", "mix", "master", "beat"] as const;
const ONESTOP_ITEM_PRICES: Record<(typeof ONESTOP_ITEMS)[number], string> = {
  session: "€40",
  mix: "€100",
  master: "€100",
  beat: "€50",
};
const ONESTOP_VALUE = "€290";
const ONESTOP_PRICE = "€199";
const ONESTOP_SAVINGS = "€91";

export function Pricing() {
  const { t } = useT();

  const tiers: Tier[] = [
    { key: "basic", price: "€20", unit: "/hr", features: [t("tier_basic_f1"), t("tier_basic_f2")] },
    {
      key: "mixing",
      price: "€99",
      features: [t("tier_mixing_f1"), t("tier_mixing_f2"), t("tier_mixing_f3")],
      notes: [t("tier_mixing_note")],
      ctaHref: "/mixing",
      ctaLabel: t("tier_mixing_cta"),
    },
    {
      key: "mastering",
      price: "€99",
      features: [t("tier_mastering_f1"), t("tier_mastering_f2"), t("tier_mastering_f3")],
      notes: [t("tier_mastering_note")],
      ctaHref: "/mastering",
      ctaLabel: t("tier_mastering_cta"),
    },
  ];

  const renderCta = (href: string, label: string, className: string) =>
    href.startsWith("/") ? (
      <Link to={href} className={className}>
        {label}
      </Link>
    ) : (
      <a href={href} className={className}>
        {label}
      </a>
    );

  const renderTier = (tier: Tier, i: number) => (
    <Reveal
      key={tier.key}
      delay={i * 0.05}
      className="w-[78%] shrink-0 snap-center sm:w-[46%] md:w-[30%] lg:w-auto lg:shrink"
    >
      <div className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-[transform,border-color] duration-200 hover:-translate-y-1 hover:border-border-strong">
        <div className="min-h-[3.75rem]">
          <h3 className="font-display text-lg font-semibold text-ink">{t(`tier_${tier.key}_name`)}</h3>
          <p className="mt-1 text-[13px] text-ink-faint">{t(`tier_${tier.key}_tag`)}</p>
        </div>

        <div className="mt-2 flex items-baseline gap-1">
          <span className="font-mono text-3xl font-bold tracking-tight text-ink">{tier.price}</span>
          {tier.unit && <span className="font-mono text-[13px] text-ink-faint">{tier.unit}</span>}
        </div>

        <ul className="mt-6 flex-1 space-y-3">
          {tier.features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-[13px] text-ink-dim">
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-soft" />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        {tier.notes && tier.notes.length > 0 && (
          <div className="mt-5 space-y-1.5 text-[12px] italic leading-relaxed text-ink-faint">
            {tier.notes.map((n) => (
              <p key={n}>{n}</p>
            ))}
          </div>
        )}

        {renderCta(
          tier.ctaHref ?? "#booking",
          tier.ctaLabel ?? `${t("pricing_book")} ${t(`tier_${tier.key}_name`)}`,
          "mt-7 rounded-full border border-border-strong px-4 py-2.5 text-center text-[13px] font-semibold text-ink transition-colors duration-200 hover:bg-white/5 active:scale-[0.97]"
        )}
      </div>
    </Reveal>
  );

  return (
    <section id="pricing" className="border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-xl text-center">
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-accent-soft">
            {t("pricing_kicker")}
          </span>
          <h2 className="font-display text-balance mt-4 text-3xl font-bold tracking-tight text-ink sm:text-[2.75rem]">
            {t("pricing_title")}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-dim">{t("pricing_desc")}</p>
        </Reveal>

        <div className="no-scrollbar mt-14 -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 pt-4 sm:mx-0 sm:px-0 lg:grid lg:mx-auto lg:max-w-4xl lg:grid-cols-3 lg:overflow-visible lg:pb-0 lg:pt-0">
          {tiers.map((tier, i) => renderTier(tier, i))}
        </div>

        <Reveal delay={0.15} className="mx-auto mt-8 max-w-4xl">
          <div className="relative rounded-2xl border border-accent/50 bg-gradient-to-b from-accent/[0.12] to-surface p-8 shadow-[0_0_0_1px_var(--color-accent-ring),0_24px_60px_-24px_var(--color-accent-glow)] sm:p-10">
            <span className="font-mono absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-accent-2 px-3 py-1 text-[12px] font-bold uppercase tracking-wider text-white">
              {t("pricing_popular")}
            </span>

            <div className="grid gap-8 sm:grid-cols-2 sm:items-center">
              <div>
                <h3 className="font-display text-2xl font-semibold text-ink">{t("tier_onestop_name")}</h3>
                <p className="mt-1 text-[13px] text-ink-dim">{t("tier_onestop_tag")}</p>

                <div className="mt-6 space-y-3 border-t border-border/60 pt-6">
                  {ONESTOP_ITEMS.map((item) => (
                    <div key={item} className="flex items-center justify-between text-[14px] text-ink-dim">
                      <span>{t(`onestop_item_${item}`)}</span>
                      <span className="font-mono text-ink-faint">{ONESTOP_ITEM_PRICES[item]}</span>
                    </div>
                  ))}
                </div>

                <p className="mt-5 text-[12px] italic leading-relaxed text-ink-dim">{t("tier_onestop_note")}</p>
              </div>

              <div className="flex flex-col items-start gap-4 sm:items-end sm:text-right">
                <div>
                  <div className="text-[12px] text-ink-faint">{t("onestop_value_label")}</div>
                  <div className="mt-1 flex items-baseline gap-2 sm:justify-end">
                    <span className="text-[15px] text-ink-faint line-through">{ONESTOP_VALUE}</span>
                    <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[11px] font-semibold text-accent-soft">
                      {t("onestop_savings_label")} {ONESTOP_SAVINGS}
                    </span>
                  </div>
                  <div className="mt-2 flex items-baseline gap-1 sm:justify-end">
                    <span className="font-mono text-4xl font-bold tracking-tight text-ink">{ONESTOP_PRICE}</span>
                  </div>
                  <p className="mt-1 text-[12px] text-ink-faint">{t("onestop_price_label")}</p>
                </div>

                <a
                  href="#booking"
                  className="w-full rounded-full bg-accent-2 px-6 py-3 text-center text-[14px] font-semibold text-white transition-transform duration-200 active:scale-[0.97] sm:w-auto"
                >
                  {t("pricing_book")} {t("tier_onestop_name")}
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2} className="mx-auto mt-6 max-w-4xl">
          <div className="flex flex-col items-start justify-between gap-3 rounded-xl border border-border/60 bg-surface/30 px-6 py-4 text-[13px] sm:flex-row sm:items-center">
            <div>
              <span className="font-medium text-ink-dim">{t("tier_custom_name")}</span>
              <span className="text-ink-faint"> — {t("tier_custom_f1")}</span>
            </div>
            <a
              href="mailto:inquiry@tymostudio.com?subject=Project%20inquiry"
              className="shrink-0 font-medium text-accent-soft transition-opacity duration-200 hover:opacity-80"
            >
              {t("tier_custom_cta")} →
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.25} className="mx-auto mt-14 max-w-2xl space-y-2 text-center text-[13px] leading-relaxed text-ink-faint">
          <p>{t("pricing_policy_1")}</p>
          <p>{t("pricing_policy_2")}</p>
        </Reveal>
      </div>
    </section>
  );
}
