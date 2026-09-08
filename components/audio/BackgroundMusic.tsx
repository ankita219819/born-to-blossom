"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Volume2, VolumeX } from "lucide-react";

const STORAGE_KEY = "btb-music-enabled";
const TARGET_VOLUME = 0.25;
const FADE_MS = 2500;

function readPreference(): boolean | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    if (value === "true") return true;
    if (value === "false") return false;
  } catch {
    // ignore storage errors
  }
  return null;
}

function writePreference(enabled: boolean) {
  try {
    window.localStorage.setItem(STORAGE_KEY, String(enabled));
  } catch {
    // ignore storage errors
  }
}

function clampVolume(value: number) {
  if (Number.isNaN(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

function fadeVolume(audio: HTMLAudioElement, from: number, to: number, durationMs: number) {
  const start = performance.now();
  const startVolume = clampVolume(from);
  const endVolume = clampVolume(to);
  audio.volume = startVolume;

  return new Promise<void>((resolve) => {
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / durationMs);
      audio.volume = clampVolume(startVolume + (endVolume - startVolume) * progress);
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        audio.volume = endVolume;
        resolve();
      }
    };
    requestAnimationFrame(tick);
  });
}

export function BackgroundMusic() {
  const pathname = usePathname();
  const audioRef = useRef<HTMLAudioElement>(null);
  const fadingRef = useRef(false);
  const [enabled, setEnabled] = useState(false);
  const isStudio = Boolean(pathname?.startsWith("/studio"));

  const startWithFade = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || fadingRef.current) return;

    fadingRef.current = true;
    try {
      audio.volume = 0;
      await audio.play();
      await fadeVolume(audio, 0, TARGET_VOLUME, FADE_MS);
      setEnabled(true);
      writePreference(true);
    } catch {
      // Autoplay still blocked — wait for another gesture.
    } finally {
      fadingRef.current = false;
    }
  }, []);

  const stopWithFade = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || fadingRef.current) return;

    fadingRef.current = true;
    try {
      await fadeVolume(audio, audio.volume, 0, 700);
      audio.pause();
      setEnabled(false);
      writePreference(false);
    } finally {
      fadingRef.current = false;
    }
  }, []);

  useEffect(() => {
    if (isStudio) {
      audioRef.current?.pause();
      setEnabled(false);
      return;
    }

    const preference = readPreference();
    if (preference === false) {
      setEnabled(false);
      return;
    }

    const onFirstGesture = () => {
      void startWithFade();
    };

    window.addEventListener("pointerdown", onFirstGesture, { once: true });
    window.addEventListener("keydown", onFirstGesture, { once: true });

    if (preference === true) {
      void startWithFade();
    }

    return () => {
      window.removeEventListener("pointerdown", onFirstGesture);
      window.removeEventListener("keydown", onFirstGesture);
    };
  }, [isStudio, startWithFade]);

  const toggle = () => {
    if (enabled) {
      void stopWithFade();
    } else {
      void startWithFade();
    }
  };

  return (
    <>
      <audio ref={audioRef} loop preload="none" src="/audio/ambient.wav" className="hidden" aria-hidden />
      {!isStudio ? (
        <button
          type="button"
          onClick={toggle}
          aria-label={enabled ? "Mute background music" : "Play background music"}
          aria-pressed={enabled}
          className="fixed bottom-5 right-5 z-[60] grid h-11 w-11 place-items-center rounded-full border border-[#EFE5DA] bg-[#FFFDFC]/92 text-[#365A43] shadow-[0_10px_30px_rgba(30,20,10,0.08)] backdrop-blur-md transition hover:-translate-y-0.5 hover:border-[#E4CFAF] hover:text-[#2D4B37] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#365A43] sm:bottom-6 sm:right-6 sm:h-12 sm:w-12"
        >
          {enabled ? <Volume2 className="h-5 w-5" strokeWidth={1.75} /> : <VolumeX className="h-5 w-5" strokeWidth={1.75} />}
        </button>
      ) : null}
    </>
  );
}
