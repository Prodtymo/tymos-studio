import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "./Reveal";
import { useT } from "../lib/i18n";
import { cn } from "../lib/utils";

type Tier = {
  key: string;
  price: string;
  unit?: string;
  featured?: boolean;
  features: string[];
  notes?: string[];
  ctaHref?: string;
  ctaLabel?: string;
};

export function Pricing() {
  const { t } = useT();

  const serviceTiers: Tier[] = [
    {
      key: "mixing",
      price: "€100",
      features: [t("tier_mixing_f1"), t("tier_mixing_f2"), t("tier_mixing_f3")],
      notes: [t("tier_mixing_note")],
      ctaHref: "/mixing",
      ctaLabel: t("tier_mixing_cta"),
    },
    {
      key: "mastering",
      price: "€100",
      features: [t("tier_mastering_f1"), t("tier_mastering_f2"), t("tier_mastering_f3")],
      notes: [t("tier_mastering_note")],
      ctaHref: "/mastering",
      ctaLabel: t("tier_mastering_cta"),
    },
  ];

  const packageTiers: Tier[] = [
    { key: "basic", price: "€20", unit: "/hr", features: [t("tier_basic_f1"), t("tier_basic_f2")] },
    { key: "standard", price: "€129.99", features: [t("tier_standard_f1"), t("tier_standard_f2")] },
    {
      key: "onestop",
      price: "€149.99",
      featured: true,
      features: [t("tier_onestop_f1"), t("tier_onestop_f2"), t("tier_onestop_f3")],
      notes: [t("tier_onestop_note")],
    },
    {
      key: "ep",
      price: "€599",
      features: [t("tier_ep_f1"), t("tier_ep_f2")],
      notes: [t("tier_note_songs"), t("tier_ep_note")],
    },
    {
      key: "custom",
      price: t("tier_custom_price"),
      features: [t("tier_custom_f1"), t("tier_custom_f2")],
      ctaHref: "mailto:tymofx@gmail.com?subject=Project%20inquiry",
      ctaLabel: t("tier_custom_cta"),
    },
  ];

  const renderTier = (tier: Tier, i: number) => (
    <Reveal key={tier.key} delay={i * 0.05} className="w-[78%] shrink-0 snap-center sm:w-[46%] md:w-[32%] lg:w-auto lg:shrink">
      <div
        className={cn(
          "relative flex h-full flex-col rounded-2xl border p-6 transition-[transform,border-color] duration-200",
          tier.featured
            ? "border-accent/50 bg-gradient-to-b from-accent/[0.12] to-surface shadow-[0_0_0_1px_var(--color-accent-ring),0_24px_60px_-24px_var(--color-accent-glow)] lg:scale-[1.04]"
            : "border-border bg-surface hover:-translate-y-1 hover:border-border-strong"
        )}
      >
        {tier.featured && (
          <span className="font-mono absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-accent-2 px-3 py-1 text-[12px] font-bold uppercase tracking-wider text-white">
            {t("pricing_popular")}
          </span>
        )}

        <div className="min-h-[3.75rem]">
          <h3 className="font-display text-lg font-semibold text-ink">{t(`tier_${tier.key}_name`)}</h3>
          <p className={cn("mt-1 text-[13px]", tier.featured ? "text-ink-dim" : "text-ink-faint")}>
            {t(`tier_${tier.key}_tag`)}
          </p>
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
          <div className={cn("mt-5 space-y-1.5 text-[12px] italic leading-relaxed", tier.featured ? "text-ink-dim" : "text-ink-faint")}>
            {tier.notes.map((n) => (
              <p key={n}>{n}</p>
            ))}
          </div>
        )}

        {(() => {
          const href = tier.ctaHref ?? "#booking";
          const label = tier.ctaLabel ?? `${t("pricing_book")} ${t(`tier_${tier.key}_name`)}`;
          const ctaClassName = cn(
            "mt-7 rounded-full px-4 py-2.5 text-center text-[13px] font-semibold transition-transform duration-200 active:scale-[0.97]",
            tier.featured ? "bg-accent-2 text-white" : "border border-border-strong text-ink hover:bg-white/5"
          );
          return href.startsWith("/") ? (
            <Link to={href} className={ctaClassName}>
              {label}
            </Link>
          ) : (
            <a href={href} className={ctaClassName}>
              {label}
            </a>
          );
        })()}
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

        <Reveal delay={0.05} className="mt-14">
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-ink-faint">
            {t("pricing_section_packages")}
          </span>
        </Reveal>
        <div className="no-scrollbar mt-5 -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 pt-4 sm:mx-0 sm:px-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:pb-0 lg:pt-0">
          {packageTiers.map((tier, i) => renderTier(tier, i))}
        </div>

        <Reveal delay={0.05} className="mt-16">
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-ink-faint">
            {t("pricing_section_services")}
          </span>
        </Reveal>
        <div className="no-scrollbar mt-5 -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 pt-4 sm:mx-0 sm:px-0 lg:grid lg:mx-auto lg:max-w-2xl lg:grid-cols-2 lg:overflow-visible lg:pb-0 lg:pt-0">
          {serviceTiers.map((tier, i) => renderTier(tier, i))}
        </div>

        <Reveal delay={0.2} className="mx-auto mt-14 max-w-2xl space-y-2 text-center text-[13px] leading-relaxed text-ink-faint">
          <p>{t("pricing_policy_1")}</p>
          <p>{t("pricing_policy_2")}</p>
        </Reveal>
      </div>
    </section>
  );
}
