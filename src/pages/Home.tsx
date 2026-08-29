import { Nav } from "../components/Nav";
import { Hero } from "../components/Hero";
import { StatsBar } from "../components/StatsBar";
import { Reviews } from "../components/Reviews";
import { Gallery } from "../components/Gallery";
import { Problem } from "../components/Problem";
import { About } from "../components/About";
import { Solution } from "../components/Solution";
import { Music } from "../components/Music";
import { Beats } from "../components/Beats";
import { HowItWorks } from "../components/HowItWorks";
import { Pricing } from "../components/Pricing";
import { Faq } from "../components/Faq";
import { Booking } from "../components/Booking";
import { Footer } from "../components/Footer";
import { StickyCta } from "../components/StickyCta";
import { AmbientGlow } from "../components/AmbientGlow";

// Section order follows a single funnel:
// Hero -> Social proof (Stats/Reviews/Gallery) -> Problem -> Solution/Value
// (About + feature grid + Music/Beats as proof) -> How it works -> Pricing
// -> FAQ -> final CTA (Booking).
export function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <div id="hero-sentinel" aria-hidden="true" />
        <div className="relative">
          <AmbientGlow />
          <StatsBar />
          <Reviews />
          <Gallery />
          <Problem />
          <About />
          <Solution />
          <Music />
          <Beats />
          <HowItWorks />
          <Pricing />
          <Faq />
          <Booking />
        </div>
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
