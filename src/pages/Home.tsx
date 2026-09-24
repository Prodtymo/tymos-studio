import { Nav } from "../components/Nav";
import { Hero } from "../components/Hero";
import { StatsBar } from "../components/StatsBar";
import { Reviews } from "../components/Reviews";
import { Gallery } from "../components/Gallery";
import { About } from "../components/About";
import { Music } from "../components/Music";
import { Beats } from "../components/Beats";
import { HowItWorks } from "../components/HowItWorks";
import { Pricing } from "../components/Pricing";
import { Faq } from "../components/Faq";
import { Booking } from "../components/Booking";
import { Footer } from "../components/Footer";
import { StickyCta } from "../components/StickyCta";
import { AmbientGlow } from "../components/AmbientGlow";

export function Home() {
  return (
    <>
      <Nav />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <div id="hero-sentinel" aria-hidden="true" />
        <div className="relative">
          <AmbientGlow />
          <StatsBar />
          <Music />
          <Reviews />
          <About />
          <Gallery />
          <Beats />
          <Pricing />
          <HowItWorks />
          <Faq />
          <Booking />
        </div>
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
