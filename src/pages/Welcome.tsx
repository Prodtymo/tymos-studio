import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Wifi } from "lucide-react";
import { useT, type Lang } from "../lib/i18n";
import { PageHeader } from "../components/PageHeader";

// The real network name/password used to live here as plain strings. This
// page has no auth and no gating, so anything hardcoded here ends up
// public: reachable by direct URL and compiled into the JS bundle every
// visitor downloads, not just people who booked a session. The actual
// credentials now go out via the Cal.com booking-confirmation message (or
// verbally on arrival) instead of shipping in the public build.

type Content = {
  docTitle: string;
  kicker: string;
  title: string;
  paragraphs: string[];
  wifi_label: string;
  wifi_note: string;
  back: string;
};

const content: Record<Lang, Content> = {
  sk: {
    docTitle: "Vitaj | Tymo's Studio",
    kicker: "Vitaj v štúdiu",
    title: "Vitaj v Tymo's Studio 🎙️",
    paragraphs: [
      "Som rád, že si tu, ďakujem za rezerváciu. Tento priestor vznikol preto, aby sa dala robiť dobrá muzika bez stresu zo strohého, prehnane „profesionálneho\" štúdiového vibu, len poriadny setup, dobré ucho a dosť času na to, aby sme ten take naozaj trafili.",
      "Pripoj sa na WiFi nižšie, sadni si a spohodli sa. Keď budeš pripravený, ideme na to.",
      "Pár drobností: nápoje mimo techniky, a ak počas session čokoľvek potrebuješ (vodu, pauzu, hocičo) pokojne povedz.",
      "Poďme dnes spraviť niečo dobré.",
      "Tymo",
    ],
    wifi_label: "WiFi",
    wifi_note: "Sieť aj heslo nájdeš v potvrdení rezervácie, alebo sa ma jednoducho opýtaj, keď dorazíš.",
    back: "Späť na hlavnú stránku",
  },
  en: {
    docTitle: "Welcome | Tymo's Studio",
    kicker: "Welcome",
    title: "Welcome to Tymo's Studio 🎙️",
    paragraphs: [
      "Glad you're here, thanks for booking in. This space was built to make good music without the stress of a stiff, overly \"professional\" studio vibe, just a proper setup, a good ear, and enough time to actually get the take right.",
      "Get connected to the WiFi below, grab a seat, and get comfortable. Once you're settled, we'll dive in.",
      "A couple small things: keep drinks away from the gear, and if you need anything during the session (water, a break, whatever) just say the word.",
      "Let's make something good today.",
      "Tymo",
    ],
    wifi_label: "WiFi",
    wifi_note: "You'll find the network and password in your booking confirmation, or just ask me when you arrive.",
    back: "Back to homepage",
  },
};

export function Welcome() {
  const { lang } = useT();
  const c = content[lang];

  useEffect(() => {
    document.title = c.docTitle;
  }, [c.docTitle]);

  return (
    <div className="min-h-screen bg-bg text-ink">
      <PageHeader />

      <main className="mx-auto max-w-3xl px-5 pb-24 pt-32 sm:px-8">
        <span className="inline-block rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-soft">
          {c.kicker}
        </span>
        <h1 className="font-display mt-6 text-4xl font-bold tracking-tight text-ink sm:text-5xl">{c.title}</h1>

        <div className="mt-8 space-y-5 text-base leading-relaxed text-ink-dim sm:text-lg">
          {c.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-border bg-surface/60 p-6">
          <div className="flex items-center gap-3">
            <Wifi className="h-5 w-5 text-accent-soft" />
            <h2 className="text-lg font-semibold text-ink">{c.wifi_label}</h2>
          </div>
          <p className="mt-3 text-[14px] leading-relaxed text-ink-dim">{c.wifi_note}</p>
        </div>

        <div className="mt-12">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full border border-border px-4 py-2 text-[13px] font-medium text-ink transition-colors duration-200 hover:border-accent/40 hover:text-accent-soft"
          >
            {c.back}
          </Link>
        </div>
      </main>
    </div>
  );
}
