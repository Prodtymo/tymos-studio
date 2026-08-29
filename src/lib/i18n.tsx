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
    hero_desc: "Nahrávanie, mix a mastering pod jednou strechou — aby tvoj track napokon znel presne tak, ako si ho počul v hlave, pripravený na rádio aj na playlisty.",
    hero_cta_book: "Rezervovať session",
    hero_cta_pricing: "Pozrieť cenník",
    hero_stat_1_num: "100+",
    hero_stat_1_label: "odohraných session",
    hero_stat_2_num: "5.0",
    hero_stat_2_label: "hodnotenie klientov",
    hero_stat_3_num: "24h",
    hero_stat_3_label: "reakčný čas",

    problem_kicker: "Realita",
    problem_title: "Zlý zvuk ťa stojí viac, než len jeden track.",
    problem_desc: "Nahrávaš doma, izba nie je ošetrená a mikrofón zachytáva echo aj hluk z ulice. Skús to opraviť neskôr v pluginoch koľko chceš, vokál stále znie ako nahrávka z izby, nie z rádia.",
    problem_cost1_title: "Stratené prehratia",
    problem_cost1_desc: "Poslucháči preskočia track hneď v prvých pár sekundách, ak im zvuk nesedí.",
    problem_cost2_title: "Chladná spätná väzba",
    problem_cost2_desc: "Namiesto \"toto je ohňostroj\" počuješ len \"fajn, dobrý pokus\".",
    problem_cost3_title: "Stratený čas aj energia",
    problem_cost3_desc: "Ďalšie hodiny v pluginoch neopravia problém, ktorý vznikol už pri nahrávaní.",

    about_title: "Miestnosť naladená na tvoj zvuk.",
    about_p1: "Tymo's Studio je miesto pre umelcov, ktorým nie je jedno, ako znejú. Každá session má jasný cieľ, od prvého takeu až po finálny master, aby track, ktorý si odnesieš, bol naozaj pripravený ísť von medzi ľudí.",
    about_p2: "Vokály ti idú cez profesionálny analógovo-modelovaný hardware, presne taký, aký používajú špičkové štúdiá po celom svete, takže na konci dostaneš čistý zvuk, pripravený aj pre rádio.",
    about_tag_1: "Universal Audio Apollo",
    about_tag_2: "Analógovo-modelovaný signal chain",
    about_tag_3: "Akusticky ošetrená miestnosť",

    solution_kicker: "Riešenie",
    solution_title: "Tu sa to celé zmení.",
    solution_desc: "Profesionálny signal chain, ošetrená miestnosť a skúsenosť s dotiahnutím trackov do finálnej podoby, všetko na jednom mieste.",
    solution_f1_title: "Rýchle dodanie",
    solution_f1_desc: "Hotovú verziu zvyčajne dostaneš do pár dní, nie týždňov, takže neztrácaš tempo.",
    solution_f2_title: "2 kolá revízií v cene",
    solution_f2_desc: "Doladíme to, kým to naozaj neznie ako ty. Ďalšie kolá si vieš kedykoľvek dokúpiť.",
    solution_f3_title: "Flexibilná záloha",
    solution_f3_desc: "50 % pri objednávke, zvyšok až pri odovzdaní. Žiadne veľké riziko vopred.",
    solution_f4_title: "Priamo so mnou",
    solution_f4_desc: "Žiadni asistenti ani odovzdávanie medzi ľuďmi. Od začiatku do konca pracuješ priamo so mnou.",
    solution_f5_title: "Prístup k môjmu katalógu beatov",
    solution_f5_desc: "Nemáš beat? Vyber si rovno z môjho katalógu a preskoč celý krok.",
    solution_f6_title: "Výsledky, ktoré si vypočuješ",
    solution_f6_desc: "Vypočuj si skutočné tracky nahraté, mixnuté a masterované tu, predtým než sa rozhodneš.",

    gallery_title: "Vnútri miestnosti.",
    gallery_desc: "Skutočné sessiony, skutoční umelci, skutočný priestor. Bez stock fotiek.",

    music_title: "Hudba nahraná tu.",
    music_desc: "Zopár skladieb nahraných, mixnutých a masterovaných v Tymo's Studio.",
    music_tag_recorded_mixed_mastered: "Nahraté + mixnuté + masterované",
    music_tag_mixed_mastered: "Mixnuté + masterované",

    pricing_kicker: "Cenník",
    pricing_title: "Jednoduché, transparentné balíčky.",
    pricing_desc: "Od jednotlivých služieb až po celé projekty. Vyber si, čo ti sedí.",
    pricing_section_services: "Vzdialené služby",
    pricing_section_packages: "Štúdiové balíčky",
    pricing_popular: "Najpopulárnejšie",
    pricing_book: "Rezervovať",
    pricing_policy_1: "Každá skladba má v cene 2 kolá revízií, ďalšie si vieš kedykoľvek dokúpiť.",
    pricing_policy_2: "Pri One-Stop balíčku platíš 50 % zálohu pri rezervácii, zvyšok pri finálnom dodaní mixu a masteru.",

    tier_mixing_name: "Mixing",
    tier_mixing_tag: "Mix na diaľku",
    tier_mixing_f1: "Pošleš mi svoju nahrávku",
    tier_mixing_f2: "Kompletný mix",
    tier_mixing_f3: "2 kolá revízií v cene",
    tier_mixing_note: "50 % záloha pri objednávke, zvyšok po odovzdaní.",
    tier_mixing_cta: "Objednať",

    tier_mastering_name: "Mastering",
    tier_mastering_tag: "Mastering na diaľku",
    tier_mastering_f1: "Pošleš mi hotový mix",
    tier_mastering_f2: "Finálny master",
    tier_mastering_f3: "2 kolá revízií v cene",
    tier_mastering_note: "50 % záloha pri objednávke, zvyšok po odovzdaní.",
    tier_mastering_cta: "Objednať",

    tier_basic_name: "Basic",
    tier_basic_tag: "Hodinová session",
    tier_basic_f1: "Štúdiový čas",
    tier_basic_f2: "Rough mix (MP3)",

    tier_onestop_name: "One-Stop",
    tier_onestop_tag: "2-hodinová session + Mix/Master + Beat",
    tier_onestop_f1: "2-hodinová nahrávacia session",
    tier_onestop_f2: "Kompletný mix & master",
    tier_onestop_f3: "Výber beatu z môjho katalógu (MP3 licencia)",
    tier_onestop_note: "WAV, stopy a exkluzívna licencia dostupné na požiadanie.",

    tier_custom_name: "Väčší projekt?",
    tier_custom_tag: "Individuálna ponuka",
    tier_custom_price: "Individuálne",
    tier_custom_f1: "Viac ako 5 skladieb alebo špeciálne požiadavky",
    tier_custom_f2: "Pripravím ti cenu na mieru",
    tier_custom_cta: "Napísať",

    booking_title: "Prestaň čakať. Poď to nahrať poriadne.",
    booking_desc: "Vyber si termín nižšie. Potvrdenie máš okamžite v e-maile, zálohu platíš až pri rezervácii.",

    reviews_title: "Čo hovoria klienti",
    reviews_cta: "Nechaj nám recenziu na Google",

    beats_title: "Beaty & vydania",
    beats_desc: "Tymo si popri tom robí aj vlastné beaty. Mrkni na najnovšie drops, alebo si zapni notifikácie, keď vyjde nový pack.",
    beats_cta: "Prezrieť beaty na BeatStars",

    how_kicker: "Ako to funguje",
    how_title: "Jednoduchý proces, žiadne prekvapenia.",
    how_desc: "Od rezervácie po hotový track, presne vieš, čo ťa čaká v každom kroku.",
    how_step1_title: "Rezervuješ si termín",
    how_step1_desc: "Vyberieš si čas na štúdiovú session v kalendári, alebo pošleš nahrávku na mix/mastering na diaľku. Trvá to 2 minúty.",
    how_step2_title: "Potvrdíme to 50 % zálohou",
    how_step2_desc: "Ozvem sa do 24 hodín s potvrdením. Záloha ti zaistí termín, zvyšok platíš až pri odovzdaní.",
    how_step3_title: "Ideme na to",
    how_step3_desc: "Nahrávame naživo v štúdiu, alebo pracujem na diaľku s priebežnými update-mi. 2 kolá revízií máš v cene.",
    how_step4_title: "Dostaneš hotový track",
    how_step4_desc: "Finálnu verziu dostaneš pripravenú na vydanie, rádio aj playlisty. WAV a stopy na požiadanie.",

    faq_kicker: "FAQ",
    faq_title: "Časté otázky",
    faq_desc: "Rýchle odpovede na to, čo sa ma pýtate najčastejšie.",
    faq_q1: "Čo je zahrnuté v kolách revízií?",
    faq_a1: "Každá skladba má v cene 2 kolá revízií. Pošleš mi poznámky (napr. vokál hlasnejšie, viac reverbu, iný vibe), ja to upravím a pošlem novú verziu. Ak treba viac kôl, dá sa to dokúpiť.",
    faq_q2: "Musím si na session niečo priniesť?",
    faq_a2: "Stačíš ty a tvoje texty. Beat môžeš priniesť na USB alebo poslať mailom vopred (ideálne vo WAV alebo 320 MP3). Ak beat nemáš, viem ti ho zohnať. O zvyšok techniky sa postarám ja.",
    faq_q3: "Ako funguje záloha pri One-Stop balíčku?",
    faq_a3: "Platíš 50 % zálohu pri rezervácii a zvyšok pri finálnom dodaní hotového mixu a masteru.",
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
    hero_desc: "Recording, mixing, and mastering under one roof, so your track finally sounds the way you always heard it in your head, ready for radio and playlists.",
    hero_cta_book: "Book a Session",
    hero_cta_pricing: "View Pricing",
    hero_stat_1_num: "100+",
    hero_stat_1_label: "sessions recorded",
    hero_stat_2_num: "5.0",
    hero_stat_2_label: "client rating",
    hero_stat_3_num: "24h",
    hero_stat_3_label: "response time",

    problem_kicker: "The Reality",
    problem_title: "Bad sound costs you more than just one track.",
    problem_desc: "You record at home, the room isn't treated, and the mic picks up echo and street noise. You can fix it in plugins all you want afterward, the vocal still sounds like it was recorded in a bedroom, not on the radio.",
    problem_cost1_title: "Lost plays",
    problem_cost1_desc: "Listeners skip a track in the first few seconds if the sound feels off.",
    problem_cost2_title: "Lukewarm feedback",
    problem_cost2_desc: "Instead of \"this is fire,\" you hear \"yeah, decent try.\"",
    problem_cost3_title: "Wasted time and energy",
    problem_cost3_desc: "More hours in plugins won't fix a problem that started at the recording stage.",

    about_title: "A room built around your sound.",
    about_p1: "Tymo's Studio is a focused recording space for artists who care about the details. Every session is engineered with intent, from the first take to the final master, so your record leaves the room ready to compete.",
    about_p2: "Your vocals go through professional-grade analog-modeled hardware (the same tools used in top-tier studios worldwide) for a clean, radio-ready sound.",
    about_tag_1: "Universal Audio Apollo",
    about_tag_2: "Analog-modeled signal chain",
    about_tag_3: "Acoustically treated room",

    solution_kicker: "The Solution",
    solution_title: "This is where that changes.",
    solution_desc: "A professional signal chain, a properly treated room, and the experience to take your track all the way to a finished master, all in one place.",
    solution_f1_title: "Fast turnaround",
    solution_f1_desc: "You'll usually have a finished version back within days, not weeks, so you keep your momentum.",
    solution_f2_title: "2 rounds of revisions included",
    solution_f2_desc: "We keep tweaking until it actually sounds like you. Extra rounds are available anytime.",
    solution_f3_title: "Flexible deposit",
    solution_f3_desc: "50% to book, the rest on delivery. No big commitment up front.",
    solution_f4_title: "You work directly with me",
    solution_f4_desc: "No assistants, no hand-offs between people. You work with me directly from start to finish.",
    solution_f5_title: "Access to my beat catalog",
    solution_f5_desc: "No beat yet? Pick one straight from my catalog and skip a whole step.",
    solution_f6_title: "Results you can hear",
    solution_f6_desc: "Listen to real tracks recorded, mixed, and mastered here before you decide.",

    gallery_title: "Inside the room.",
    gallery_desc: "Real sessions, real artists, real space. No stock photos.",

    music_title: "Music made here.",
    music_desc: "A few tracks recorded, mixed, and mastered at Tymo's Studio.",
    music_tag_recorded_mixed_mastered: "Recorded + Mixed + Mastered",
    music_tag_mixed_mastered: "Mixed + Mastered",

    pricing_kicker: "Pricing",
    pricing_title: "Simple, transparent packages.",
    pricing_desc: "From individual services to full projects. Pick what fits your workflow.",
    pricing_section_services: "Remote Services",
    pricing_section_packages: "Studio Packages",
    pricing_popular: "Most Popular",
    pricing_book: "Book",
    pricing_policy_1: "2 rounds of revisions included per song, with the option to purchase additional revisions.",
    pricing_policy_2: "For the One-Stop package: 50% deposit to book, remainder due on final delivery of the mix and master.",

    tier_mixing_name: "Mixing",
    tier_mixing_tag: "Remote mix",
    tier_mixing_f1: "You send me your recording",
    tier_mixing_f2: "Full mix",
    tier_mixing_f3: "2 rounds of revisions included",
    tier_mixing_note: "50% deposit to order, remainder on delivery.",
    tier_mixing_cta: "Get Started",

    tier_mastering_name: "Mastering",
    tier_mastering_tag: "Remote mastering",
    tier_mastering_f1: "You send me your finished mix",
    tier_mastering_f2: "Final master",
    tier_mastering_f3: "2 rounds of revisions included",
    tier_mastering_note: "50% deposit to order, remainder on delivery.",
    tier_mastering_cta: "Get Started",

    tier_basic_name: "Basic",
    tier_basic_tag: "Hourly Session",
    tier_basic_f1: "Studio time",
    tier_basic_f2: "Raw rough mix (MP3)",

    tier_onestop_name: "One-Stop",
    tier_onestop_tag: "2-hour session + Mix/Master + Beat",
    tier_onestop_f1: "2-hour recording session",
    tier_onestop_f2: "Full mix & master",
    tier_onestop_f3: "Choice of a beat from my catalog (MP3 license)",
    tier_onestop_note: "WAV, stems, and exclusive license upgrades available on request.",

    tier_custom_name: "Bigger project?",
    tier_custom_tag: "Custom quote",
    tier_custom_price: "Custom",
    tier_custom_f1: "More than 5 songs or special requirements",
    tier_custom_f2: "I'll put together a price tailored to you",
    tier_custom_cta: "Get in touch",

    booking_title: "Stop waiting. Let's make it sound right.",
    booking_desc: "Pick a time below. Confirmation lands in your inbox instantly, and the deposit is only due once you book.",

    reviews_title: "What clients say",
    reviews_cta: "Leave us a review on Google",

    beats_title: "Beats & Releases",
    beats_desc: "Tymo also produces original beats. Check the latest drops or get notified when new packs release.",
    beats_cta: "Browse Beats on BeatStars",

    how_kicker: "How It Works",
    how_title: "A simple process, no surprises.",
    how_desc: "From booking to finished track, you know exactly what to expect at every step.",
    how_step1_title: "Book your slot",
    how_step1_desc: "Pick a time for a studio session on the calendar, or send your recording for a remote mix/master. Takes 2 minutes.",
    how_step2_title: "We lock it in with a deposit",
    how_step2_desc: "I confirm within 24 hours. A 50% deposit secures your date, with the rest due on delivery.",
    how_step3_title: "We get to work",
    how_step3_desc: "We record live in the studio, or I work remotely with progress updates. 2 rounds of revisions are included.",
    how_step4_title: "You get your finished track",
    how_step4_desc: "Your final version arrives ready for release, radio, and playlists. Stems and WAV available on request.",

    faq_kicker: "FAQ",
    faq_title: "Frequently Asked Questions",
    faq_desc: "Quick answers to the things I get asked most.",
    faq_q1: "What's included in the revision rounds?",
    faq_a1: "Every song comes with 2 rounds of revisions. Send me your notes (vocals louder, more reverb, different vibe) and I'll rework it and send a new version. Need more rounds? You can add them anytime.",
    faq_q2: "Do I need to bring anything to the session?",
    faq_a2: "Just you and your lyrics. Bring your beat on a USB or email it ahead of time (WAV or 320 MP3 is ideal). Need a beat? I've got you. All the gear is here.",
    faq_q3: "How does the deposit work for the One-Stop package?",
    faq_a3: "You pay a 50% deposit to book, with the remainder due when the finished mix and master are delivered.",
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
