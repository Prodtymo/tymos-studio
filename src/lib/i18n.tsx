import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "sk" | "en";
type Dict = Record<string, string>;

const STORAGE_KEY = "tymo_lang";

export const translations: Record<Lang, Dict> = {
  sk: {
    nav_home: "Štúdio",
    nav_about: "O štúdiu",
    nav_pricing: "Cenník",
    nav_music: "Hudba",
    nav_booking: "Rezervácia",
    nav_reviews: "Recenzie",
    nav_contact: "Kontakt",
    nav_book: "Rezervovať",

    hero_location: "Štefanov, Slovensko · Mix a mastering na diaľku",
    hero_cta_listen: "Vypočuť moju prácu",
    hero_badge: "Nahrávanie · Mixáž · Mastering",
    hero_title_1_lead: "Tvoj",
    hero_title_1_accent: "zvuk,",
    hero_title_2: "taký, aký má byť.",
    hero_desc: "Nahraj vokály v Štefanove alebo mi pošli svoj track na mix a mastering. Od prvého takeu po finálny zvuk pracuješ priamo so mnou.",
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

    about_title: "Tvoj track. Spolu pri jednom stole.",
    about_p1: "Som Tymo. V tomto štúdiu nahrávam vokály, tvorím beaty a pracujem na mixe a masteringu. Spolu prejdeme tvoje referencie a doladíme zvuk tak, aby sedel tvojej skladbe.",
    about_p2: "Nahrávaš cez Neumann TLM 102 a Universal Audio Apollo v akusticky ošetrenej miestnosti. Máš vlastný beat? Prines ho. Ak nie, môžeš si vybrať z môjho katalógu.",
    about_tag_1: "Universal Audio Apollo",
    about_tag_2: "Analógovo-modelovaný signal chain",
    about_tag_3: "Akusticky ošetrená miestnosť",
    about_gear_link: "Pozrieť celé vybavenie štúdia →",

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
    gallery_desc: "Pozri si priestor, techniku a momenty zo session.",

    music_title: "Hudba nahraná tu.",
    music_desc: "Zopár skladieb nahraných, mixnutých a masterovaných v Tymo's Studio.",
    music_tag_recorded_mixed_mastered: "Nahraté + mixnuté + masterované",
    music_tag_mixed_mastered: "Mixnuté + masterované",

    pricing_kicker: "Cenník",
    pricing_title: "Jednoduché, transparentné balíčky.",
    pricing_desc: "Od jednotlivých služieb až po celé projekty. Vyber si, čo ti sedí.",
    pricing_section_services: "Vzdialené služby",
    pricing_section_packages: "Štúdiové balíčky",
    pricing_popular: "Najvýhodnejšie",
    pricing_book: "Rezervovať",
    pricing_policy_1: "Každá skladba má v cene 2 kolá revízií, ďalšie si vieš kedykoľvek dokúpiť.",
    pricing_policy_2: "One-Stop: 99,50 € záloha po dohode o termíne, 99,50 € pri dodaní finálnych súborov.",

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

    tier_basic_f3: "Logic projekt a suché stopy na požiadanie",
    tier_basic_note: "Platba po session.",
    onestop_request: "Dohodnúť One-Stop",
    tier_basic_name: "Štúdiový čas",
    tier_basic_tag: "Hodinová session",
    tier_basic_f1: "Štúdiový čas",
    tier_basic_f2: "Rough mix (MP3)",

    tier_onestop_name: "One-Stop",
    tier_onestop_tag: "2-hodinová session + Mix/Master + Beat",
    onestop_item_session: "2-hodinová session",
    onestop_item_mix: "Mix",
    onestop_item_master: "Master",
    onestop_item_beat: "WAV licencia na beat",
    onestop_value_label: "Celková hodnota",
    onestop_savings_label: "Ušetríš",
    onestop_price_label: "Tvoja cena",
    tier_onestop_note: "Stopy a exkluzívna licencia dostupné na požiadanie.",

    tier_custom_name: "Väčší projekt?",
    tier_custom_tag: "Individuálna ponuka",
    tier_custom_price: "Individuálne",
    tier_custom_f1: "Väčšie projekty alebo špeciálne požiadavky",
    tier_custom_cta: "Napísať",

    booking_title: "Nájdi si čas na svoj track.",
    booking_desc: "Rezervuj si hodinovú session za 20 €/h. Platíš po session. Odnesieš si MP3 s rough mixom.",

    reviews_title: "Čo hovoria klienti",
    reviews_cta: "Nechaj nám recenziu na Google",

    beats_title: "Beaty & vydania",
    beats_desc: "Hľadáš beat pre ďalší track? Vypočuj si môj katalóg a vyber si svoj smer.",
    beats_cta: "Prezrieť beaty na BeatStars",

    how_kicker: "Ako to funguje",
    how_title: "Jednoduchý proces, žiadne prekvapenia.",
    how_desc: "Od rezervácie po hotový track, presne vieš, čo ťa čaká v každom kroku.",
    how_step1_title: "Vyber si službu",
    how_step1_desc: "Hodinovú session si vyberieš v kalendári. Pri One-Stop, mixe alebo masteringu pošli požiadavku cez formulár.",
    how_step2_title: "Dohodneme detaily",
    how_step2_desc: "Na požiadavky zvyčajne odpoviem do 24 hodín. Dohodneme rozsah, termín a odovzdanie súborov. Hodinovú session platíš po nahrávaní.",
    how_step3_title: "Ideme na to",
    how_step3_desc: "Nahrávame v štúdiu alebo pracujem s tvojimi súbormi na diaľku. Mix a mastering zahŕňajú 2 kolá revízií.",
    how_step4_title: "Dostaneš hotový track",
    how_step4_desc: "Po hodinovej session dostaneš MP3 s rough mixom. Logic projekt a suché stopy sú na požiadanie. Pri mixe a masteringu dohodneme formáty a termín podľa projektu.",

    faq_kicker: "FAQ",
    faq_title: "Časté otázky",
    faq_desc: "Rýchle odpovede na to, čo sa ma pýtate najčastejšie.",
    faq_q1: "Čo je zahrnuté v kolách revízií?",
    faq_a1: "Každá skladba má v cene 2 kolá revízií. Pošleš mi poznámky (napr. vokál hlasnejšie, viac reverbu, iný vibe), ja to upravím a pošlem novú verziu. Ak treba viac kôl, dá sa to dokúpiť.",
    faq_q2: "Musím si na session niečo priniesť?",
    faq_a2: "Stačíš ty a tvoje texty. Beat môžeš priniesť na USB alebo poslať mailom vopred (ideálne vo WAV alebo 320 MP3). Ak beat nemáš, viem ti ho zohnať. O zvyšok techniky sa postarám ja.",
    faq_q3: "Ako funguje záloha pri One-Stop balíčku?",
    faq_a3: "Najprv si dohodneme session. Potom zaplatíš zálohu 99,50 € (50 % z ceny 199 €), zvyšných 99,50 € pri dodaní finálnych súborov. Odoslanie požiadavky samo o sebe nepotvrdzuje termín.",
    faq_q4: "Môžem session preložiť, ak mi niečo vypadne?",
    faq_a4: "Jasné, stačí sa ozvať aspoň 24 hodín dopredu a nájdeme nový termín. Pri zrušení na poslednú chvíľu môže záloha prepadnúť, takže napíš čo najskôr.",
    faq_q6: "Môžem dostať faktúru alebo zaplatiť prevodom?",
    faq_a6: "Potrebuješ faktúru alebo chceš zaplatiť bankovým prevodom? Daj mi vedieť pred session, aby sme to mohli dohodnúť.",
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
    footer_gear: "Vybavenie",

    gear_kicker: "Vybavenie",
    gear_title: "Čím sa tu nahráva, mixuje a masteruje.",
    gear_desc: "Kompletný prehľad techniky, ktorá je pripravená na tvoju session, od mikrofónov až po finálne spracovanie zvuku.",
    gear_book_cta: "Rezervovať session",

    gear_cat_mics: "Mikrofóny",
    gear_item_tlm102_name: "Neumann TLM 102",
    gear_item_tlm102_desc: "Náš hlavný vokálny mikrofón, s originálnym Neumann PS 20 pop filtrom.",
    gear_item_sm57_name: "Shure SM57",
    gear_item_sm57_desc: "Legendárny dynamický mikrofón, ktorý používajú štúdiá po celom svete na gitary aj bicie.",
    gear_item_nt1_name: "Rode NT1",
    gear_item_nt1_desc: "Všestranný kondenzátorový mikrofón ako druhá voľba pre vokál.",
    gear_mics_note: "Plus rotácia ďalších dynamických a kondenzátorových mikrofónov pre špecifické zdroje zvuku.",

    gear_cat_interface: "Interface a monitoring",
    gear_item_apollo_name: "Universal Audio Apollo Solo",
    gear_item_apollo_desc: "Profesionálne audio rozhranie s analógovo-modelovaným zvukom priamo pri nahrávaní.",
    gear_item_hs7_name: "Yamaha HS7",
    gear_item_hs7_desc: "Referenčné štúdiové monitory pre presný, neskreslený mix.",
    gear_item_m50x_name: "Audio-Technica ATH-M50x",
    gear_item_m50x_desc: "Industry-standard slúchadlá pre presné monitorovanie, s možnosťou pripojiť viac ľudí naraz.",

    gear_cat_instruments: "Nástroje a perkusie",
    gear_item_synth_name: "Roland Alpha Juno 1",
    gear_item_synth_desc: "Skutočný vintage analógový syntetizátor pre charakteristické zvuky, ktoré nezískaš zo žiadneho samplu.",
    gear_item_acoustic_name: "Akustické nástroje",
    gear_item_acoustic_desc: "Akustická basgitara a klasická gitara s nylonovými strunami, priamo v štúdiu.",
    gear_item_percussion_name: "Perkusie",
    gear_item_percussion_desc: "Cajony, bongá, egg shaker a claves pre živé rytmy bez potreby siahnuť po samplovi.",

    gear_cat_software: "Softvér a spracovanie",
    gear_item_daws_name: "DAW podľa dohody",
    gear_item_daws_desc: "Pracujem v Logic Pro, FL Studio, alebo na požiadanie v Ableton.",
    gear_item_autotune_name: "Antares Auto-Tune (UAD)",
    gear_item_autotune_desc: "Profesionálny Auto-Tune priamo cez UAD Apollo, pre čistú pitch korekciu aj výrazný auto-tune efekt.",
    gear_item_analog_name: "Analógová kolekcia Universal Audio",
    gear_item_analog_desc: "Neve, SSL, API, 1176 a Distressor plus FabFilter pre finálny zvuk tvojho tracku.",
  },
  en: {
    nav_home: "Studio",
    nav_about: "About",
    nav_pricing: "Pricing",
    nav_music: "Music",
    nav_booking: "Booking",
    nav_reviews: "Reviews",
    nav_contact: "Contact",
    nav_book: "Book",

    hero_location: "Štefanov, Slovakia · Remote mixing & mastering",
    hero_cta_listen: "Hear my work",
    hero_badge: "Recording · Mixing · Mastering",
    hero_title_1_lead: "Your",
    hero_title_1_accent: "sound,",
    hero_title_2: "finished properly.",
    hero_desc: "Record your vocals in Štefanov, or send me your track for mixing and mastering. From the first take to the final sound, you work directly with me.",
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

    about_title: "Your track. One-to-one.",
    about_p1: "I’m Tymo. This is where I record vocals, make beats, and work on mixes and masters. We’ll go through your references together and shape a sound that fits your track.",
    about_p2: "Record through a Neumann TLM 102 and Universal Audio Apollo in an acoustically treated room. Bring your own beat, or choose one from my catalog.",
    about_tag_1: "Universal Audio Apollo",
    about_tag_2: "Analog-modeled signal chain",
    about_tag_3: "Acoustically treated room",
    about_gear_link: "View the full studio gear list →",

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
    gallery_desc: "The room, the equipment, and moments from sessions.",

    music_title: "Music made here.",
    music_desc: "A few tracks recorded, mixed, and mastered at Tymo's Studio.",
    music_tag_recorded_mixed_mastered: "Recorded + Mixed + Mastered",
    music_tag_mixed_mastered: "Mixed + Mastered",

    pricing_kicker: "Pricing",
    pricing_title: "Simple, transparent packages.",
    pricing_desc: "From individual services to full projects. Pick what fits your workflow.",
    pricing_section_services: "Remote Services",
    pricing_section_packages: "Studio Packages",
    pricing_popular: "Biggest Value",
    pricing_book: "Book",
    pricing_policy_1: "2 rounds of revisions included per song, with the option to purchase additional revisions.",
    pricing_policy_2: "One-Stop: €99.50 deposit after agreeing your session, then €99.50 on delivery of the final files.",

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

    tier_basic_f3: "Logic project and dry stems on request",
    tier_basic_note: "Pay after your session.",
    onestop_request: "Request One-Stop",
    tier_basic_name: "Studio Time",
    tier_basic_tag: "Hourly Session",
    tier_basic_f1: "Studio time",
    tier_basic_f2: "Raw rough mix (MP3)",

    tier_onestop_name: "One-Stop",
    tier_onestop_tag: "2-hour session + Mix/Master + Beat",
    onestop_item_session: "2-hour session",
    onestop_item_mix: "Mix",
    onestop_item_master: "Master",
    onestop_item_beat: "WAV beat license",
    onestop_value_label: "Total value",
    onestop_savings_label: "You save",
    onestop_price_label: "Your price",
    tier_onestop_note: "Stems and exclusive license upgrades available on request.",

    tier_custom_name: "Bigger project?",
    tier_custom_tag: "Custom quote",
    tier_custom_price: "Custom",
    tier_custom_f1: "Bigger projects or special requirements",
    tier_custom_cta: "Get in touch",

    booking_title: "Make time for your next track.",
    booking_desc: "Book studio time at €20/hour. Pay after your session and leave with a rough-mix MP3.",

    reviews_title: "What clients say",
    reviews_cta: "Leave us a review on Google",

    beats_title: "Beats & Releases",
    beats_desc: "Need a beat for your next track? Explore my catalog and find your direction.",
    beats_cta: "Browse Beats on BeatStars",

    how_kicker: "How It Works",
    how_title: "A simple process, no surprises.",
    how_desc: "From booking to finished track, you know exactly what to expect at every step.",
    how_step1_title: "Choose your service",
    how_step1_desc: "Choose hourly studio time in the calendar. For One-Stop, mixing or mastering, send a request through the form.",
    how_step2_title: "Agree the details",
    how_step2_desc: "I usually reply to requests within 24 hours. We’ll agree the scope, timing and delivery files. Hourly sessions are paid after recording.",
    how_step3_title: "We get to work",
    how_step3_desc: "We record in the studio, or I work with your files remotely. Mixing and mastering include two revision rounds.",
    how_step4_title: "You get your finished track",
    how_step4_desc: "After an hourly session, you get a rough-mix MP3. The Logic project and dry stems are available on request. For mixing and mastering, we agree formats and timing for your project.",

    faq_kicker: "FAQ",
    faq_title: "Frequently Asked Questions",
    faq_desc: "Quick answers to the things I get asked most.",
    faq_q1: "What's included in the revision rounds?",
    faq_a1: "Every song comes with 2 rounds of revisions. Send me your notes (vocals louder, more reverb, different vibe) and I'll rework it and send a new version. Need more rounds? You can add them anytime.",
    faq_q2: "Do I need to bring anything to the session?",
    faq_a2: "Just you and your lyrics. Bring your beat on a USB or email it ahead of time (WAV or 320 MP3 is ideal). Need a beat? I've got you. All the gear is here.",
    faq_q3: "How does the deposit work for the One-Stop package?",
    faq_a3: "First we agree your session. Then you pay a €99.50 deposit (50% of €199), with the remaining €99.50 due on delivery of the final files. Sending a request does not itself confirm a slot.",
    faq_q4: "Can I reschedule if something comes up?",
    faq_a4: "Of course, just give me at least 24 hours' notice and we'll find a new slot. Last-minute cancellations may forfeit the deposit, so reach out as early as you can.",
    faq_q6: "Can I get an invoice or pay by bank transfer?",
    faq_a6: "Need an invoice or prefer a bank transfer? Let me know before your session so we can arrange it.",
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
    footer_gear: "Gear",

    gear_kicker: "Gear",
    gear_title: "What we record, mix, and master with.",
    gear_desc: "A full rundown of the gear that's ready and waiting for your session, from microphones to final processing.",
    gear_book_cta: "Book a Session",

    gear_cat_mics: "Microphones",
    gear_item_tlm102_name: "Neumann TLM 102",
    gear_item_tlm102_desc: "Our main vocal mic, paired with the original Neumann PS 20 pop filter.",
    gear_item_sm57_name: "Shure SM57",
    gear_item_sm57_desc: "The industry-standard dynamic mic, used everywhere for guitar amps and drums.",
    gear_item_nt1_name: "Rode NT1",
    gear_item_nt1_desc: "A versatile condenser mic as a secondary vocal option.",
    gear_mics_note: "Plus a rotation of additional dynamic and condenser mics for specific sources.",

    gear_cat_interface: "Interface & Monitoring",
    gear_item_apollo_name: "Universal Audio Apollo Solo",
    gear_item_apollo_desc: "Professional audio interface with analog-modeled sound while tracking.",
    gear_item_hs7_name: "Yamaha HS7",
    gear_item_hs7_desc: "Reference studio monitors for an accurate, uncolored mix.",
    gear_item_m50x_name: "Audio-Technica ATH-M50x",
    gear_item_m50x_desc: "Industry-standard headphones for accurate monitoring, with multi-person monitoring for group sessions.",

    gear_cat_instruments: "Instruments & Percussion",
    gear_item_synth_name: "Roland Alpha Juno 1",
    gear_item_synth_desc: "A real vintage analog synth for character you won't get from any sample pack.",
    gear_item_acoustic_name: "Acoustic Instruments",
    gear_item_acoustic_desc: "Acoustic bass and a nylon-string classical guitar, right here in the studio.",
    gear_item_percussion_name: "Percussion",
    gear_item_percussion_desc: "Cajons, bongos, egg shaker, and claves for real percussion without reaching for a sample.",

    gear_cat_software: "Software & Processing",
    gear_item_daws_name: "DAW of Your Choice",
    gear_item_daws_desc: "I work in Logic Pro, FL Studio, or Ableton on request.",
    gear_item_autotune_name: "Antares Auto-Tune (UAD)",
    gear_item_autotune_desc: "Professional Auto-Tune running through the UAD Apollo, for clean pitch correction or that unmistakable auto-tune effect.",
    gear_item_analog_name: "Universal Audio's Analog Collection",
    gear_item_analog_desc: "Neve, SSL, API, 1176, and Distressor, plus FabFilter for the final polish on your track.",
  },
};

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string };
const LangContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try { return localStorage.getItem(STORAGE_KEY) === "en" ? "en" : "sk"; }
    catch { return "sk"; }
  });

  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

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
