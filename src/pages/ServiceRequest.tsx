import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { useT, type Lang } from "../lib/i18n";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { cn } from "../lib/utils";

type Service = "mixing" | "mastering" | "one-stop";
type Status = "idle" | "submitting" | "success" | "error";

type Content = {
  docTitle: string;
  kicker: string;
  title: string;
  intro: string;
  steps: string[];
  form: {
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    track: string;
    trackPlaceholder: string;
    fileLink: string;
    fileLinkPlaceholder: string;
    notes: string;
    notesPlaceholder: string;
    submit: string;
    submitting: string;
  };
  success: { title: string; body: string };
  error: { body: string; mailtoLabel: string };
  back: string;
};

const CONTENT: Record<Exclude<Service, "one-stop">, Record<Lang, Content>> = {
  mixing: {
    sk: {
      docTitle: "Objednávka mixu | Tymo's Studio",
      kicker: "Mixing na diaľku",
      title: "Objednaj si mix 🎚️",
      intro:
        "Pošli mi svoju nahrávku a poviem ti presne, čo od toho čakať. Vyplň formulár nižšie, ozvem sa ti do 24 hodín.",
      steps: [
        "Vyplníš formulár a pošleš mi odkaz na nahrávku",
        "Ozvem sa s potvrdením a odkazom na 50 % zálohu",
        "Namixujem track a pošlem ti hotovú verziu, 2 kolá revízií máš v cene",
      ],
      form: {
        name: "Meno",
        namePlaceholder: "Tvoje meno",
        email: "E-mail",
        emailPlaceholder: "tvoj@email.com",
        phone: "Telefón (nepovinné)",
        phonePlaceholder: "+421 900 000 000",
        track: "Názov skladby / projektu",
        trackPlaceholder: "napr. Nech To Tak",
        fileLink: "Odkaz na nahrávku (WeTransfer, Google Drive, Dropbox...)",
        fileLinkPlaceholder: "https://...",
        notes: "Poznámky (referenčné tracky, deadline, špeciálne požiadavky)",
        notesPlaceholder: "Čokoľvek, čo by som mal vedieť...",
        submit: "Odoslať žiadosť o mix",
        submitting: "Odosielam...",
      },
      success: {
        title: "Dostal som to! 🎉",
        body: "Ozvem sa ti čo najskôr, zvyčajne do 24 hodín, s potvrdením a informáciami k zálohe.",
      },
      error: {
        body: "Odoslanie sa nepodarilo potvrdiť. Napíš mi e-mail s predvyplnenými údajmi a overíme tvoju požiadavku:",
        mailtoLabel: "Otvoriť e-mail s predvyplnenými údajmi",
      },
      back: "Späť na hlavnú stránku",
    },
    en: {
      docTitle: "Mix Request | Tymo's Studio",
      kicker: "Remote Mixing",
      title: "Request a Mix 🎚️",
      intro:
        "Send me your recording and I'll tell you exactly what to expect. Fill out the form below and I'll get back to you within 24 hours.",
      steps: [
        "Fill out the form and send me a link to your recording",
        "I'll confirm and send you a link for the 50% deposit",
        "I'll mix the track and send you the finished version, 2 rounds of revisions included",
      ],
      form: {
        name: "Name",
        namePlaceholder: "Your name",
        email: "Email",
        emailPlaceholder: "you@email.com",
        phone: "Phone (optional)",
        phonePlaceholder: "+1 555 000 0000",
        track: "Track / project name",
        trackPlaceholder: "e.g. Nech To Tak",
        fileLink: "Link to your recording (WeTransfer, Google Drive, Dropbox...)",
        fileLinkPlaceholder: "https://...",
        notes: "Notes (reference tracks, deadline, special requests)",
        notesPlaceholder: "Anything I should know...",
        submit: "Send mix request",
        submitting: "Sending...",
      },
      success: {
        title: "Got it! 🎉",
        body: "I'll get back to you shortly, usually within 24 hours, with a confirmation and deposit details.",
      },
      error: {
        body: "I couldn’t confirm delivery. Email me with your pre-filled details so we can check your request:",
        mailtoLabel: "Open a pre-filled email",
      },
      back: "Back to homepage",
    },
  },
  mastering: {
    sk: {
      docTitle: "Objednávka masteringu | Tymo's Studio",
      kicker: "Mastering na diaľku",
      title: "Objednaj si mastering 🎛️",
      intro:
        "Pošli mi svoj hotový mix a poviem ti presne, čo od toho čakať. Vyplň formulár nižšie, ozvem sa ti do 24 hodín.",
      steps: [
        "Vyplníš formulár a pošleš mi odkaz na hotový mix",
        "Ozvem sa s potvrdením a odkazom na 50 % zálohu",
        "Zmasterujem track a pošlem ti finálnu verziu, 2 kolá revízií máš v cene",
      ],
      form: {
        name: "Meno",
        namePlaceholder: "Tvoje meno",
        email: "E-mail",
        emailPlaceholder: "tvoj@email.com",
        phone: "Telefón (nepovinné)",
        phonePlaceholder: "+421 900 000 000",
        track: "Názov skladby / projektu",
        trackPlaceholder: "napr. Nech To Tak",
        fileLink: "Odkaz na hotový mix (WeTransfer, Google Drive, Dropbox...)",
        fileLinkPlaceholder: "https://...",
        notes: "Poznámky (referenčné tracky, deadline, špeciálne požiadavky)",
        notesPlaceholder: "Čokoľvek, čo by som mal vedieť...",
        submit: "Odoslať žiadosť o mastering",
        submitting: "Odosielam...",
      },
      success: {
        title: "Dostal som to! 🎉",
        body: "Ozvem sa ti čo najskôr, zvyčajne do 24 hodín, s potvrdením a informáciami k zálohe.",
      },
      error: {
        body: "Odoslanie sa nepodarilo potvrdiť. Napíš mi e-mail s predvyplnenými údajmi a overíme tvoju požiadavku:",
        mailtoLabel: "Otvoriť e-mail s predvyplnenými údajmi",
      },
      back: "Späť na hlavnú stránku",
    },
    en: {
      docTitle: "Mastering Request | Tymo's Studio",
      kicker: "Remote Mastering",
      title: "Request Mastering 🎛️",
      intro:
        "Send me your finished mix and I'll tell you exactly what to expect. Fill out the form below and I'll get back to you within 24 hours.",
      steps: [
        "Fill out the form and send me a link to your finished mix",
        "I'll confirm and send you a link for the 50% deposit",
        "I'll master the track and send you the final version, 2 rounds of revisions included",
      ],
      form: {
        name: "Name",
        namePlaceholder: "Your name",
        email: "Email",
        emailPlaceholder: "you@email.com",
        phone: "Phone (optional)",
        phonePlaceholder: "+1 555 000 0000",
        track: "Track / project name",
        trackPlaceholder: "e.g. Nech To Tak",
        fileLink: "Link to your finished mix (WeTransfer, Google Drive, Dropbox...)",
        fileLinkPlaceholder: "https://...",
        notes: "Notes (reference tracks, deadline, special requests)",
        notesPlaceholder: "Anything I should know...",
        submit: "Send mastering request",
        submitting: "Sending...",
      },
      success: {
        title: "Got it! 🎉",
        body: "I'll get back to you shortly, usually within 24 hours, with a confirmation and deposit details.",
      },
      error: {
        body: "I couldn’t confirm delivery. Email me with your pre-filled details so we can check your request:",
        mailtoLabel: "Open a pre-filled email",
      },
      back: "Back to homepage",
    },
  },
};

