import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useT, type Lang } from "../lib/i18n";
import { PageHeader } from "../components/PageHeader";

type Section = { heading?: string; paragraphs?: string[]; list?: string[] };
type Content = { title: string; updated: string; intro: string; sections: Section[]; back: string; docTitle: string };

const content: Record<Lang, Content> = {
  sk: {
    docTitle: "Ochrana osobných údajov | Tymo's Studio",
    title: "Ochrana osobných údajov",
    updated: "Posledná aktualizácia: 16. augusta 2026",
    intro:
      "Tymo's Studio (prevádzkovateľ: Timotej Kudoláni) rešpektuje tvoje súkromie. Táto stránka vysvetľuje, aké osobné údaje zbierame, prečo, a ako ich chránime.",
    back: "Späť na hlavnú stránku",
    sections: [
      {
        heading: "Aké údaje zbierame",
        paragraphs: ["Keď si rezervuješ session cez náš rezervačný systém (Cal.com), zbierame:"],
        list: [
          "Meno",
          "E-mailovú adresu",
          "Telefónne číslo (ak ho zadáš)",
          "Detaily rezervácie (dátum, čas, zvolený balíček)",
        ],
      },
      {
        heading: "Prečo tieto údaje zbierame",
        paragraphs: ["Výhradne na to, aby sme mohli:"],
        list: [
          "Potvrdiť a spravovať tvoju rezerváciu",
          "Kontaktovať ťa v súvislosti so session (zmeny, pripomienky, otázky)",
        ],
      },
      {
        paragraphs: ["Nepoužívame tvoje údaje na marketing bez tvojho výslovného súhlasu."],
      },
      {
        heading: "Kto má prístup k údajom",
        paragraphs: [
          "Rezervačný systém prevádzkuje Cal.com, ktorý spracúva tvoje údaje v našom mene ako sprostredkovateľ. Cal.com má vlastné zásady ochrany osobných údajov dostupné na ich webe.",
          "Tvoje údaje nepredávame ani neposkytujeme tretím stranám na marketingové účely.",
        ],
      },
      {
        heading: "Ako dlho údaje uchovávame",
        paragraphs: ["Údaje o rezervácii uchovávame maximálne 10 rokov, v súlade s účtovnými povinnosťami."],
      },
      {
        heading: "Tvoje práva",
        paragraphs: ["Máš právo:"],
        list: [
          "Požiadať o prístup k svojim údajom",
          "Požiadať o opravu nesprávnych údajov",
          "Požiadať o vymazanie svojich údajov",
          "Odvolať súhlas so spracovaním kedykoľvek",
        ],
      },
      {
        heading: "Kontakt",
        paragraphs: ["Pre akékoľvek otázky ohľadom ochrany osobných údajov nás kontaktuj na: tymofx@gmail.com"],
      },
    ],
  },
  en: {
    docTitle: "Privacy Policy | Tymo's Studio",
    title: "Privacy Policy",
    updated: "Last updated: August 16, 2026",
    intro:
      "Tymo's Studio (operator: Timotej Kudoláni) respects your privacy. This page explains what personal data we collect, why, and how it's protected.",
    back: "Back to homepage",
    sections: [
      {
        heading: "What data we collect",
        paragraphs: ["When you book a session through our booking system (Cal.com), we collect:"],
        list: ["Name", "Email address", "Phone number (if provided)", "Booking details (date, time, selected package)"],
      },
      {
        heading: "Why we collect this data",
        paragraphs: ["Solely to:"],
        list: ["Confirm and manage your booking", "Contact you regarding your session (changes, reminders, questions)"],
      },
      {
        paragraphs: ["We do not use your data for marketing without your explicit consent."],
      },
      {
        heading: "Who has access to your data",
        paragraphs: [
          "Our booking system is operated by Cal.com, which processes your data on our behalf as a data processor. Cal.com has its own privacy policy available on their website.",
          "We do not sell or share your data with third parties for marketing purposes.",
        ],
      },
      {
        heading: "How long we keep your data",
        paragraphs: ["Booking data is retained for a maximum of 10 years, in line with accounting obligations."],
      },
      {
        heading: "Your rights",
        paragraphs: ["You have the right to:"],
        list: [
          "Request access to your data",
          "Request correction of inaccurate data",
          "Request deletion of your data",
          "Withdraw consent for processing at any time",
        ],
      },
      {
        heading: "Contact",
        paragraphs: ["For any questions about privacy or data protection, contact us at: tymofx@gmail.com"],
      },
    ],
  },
};

export function Privacy() {
  const { lang } = useT();
  const c = content[lang];

  useEffect(() => {
    document.title = c.docTitle;
  }, [c.docTitle]);

  return (
    <div className="min-h-screen bg-bg text-ink">
      <PageHeader />

      <main className="mx-auto max-w-3xl px-5 pb-24 pt-32 sm:px-8">
        <h1 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">{c.title}</h1>
        <p className="mt-3 text-[13px] text-ink-faint">{c.updated}</p>
        <p className="mt-8 text-base leading-relaxed text-ink-dim">{c.intro}</p>

        <div className="mt-12 space-y-10">
          {c.sections.map((s, i) => (
            <section key={i}>
              {s.heading && <h2 className="text-xl font-semibold text-ink">{s.heading}</h2>}
              {s.paragraphs?.map((p, j) => (
                <p key={j} className="mt-3 text-base leading-relaxed text-ink-dim">
                  {p}
                </p>
              ))}
              {s.list && (
                <ul className="mt-4 space-y-2">
                  {s.list.map((item) => (
                    <li key={item} className="flex gap-3 text-base text-ink-dim">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <div className="mt-16 border-t border-border pt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-[13px] font-medium text-ink transition-colors duration-200 hover:border-accent/40 hover:text-accent-soft"
          >
            <ArrowLeft className="h-4 w-4" />
            {c.back}
          </Link>
        </div>
      </main>
    </div>
  );
}
