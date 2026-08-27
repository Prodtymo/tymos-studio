import { Nav } from "../components/Nav";
import { Hero } from "../components/Hero";
import { StatsBar } from "../components/StatsBar";
import { About } from "../components/About";
import { Gallery } from "../components/Gallery";
import { Music } from "../components/Music";
import { Pricing } from "../components/Pricing";
import { Faq } from "../components/Faq";
import { Booking } from "../components/Booking";
import { Reviews } from "../components/Reviews";
import { Beats } from "../components/Beats";
import { Footer } from "../components/Footer";
import { StickyCta } from "../components/StickyCta";
import { AmbientGlow } from "../components/AmbientGlow";

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
          <About />
          <Gallery />
          <Music />
          <Pricing />
          <Faq />
          <Booking />
          <Reviews />
          <Beats />
        </div>
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
