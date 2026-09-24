import { Link } from "react-router-dom";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { useT } from "../lib/i18n";
export function NotFound() {
  const { lang } = useT();
  return <><Nav /><main id="main-content" tabIndex={-1} className="mx-auto max-w-3xl px-5 py-40"><p className="text-accent-soft">404</p><h1 className="mt-4 text-4xl font-bold">{lang === "sk" ? "Tu je zatiaľ ticho." : "Nothing playing here."}</h1><p className="mt-5 text-ink-dim">{lang === "sk" ? "Táto stránka neexistuje. Vráť sa na hlavnú stránku a nájdi svoju session." : "This page doesn’t exist. Head back to the studio to find what you need."}</p><Link to="/" className="mt-8 inline-flex rounded-full bg-accent-2 px-6 py-3 text-white">{lang === "sk" ? "Späť do štúdia" : "Back to the studio"}</Link></main><Footer /></>;
}