const inputClass =
  "w-full rounded-xl border border-border bg-surface-2 px-4 py-2.5 text-base sm:text-[14px] text-ink placeholder:text-ink-faint focus:border-accent/50 focus:outline-none transition-colors duration-200";
const labelClass = "mb-1.5 block text-[13px] font-medium text-ink-dim";

export function ServiceRequest({ service }: { service: Service }) {
  const { lang } = useT();
  const base = CONTENT[service === "one-stop" ? "mixing" : service][lang];
  const c: Content = service !== "one-stop" ? base : {
    ...base,
    kicker: "One-Stop · €199",
    title: lang === "sk" ? "Tvoj track od začiatku do konca." : "Your track, from start to finish.",
    intro: lang === "sk" ? "2 hodiny v štúdiu, mix, mastering a WAV licencia na beat. Napíš mi svoj nápad a kedy by si chcel prísť. Termín si najprv dohodneme spolu." : "Two hours in the studio, mixing, mastering and a WAV beat license. Tell me about your idea and when you’d like to come in. We’ll agree the session together first.",
    steps: lang === "sk" ? ["Pošli požiadavku a navrhni termín", "Dohodneme session a zálohu 99,50 €", "Zvyšných 99,50 € zaplatíš pri dodaní finálnych súborov; 2 kolá revízií sú v cene"] : ["Send a request with your preferred dates", "We agree the session and a €99.50 deposit", "Pay the remaining €99.50 on final file delivery; two revision rounds included"],
    form: { ...base.form, fileLink: lang === "sk" ? "Demo alebo referencia (nepovinné)" : "Demo or reference link (optional)", notes: lang === "sk" ? "Tvoj nápad a preferované termíny" : "Your idea and preferred dates", submit: lang === "sk" ? "Poslať požiadavku na One-Stop" : "Send One-Stop request" },
    success: { title: lang === "sk" ? "Požiadavka je odoslaná." : "Request sent.", body: lang === "sk" ? "Ozvem sa zvyčajne do 24 hodín a dohodneme termín aj zálohu. Toto ešte nie je potvrdená rezervácia." : "I’ll usually reply within 24 hours to agree the session and deposit. This is not yet a confirmed booking." },
  };

  const [status, setStatus] = useState<Status>("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [track, setTrack] = useState("");
  const [fileLink, setFileLink] = useState("");
  const [notes, setNotes] = useState("");
  const [website, setWebsite] = useState(""); // honeypot, left blank by real visitors


  const mailtoFallback = () => {
    const subject = encodeURIComponent(
      `${service === "one-stop" ? "One-Stop" : service === "mixing" ? "Mixing" : "Mastering"} request${track ? ` – ${track}` : ""}`
    );
    const bodyLines = [
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      track ? `Track: ${track}` : null,
      `Files: ${fileLink}`,
      notes ? `Notes: ${notes}` : null,
    ].filter((line): line is string => Boolean(line));
    return `mailto:inquiry@tymostudio.com?subject=${subject}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/request", {
        signal: AbortSignal.timeout(15000),
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ service, name, email, phone, trackTitle: track, fileLink, notes, website }),
      });
      const data = (await res.json().catch(() => null)) as { ok?: boolean } | null;
      if (!res.ok || !data?.ok) throw new Error("request_failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-bg text-ink">
      <Nav />

      <main id="main-content" tabIndex={-1} className="mx-auto max-w-2xl px-5 pb-24 pt-32 sm:px-8">
        <span className="inline-block rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-soft">
          {c.kicker}
        </span>
        <h1 className="font-display mt-6 text-4xl font-bold tracking-tight text-ink sm:text-5xl">{c.title}</h1>
        <p className="mt-5 text-base leading-relaxed text-ink-dim sm:text-lg">{c.intro}</p>
        {service !== "one-stop" && <div className="mt-6 rounded-xl border border-border bg-surface p-5"><p className="text-2xl font-semibold">€99 <span className="text-sm font-normal text-ink-dim">/ {lang === "sk" ? "skladba" : "track"}</span></p><p className="mt-2 text-sm text-ink-dim">{lang === "sk" ? "2 kolá revízií v cene. Formáty finálnych súborov a termín si dohodneme podľa projektu." : "Two revision rounds included. We agree delivery formats and timing for your project."}</p><p className="mt-3 text-sm text-ink-dim">{service === "mixing" ? (lang === "sk" ? "Pošli oddelené zvukové stopy exportované od rovnakého začiatku, rough mix a referencie. Over, že odkaz umožňuje stiahnutie." : "Send separate audio tracks exported from the same start point, a rough mix and references. Check that your link allows downloads.") : (lang === "sk" ? "Pošli hotový mix vo WAV a referenčnú skladbu. Over, že odkaz umožňuje stiahnutie." : "Send your finished mix as a WAV and a reference track. Check that your link allows downloads.")}</p></div>}

        <ol className="mt-6 space-y-2 text-[14px] text-ink-dim">
          {c.steps.map((s, i) => (
            <li key={s} className="flex gap-3">
              <span className="font-mono shrink-0 text-accent-soft">{i + 1}.</span>
              <span>{s}</span>
            </li>
          ))}
        </ol>

        {status === "success" ? (
          <div role="status" tabIndex={-1} ref={(node) => node?.focus()} className="mt-10 flex items-start gap-3 rounded-2xl border border-accent/30 bg-accent/10 p-6">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-soft" />
            <div>
              <h2 className="text-lg font-semibold text-ink">{c.success.title}</h2>
              <p className="mt-2 text-[14px] leading-relaxed text-ink-dim">{c.success.body}</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-10 space-y-5 rounded-2xl border border-border bg-surface/60 p-6">
            <input
              type="text"
              name="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <div>
              <label htmlFor="request-name" className={labelClass}>{c.form.name}</label>
              <input
                type="text"
                required
                id="request-name"
                name="name"
                maxLength={200}
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={c.form.namePlaceholder}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="request-email" className={labelClass}>{c.form.email}</label>
              <input
                type="email"
                required
                id="request-email"
                name="email"
                maxLength={200}
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={c.form.emailPlaceholder}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="request-phone" className={labelClass}>{c.form.phone}</label>
              <input
                type="tel"
                id="request-phone"
                name="phone"
                maxLength={40}
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={c.form.phonePlaceholder}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="request-track" className={labelClass}>{c.form.track}</label>
              <input
                type="text"
                id="request-track"
                name="track"
                maxLength={200}
                autoComplete="off"
                value={track}
                onChange={(e) => setTrack(e.target.value)}
                placeholder={c.form.trackPlaceholder}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="request-fileLink" className={labelClass}>{c.form.fileLink}</label>
              <input
                type="url"
                required={service !== "one-stop"}
                id="request-fileLink"
                name="fileLink"
                maxLength={500}
                autoComplete="url"
                value={fileLink}
                onChange={(e) => setFileLink(e.target.value)}
                placeholder={c.form.fileLinkPlaceholder}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="request-notes" className={labelClass}>{c.form.notes}</label>
              <textarea
                rows={4}
                id="request-notes"
                name="notes"
                maxLength={2000}
                autoComplete="off"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={c.form.notesPlaceholder}
                className={cn(inputClass, "resize-none")}
              />
            </div>

            {status === "error" && (
              <div role="alert" className="flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                <div className="text-[13px] leading-relaxed text-ink-dim">
                  <p>{c.error.body}</p>
                  <a href={mailtoFallback()} className="mt-2 inline-block font-semibold text-accent-soft hover:underline">
                    {c.error.mailtoLabel}
                  </a>
                </div>
              </div>
            )}

            <p className="text-xs leading-relaxed text-ink-dim">
              {lang === "sk" ? "Údaje a odkaz na súbory použijem na vybavenie tvojej požiadavky. Žiadosť mi príde cez Telegram. " : "I use your details and file link to handle your request, which is delivered to me through Telegram. "}
              <Link to="/privacy" className="text-accent-soft underline">{lang === "sk" ? "Ochrana osobných údajov" : "Privacy policy"}</Link>
            </p>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full rounded-full bg-accent-2 px-6 py-3 text-[14px] font-semibold text-white transition-transform duration-200 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === "submitting" ? c.form.submitting : c.form.submit}
            </button>
          </form>
        )}

        <div className="mt-10">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full border border-border px-4 py-2 text-[13px] font-medium text-ink transition-colors duration-200 hover:border-accent/40 hover:text-accent-soft"
          >
            {c.back}
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
