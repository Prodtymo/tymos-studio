import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "sk" | "en";
type Dict = Record<string, string>;

const STORAGE_KEY = "tymo_lang";

export const translations: Record<Lang, Dict> = {
  sk: {
    nav_home: "Domov",
    nav_about: "O štúdiu",
    nav_pricing: "Cenník",
    nav_music: "Hudba",
    nav_booking: "Rezervácia",
    nav_reviews: "Recenzie",
    nav_contact: "Kontakt",
    nav_book: "Rezervovať",

    hero_badge: "Nahrávanie · Mixáž · Mastering",
    hero_title_1_lead: "Tvoj",
    hero_title_1_accent: "zvuk,",
    hero_title_2: "taký, aký má byť.",
    hero_desc: "Nahrávanie, mix a mastering pod jednou strechou, s dôrazom na každý detail, aby tvoj track znel pripravený na rádio aj na playlisty.",
    hero_cta_book: "Rezervovať session",
    hero_cta_pricing: "Pozrieť cenník",
    hero_stat_1_num: "100+",
    hero_stat_1_label: "odohraných session",
    hero_stat_2_num: "5.0",
    hero_stat_2_label: "hodnotenie klientov",
    hero_stat_3_num: "24h",
    hero_stat_3_label: "reakčný čas",

    about_title: "Miestnosť naladená na tvoj zvuk.",
    about_p1: "Tymo's Studio je miesto pre umelcov, ktorým nie je jedno, ako znejú. Každý session má jasný cieľ, od prvého takeu až po finálny master, aby track, ktorý si odnesieš, bol naozaj pripravený ísť von medzi ľudí.",
    about_p2: "Vokály ti idú cez profesionálny analógovo-modelovaný hardware, presne taký, aký používajú špičkové štúdiá po celom svete, takže na konci dostaneš čistý zvuk, pripravený aj pre rádio.",
    about_tag_1: "Universal Audio Apollo",
    about_tag_2: "Analógovo-modelovaný signal chain",
    about_tag_3: "Akusticky ošetrená miestnosť",

    gallery_title: "Vnútri miestnosti.",
    gallery_desc: "Skutočné sessiony, skutoční umelci, skutočný priestor. Bez stock fotiek.",

    music_title: "Hudba nahraná tu.",
    music_desc: "Zopár skladieb nahraných, mixnutých a masterovaných v Tymo's Studio.",
    music_tag_recorded_mixed_mastered: "Nahraté + mixnuté + masterované",
    music_tag_mixed_mastered: "Mixnuté + masterované",

    pricing_kicker: "Cenník",
    pricing_title: "Jednoduché, transparentné balíčky.",
    pricing_desc: "Od jednotlivých session až po celé projekty. Vyber si, čo ti sedí.",
    pricing_popular: "Najpopulárnejšie",
    pricing_book: "Rezervovať",
    pricing_policy_1: "Každá skladba má v cene 2 kolá revízií, ďalšie si vieš kedykoľvek dokúpiť.",
    pricing_policy_2: "EP a Album balíčky vieš rozdeliť na 3 platby: 50 % záloha pri rezervácii, 25 % v polovici projektu a 25 % pri finálnom dodaní. Finálne mastre a stopy dostaneš po poslednej platbe.",

    tier_basic_name: "Basic",
    tier_basic_tag: "Hodinový session",
    tier_basic_f1: "Štúdiový čas",
    tier_basic_f2: "Rough mix (MP3)",

    tier_standard_name: "Standard",
    tier_standard_tag: "2-hodinový session",
    tier_standard_f1: "Nahrávací session",
    tier_standard_f2: "Kompletný mix & master",

    tier_onestop_name: "One-Stop",
    tier_onestop_tag: "Session + Mix/Master + Beat",
    tier_onestop_f1: "Nahrávací session",
    tier_onestop_f2: "Kompletný mix & master",
    tier_onestop_f3: "MP3 licencia na beat v cene",
    tier_onestop_note: "WAV, stopy a exkluzívna licencia dostupné na požiadanie.",

    tier_ep_name: "EP Package",
    tier_ep_tag: "6 skladieb",
    tier_ep_f1: "Nahrávanie, mix & mastering",
    tier_ep_f2: "MP3 licencie v cene",
    tier_note_songs: "Bežne sa za 4-hodinový blok nahrajú 2 až 3 skladby, presné číslo ale negarantujem.",

    tier_album_name: "Album Package",
    tier_album_tag: "10 až 15 skladieb",
    tier_album_f1: "Nahrávanie, mix & mastering",
    tier_album_f2: "MP3 licencie v cene",

    booking_title: "Rezervuj si session",
    booking_desc: "Vyber si čas, ktorý ti vyhovuje. Potvrdenie príde okamžite do e-mailu.",

    reviews_title: "Čo hovoria klienti",
    reviews_cta: "Nechaj nám recenziu na Google",

    beats_title: "Beaty & vydania",
    beats_desc: "Tymo si popri tom robí aj vlastné beaty. Mrkni na najnovšie drops, alebo si zapni notifikácie, keď vyjde nový pack.",
    beats_cta: "Prezrieť beaty na BeatStars",

    faq_kicker: "FAQ",
    faq_title: "Časté otázky",
    faq_desc: "Rýchle odpovede na to, čo sa ma pýtate najčastejšie.",
    faq_q1: "Čo je zahrnuté v kolách revízií?",
    faq_a1: "Každá skladba má v cene 2 kolá revízií. Pošleš mi poznámky (napr. vokál hlasnejšie, viac reverbu, iný vibe), ja to upravím a pošlem novú verziu. Ak treba viac kôl, dá sa to dokúpiť.",
    faq_q2: "Musím si na session niečo priniesť?",
    faq_a2: "Stačíš ty a tvoje texty. Beat môžeš priniesť na USB alebo poslať mailom vopred (ideálne vo WAV alebo 320 MP3). Ak beat nemáš, viem ti ho zohnať. O zvyšok techniky sa postarám ja.",
    faq_q3: "Ako funguje záloha pri EP a Album balíčkoch?",
    faq_a3: "Rozdelíme to na 3 platby: 50 % záloha pri rezervácii, 25 % v polovici projektu a 25 % pri finálnom dodaní. Finálne mastre a stopy odovzdávam po poslednej platbe.",
    faq_q4: "Môžem session preložiť, ak mi niečo vypadne?",
    faq_a4: "Jasné, stačí sa ozvať aspoň 24 hodín dopredu a nájdeme nový termín. Pri zrušení na poslednú chvíľu môže záloha prepadnúť, takže napíš čo najskôr.",
    faq_q5: "Ako rýchlo odpovedáš na otázky k rezervácii?",
    faq_a5: "Zvyčajne do 24 hodín, väčšinou skôr. Ak je to súrne, napíš na Instagram alebo zavolaj.",

    sticky_cta: "Rezervovať session",

    footer_tagline: "Nahrávanie, mix a mastering v Štefanove.",
    footer_contact: "Kontakt",
    footer_follow: "Sledovať",
    footer_rights: "Všetky práva vyhradené.",
    footer_privacy: "Ochrana osobných údajov",
    footer_invoice: "Potrebuješ faktúru pre firmu? Napíš mi a vieme to zariadiť.",
    footer_response: "Zvyčajne odpovedám do 24 hodín",
    footer_directions: "Zobraziť cestu",
  },
  en: {
    nav_home: "Home",
    nav_about: "About",
    nav_pricing: "Pricing",
    nav_music: "Music",
    nav_booking: "Booking",
    nav_reviews: "Reviews",
    nav_contact: "Contact",
    nav_book: "Book",

    hero_badge: "Recording · Mixing · Mastering",
    hero_title_1_lead: "Your",
    hero_title_1_accent: "sound,",
    hero_title_2: "finished properly.",
    hero_desc: "Professional recording, mixing, and mastering, engineered so your track comes out sounding radio-ready.",
    hero_cta_book: "Book a Session",
    hero_cta_pricing: "View Pricing",
    hero_stat_1_num: "100+",
    hero_stat_1_label: "sessions recorded",
    hero_stat_2_num: "5.0",
    hero_stat_2_label: "client rating",
    hero_stat_3_num: "24h",
    hero_stat_3_label: "response time",

    about_title: "A room built around your sound.",
    about_p1: "Tymo's Studio is a focused recording space for artists who care about the details. Every session is engineered with intent, from the first take to the final master, so your record leaves the room ready to compete.",
    about_p2: "Your vocals go through professional-grade analog-modeled hardware (the same tools used in top-tier studios worldwide) for a clean, radio-ready sound.",
    about_tag_1: "Universal Audio Apollo",
    about_tag_2: "Analog-modeled signal chain",
    about_tag_3: "Acoustically treated room",

    gallery_title: "Inside the room.",
    gallery_desc: "Real sessions, real artists, real space. No stock photos.",

    music_title: "Music made here.",
    music_desc: "A few tracks recorded, mixed, and mastered at Tymo's Studio.",
    music_tag_recorded_mixed_mastered: "Recorded + Mixed + Mastered",
    music_tag_mixed_mastered: "Mixed + Mastered",

    pricing_kicker: "Pricing",
    pricing_title: "Simple, transparent packages.",
    pricing_desc: "From single sessions to full projects. Pick what fits your workflow.",
    pricing_popular: "Most Popular",
    pricing_book: "Book",
    pricing_policy_1: "2 rounds of revisions included per song, with the option to purchase additional revisions.",
    pricing_policy_2: "EP and Album packages can be split into 3 payments: 50% deposit to book, 25% at project midpoint, 25% on final delivery. Final masters and stems are released upon final payment.",

    tier_basic_name: "Basic",
    tier_basic_tag: "Hourly Session",
    tier_basic_f1: "Studio time",
    tier_basic_f2: "Raw rough mix (MP3)",

    tier_standard_name: "Standard",
    tier_standard_tag: "2-hour session",
    tier_standard_f1: "Recording session",
    tier_standard_f2: "Full mix & master",

    tier_onestop_name: "One-Stop",
    tier_onestop_tag: "Session + Mix/Master + Beat",
    tier_onestop_f1: "Recording session",
    tier_onestop_f2: "Full mix & master",
    tier_onestop_f3: "MP3 beat license included",
    tier_onestop_note: "WAV, stems, and exclusive license upgrades available on request.",

    tier_ep_name: "EP Package",
    tier_ep_tag: "6 songs",
    tier_ep_f1: "Recording, mixing & mastering",
    tier_ep_f2: "MP3 licenses included",
    tier_note_songs: "Most artists record 2 to 3 songs per 4-hour block (usual, not guaranteed).",

    tier_album_name: "Album Package",
    tier_album_tag: "10 to 15 songs",
    tier_album_f1: "Recording, mixing & mastering",
    tier_album_f2: "MP3 licenses included",

    booking_title: "Book Your Session",
    booking_desc: "Pick a time that works for you. Confirmation lands in your inbox instantly.",

    reviews_title: "What clients say",
    reviews_cta: "Leave us a review on Google",

    beats_title: "Beats & Releases",
    beats_desc: "Tymo also produces original beats. Check the latest drops or get notified when new packs release.",
    beats_cta: "Browse Beats on BeatStars",

    faq_kicker: "FAQ",
    faq_title: "Frequently Asked Questions",
    faq_desc: "Quick answers to the things I get asked most.",
    faq_q1: "What's included in the revision rounds?",
    faq_a1: "Every song comes with 2 rounds of revisions. Send me your notes (vocals louder, more reverb, different vibe) and I'll rework it and send a new version. Need more rounds? You can add them anytime.",
    faq_q2: "Do I need to bring anything to the session?",
    faq_a2: "Just you and your lyrics. Bring your beat on a USB or email it ahead of time (WAV or 320 MP3 is ideal). Need a beat? I've got you. All the gear is here.",
    faq_q3: "How does the deposit work for EP/Album packages?",
    faq_a3: "We split it into 3 payments: 50% deposit to lock your dates, 25% at the project midpoint, and 25% on final delivery. Final masters and stems are released after the last payment.",
    faq_q4: "Can I reschedule if something comes up?",
    faq_a4: "Of course, just give me at least 24 hours' notice and we'll find a new slot. Last-minute cancellations may forfeit the deposit, so reach out as early as you can.",
    faq_q5: "How fast do you usually respond to booking questions?",
    faq_a5: "Usually within 24 hours, often sooner. If it's urgent, DM me on Instagram or give me a call.",

    sticky_cta: "Book a Session",

    footer_tagline: "Recording, mixing, and mastering in Štefanov.",
    footer_contact: "Contact",
    footer_follow: "Follow",
    footer_rights: "All rights reserved.",
    footer_privacy: "Privacy Policy",
    footer_invoice: "Need an invoice for business/expense purposes? Reach out and we'll sort it out.",
    footer_response: "Usually responds within 24 hours",
    footer_directions: "Get Directions",
  },
};

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string };
const LangContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("sk");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (stored === "sk" || stored === "en") setLangState(stored);
    } catch {
      /* noop */
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* noop */
    }
  };

  const t = (k: string) => translations[lang][k] ?? k;

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export function useT() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useT must be used inside LanguageProvider");
  return ctx;
}
