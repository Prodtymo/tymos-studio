import { Mail, MapPin, Navigation, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useT } from "../lib/i18n";
import { LogoMark } from "./LogoMark";

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Štefanov 327, 90645, Slovakia");

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="M10.5 9.3v5.4l4.8-2.7-4.8-2.7z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Footer() {
  const { t } = useT();

  return (
    <footer id="contact" className="border-t border-border bg-surface/40">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3 font-display text-[15px] font-semibold tracking-tight text-ink">
              <LogoMark className="h-10 w-10 text-ink" />
              Tymo's <span className="text-accent-soft">Studio</span>
            </div>
            <p className="mt-2 text-[13px] text-ink-faint">{t("footer_tagline")}</p>
            <p className="mt-4 flex items-center gap-2 text-[13px] text-ink-dim">
              <MapPin className="h-3.5 w-3.5 text-accent-soft" />
              Štefanov 327, 90645, Slovakia
            </p>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-[13px] font-medium text-accent-soft transition-opacity duration-200 hover:opacity-80"
            >
              <Navigation className="h-3.5 w-3.5" />
              {t("footer_directions")}
            </a>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-widest text-ink-faint">
              {t("footer_contact")}
            </h4>
            <div className="mt-3 flex flex-col gap-2">
              <a
                href="mailto:info@tymostudio.com"
                className="inline-flex items-center gap-2 text-[13px] text-ink-dim transition-colors duration-200 hover:text-accent-soft"
              >
                <Mail className="h-3.5 w-3.5" />
                info@tymostudio.com
              </a>
              <a
                href="tel:+421948766026"
                className="inline-flex items-center gap-2 text-[13px] font-medium text-ink-dim transition-colors duration-200 hover:text-accent-soft"
              >
                <Phone className="h-3.5 w-3.5" />
                +421 948 766 026
              </a>
              <p className="text-[12px] text-ink-faint">{t("footer_response")}</p>
            </div>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-widest text-ink-faint">
              {t("footer_follow")}
            </h4>
            <div className="mt-3 flex gap-3">
              <a
                href="https://www.instagram.com/prodtymo/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-ink-dim transition-colors duration-200 hover:border-accent/40 hover:text-accent-soft"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href="https://www.youtube.com/@Prod_Tymo"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-ink-dim transition-colors duration-200 hover:border-accent/40 hover:text-accent-soft"
              >
                <YoutubeIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <p className="mt-12 text-center text-[12px] text-ink-faint">{t("footer_invoice")}</p>

        <div className="mt-6 flex flex-col items-center gap-2 border-t border-border pt-6 text-center text-[11px] text-ink-faint">
          <span>
            © {new Date().getFullYear()} Tymo's Studio. {t("footer_rights")}
          </span>
          <Link to="/privacy" className="text-ink-faint transition-colors duration-200 hover:text-accent-soft">
            {t("footer_privacy")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
