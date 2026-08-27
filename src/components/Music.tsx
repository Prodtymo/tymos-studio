import { Reveal } from "./Reveal";
import { useT } from "../lib/i18n";

type Track = {
  title: string;
  artists: string;
  tagKey: "music_tag_recorded_mixed_mastered" | "music_tag_mixed_mastered";
  cover: string;
  link: string;
};

const TRACKS: Track[] = [
  { title: "REDFLAG", artists: "DEST1NY", tagKey: "music_tag_recorded_mixed_mastered", cover: "https://i.scdn.co/image/ab67616d0000b2731157d95aac07d6e42d644a43", link: "https://open.spotify.com/track/6FdBU9BAgvxF6s6MmNa8GT" },
  { title: "Skiaphos", artists: "Maty Drion, Klara", tagKey: "music_tag_recorded_mixed_mastered", cover: "https://i.scdn.co/image/ab67616d0000b2734dbf3fa7660fcbd40f812934", link: "https://open.spotify.com/track/3VK2k9v1HL7ANRoTeU0q90" },
  { title: "Valletta", artists: "Maty Drion", tagKey: "music_tag_recorded_mixed_mastered", cover: "https://i.scdn.co/image/ab67616d0000b2734dbf3fa7660fcbd40f812934", link: "https://open.spotify.com/track/1xAAIHUNnC9cVWfBLdnKKM" },
  { title: "Spinnin", artists: "Maty Drion, RAF ZODIAC, Marzoo", tagKey: "music_tag_mixed_mastered", cover: "https://i.scdn.co/image/ab67616d0000b2734dbf3fa7660fcbd40f812934", link: "https://open.spotify.com/track/2TasCmuuLDggc0QzEw69Ne" },
  { title: "Som Fajn", artists: "Maty Drion", tagKey: "music_tag_mixed_mastered", cover: "https://i.scdn.co/image/ab67616d0000b2732331f0f34a2ddf09fddaa0fd", link: "https://open.spotify.com/track/03foIU4rnlp9mQdBCTb3sK" },
  { title: "Som Fajn RMX", artists: "Maty Drion, dayindegenerate", tagKey: "music_tag_mixed_mastered", cover: "https://i.scdn.co/image/ab67616d0000b27345fbbe41678b1b016e67dc63", link: "https://open.spotify.com/track/0N6Rb1NXENsLCAml3k5ZeN" },
  { title: "LAVIDA", artists: "Maty Drion", tagKey: "music_tag_mixed_mastered", cover: "https://i.scdn.co/image/ab67616d0000b27383ebcb660949f86158dad9f6", link: "https://open.spotify.com/track/0iMr506UWnARkTtln1g2Rq" },
  { title: "Vienna", artists: "Maty Drion", tagKey: "music_tag_mixed_mastered", cover: "https://i.scdn.co/image/ab67616d0000b2738bf0ebdda8f59d54cb25b822", link: "https://open.spotify.com/track/5862aLbteM9btpkt9XbP1D" },
];

// Duplicated once so the CSS marquee (translateX 0 -> -50%) loops seamlessly.
const LOOPED_TRACKS = [...TRACKS, ...TRACKS];

function SpotifyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.512 17.34a.748.748 0 01-1.03.25c-2.82-1.723-6.37-2.113-10.552-1.157a.75.75 0 11-.334-1.462c4.55-1.04 8.474-.596 11.617 1.34.353.216.464.68.299 1.029zm1.47-3.267a.936.936 0 01-1.287.307c-3.23-1.984-8.155-2.56-11.977-1.4a.937.937 0 11-.545-1.792c4.36-1.324 9.78-.68 13.5 1.598.44.27.58.845.309 1.287zm.127-3.403C15.24 8.522 8.9 8.31 5.398 9.374a1.124 1.124 0 11-.652-2.152c4.02-1.219 11.02-.983 15.36 1.6a1.124 1.124 0 11-1.157 1.928z" />
    </svg>
  );
}

function TrackCard({ tr }: { tr: Track }) {
  const { t } = useT();
  return (
    <div className="group flex w-[62vw] shrink-0 flex-col overflow-hidden rounded-2xl border border-border bg-surface p-3.5 transition-colors duration-200 hover:border-border-strong sm:w-[34vw] md:w-[23vw] lg:w-[16vw]">
      <div className="relative aspect-square overflow-hidden rounded-xl">
        <img
          src={tr.cover}
          alt={`Cover art for "${tr.title}" by ${tr.artists}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="mt-4 flex flex-1 flex-col">
        <h3 className="text-[15px] font-semibold leading-tight text-ink">{tr.title}</h3>
        <p className="mt-1 text-[13px] text-ink-faint">{tr.artists}</p>
        <span className="font-mono mt-3 inline-flex w-fit items-center rounded-full border border-accent/25 bg-accent/10 px-2.5 py-1 text-[12px] font-medium text-accent-soft">
          {t(tr.tagKey)}
        </span>
        <a
          href={tr.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${tr.title} on Spotify`}
          className="mt-4 inline-flex h-9 w-9 items-center justify-center self-start rounded-full border border-border text-ink-dim transition-colors duration-200 hover:border-accent/40 hover:bg-accent/10 hover:text-accent-soft"
        >
          <SpotifyIcon className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}

export function Music() {
  const { t } = useT();

  return (
    <section id="music" className="border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-xl text-center">
          <h2 className="font-display text-balance text-3xl font-bold tracking-tight text-ink sm:text-[2.75rem]">
            {t("music_title")}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-dim">{t("music_desc")}</p>
        </Reveal>
      </div>

      <Reveal delay={0.08} className="group/marquee relative mt-12 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-bg to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-bg to-transparent sm:w-24" />

        <div className="flex w-max animate-marquee gap-5 group-hover/marquee:[animation-play-state:paused] group-focus-within/marquee:[animation-play-state:paused] motion-reduce:animate-none">
          {LOOPED_TRACKS.map((tr, i) => (
            <TrackCard key={`${tr.title}-${i}`} tr={tr} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
