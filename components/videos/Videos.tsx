"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Instagram, Play, X, Youtube } from "lucide-react";
import { instagramReels, youtubeVideos } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Container } from "@/components/layout/Container";
import { VideosPetalDecor } from "@/components/decorations/Decorations";

function EmbedModal({
  label,
  onClose,
  panelClassName,
  children
}: {
  label: string;
  onClose: () => void;
  panelClassName?: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={label}>
      <button type="button" className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} aria-label={`Close ${label}`} />
      <div className={cn("relative overflow-hidden rounded-[20px] bg-white shadow-[0_25px_80px_rgba(0,0,0,0.35)]", panelClassName)}>
        <button
          type="button"
          className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-black/55 text-white transition hover:bg-black/75"
          onClick={onClose}
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
        {children}
      </div>
    </div>
  );
}

function VideoCard({
  title,
  duration,
  wide = false,
  thumbnail,
  onPlay
}: {
  title: string;
  duration: string;
  wide?: boolean;
  thumbnail?: string;
  onPlay?: () => void;
}) {
  return (
    <article
      className={cn(
        "group relative shrink-0 overflow-hidden rounded-[20px] shadow-[0_15px_40px_rgba(0,0,0,0.12)]",
        wide ? "w-[85vw] max-w-[310px] md:w-[340px] xl:w-[370px]" : "w-[160px] md:w-[195px] xl:w-[240px]"
      )}
    >
      <Image
        src={thumbnail ?? (wide ? "/images/family-constellation.png" : "/images/blossom-lanterns.png")}
        alt=""
        width={520}
        height={300}
        loading="lazy"
        className={cn("object-cover transition duration-500 group-hover:scale-105", wide ? "aspect-video" : "aspect-[0.78]")}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/68 via-black/10 to-transparent" />
      <button
        type="button"
        className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/88 text-blossom-green shadow-soft transition group-hover:scale-105 md:h-16 md:w-16"
        aria-label={`Play ${title}`}
        onClick={onPlay}
      >
        <Play className="ml-1 h-6 w-6 fill-current md:h-7 md:w-7" />
      </button>
      <h3 className="absolute bottom-3 left-3 max-w-[75%] text-xs font-bold text-white md:bottom-4 md:left-4 md:text-sm">{title}</h3>
      <span className="absolute bottom-3 right-3 rounded-full bg-black/55 px-2 py-1 text-[0.65rem] font-bold text-white md:bottom-4 md:right-4 md:text-xs">
        {duration}
      </span>
    </article>
  );
}

function CarouselNav({
  onPrev,
  onNext
}: {
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="flex gap-2">
      <button
        type="button"
        className="grid h-10 w-10 place-items-center rounded-full border border-blossom-rose/25 transition hover:border-blossom-rose/45"
        onClick={onPrev}
        aria-label="Previous"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        type="button"
        className="grid h-10 w-10 place-items-center rounded-full border border-blossom-rose/25 transition hover:border-blossom-rose/45"
        onClick={onNext}
        aria-label="Next"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

export function Videos() {
  const [youtubeRef, youtubeApi] = useEmblaCarousel({ align: "center", dragFree: true });
  const [reelRef, reelApi] = useEmblaCarousel({ align: "center", dragFree: true });
  const [activeYoutube, setActiveYoutube] = useState<string | null>(null);
  const [activeReel, setActiveReel] = useState<string | null>(null);
  const scrollPrev = useCallback((api: ReturnType<typeof useEmblaCarousel>[1]) => api?.scrollPrev(), []);
  const scrollNext = useCallback((api: ReturnType<typeof useEmblaCarousel>[1]) => api?.scrollNext(), []);

  return (
    <Section id="videos" className="overflow-visible">
      <Container>
        <SectionHeading centered eyebrow="Learn through my content" title="Watch. Learn. Heal." />

        <div className="mx-auto mt-10 w-full max-w-[1180px] md:mt-14">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-sm font-bold">
              <Youtube className="h-5 w-5 text-red-600" /> YouTube Videos
            </div>
            <div className="xl:hidden">
              <CarouselNav onPrev={() => scrollPrev(youtubeApi)} onNext={() => scrollNext(youtubeApi)} />
            </div>
          </div>

          <div ref={youtubeRef} className="mt-4 overflow-hidden md:mt-5 xl:hidden">
            <div className="flex justify-center gap-4 md:gap-5">
              {youtubeVideos.map((video) => (
                <VideoCard
                  key={video.videoId}
                  title={video.title}
                  duration={video.duration}
                  thumbnail={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                  wide
                  onPlay={() => setActiveYoutube(video.videoId)}
                />
              ))}
            </div>
          </div>

          <div className="mt-4 hidden justify-center gap-5 md:mt-5 xl:flex">
            {youtubeVideos.map((video) => (
              <VideoCard
                key={video.videoId}
                title={video.title}
                duration={video.duration}
                thumbnail={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                wide
                onPlay={() => setActiveYoutube(video.videoId)}
              />
            ))}
          </div>
        </div>

        <div className="relative mx-auto mt-8 w-full max-w-[1180px] md:mt-10">
          <VideosPetalDecor />
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3 text-sm font-bold">
              <Instagram className="h-5 w-5 text-blossom-rose" /> Instagram Reels
            </div>
            <div className="xl:hidden">
              <CarouselNav onPrev={() => scrollPrev(reelApi)} onNext={() => scrollNext(reelApi)} />
            </div>
          </div>

          <div ref={reelRef} className="relative z-10 mt-4 overflow-hidden md:mt-5 xl:hidden">
            <div className="flex justify-center gap-4 md:gap-5">
              {instagramReels.map((reel) => (
                <VideoCard key={reel.shortcode} title={reel.title} duration={reel.duration} onPlay={() => setActiveReel(reel.shortcode)} />
              ))}
            </div>
          </div>

          <div className="relative z-10 mt-4 hidden justify-center gap-5 md:mt-5 xl:flex">
            {instagramReels.map((reel) => (
              <VideoCard key={reel.shortcode} title={reel.title} duration={reel.duration} onPlay={() => setActiveReel(reel.shortcode)} />
            ))}
          </div>
        </div>
      </Container>

      {activeYoutube ? (
        <EmbedModal label="YouTube video player" onClose={() => setActiveYoutube(null)} panelClassName="w-full max-w-[960px]">
          <iframe
            src={`https://www.youtube.com/embed/${activeYoutube}`}
            title="YouTube video player"
            className="aspect-video w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </EmbedModal>
      ) : null}

      {activeReel ? (
        <EmbedModal label="Instagram reel player" onClose={() => setActiveReel(null)} panelClassName="w-full max-w-[400px]">
          <iframe
            src={`https://www.instagram.com/reel/${activeReel}/embed`}
            title="Instagram reel"
            className="block h-[min(78vh,720px)] w-full border-0"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
            scrolling="no"
          />
        </EmbedModal>
      ) : null}
    </Section>
  );
}
