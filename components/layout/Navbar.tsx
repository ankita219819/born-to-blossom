"use client";

import { useState } from "react";
import { Leaf, Menu } from "lucide-react";
import { navItems } from "@/lib/content";
import { SacredMark } from "@/components/ui/SacredMark";
import { Container } from "@/components/layout/Container";

function BrandLockup({ className }: { className?: string }) {
  return (
    <a href="#home" className={className} aria-label="Born To Blossom home">
      <SacredMark className="w-9 shrink-0 md:w-11" />
      <span>
        <span className="block font-display text-xl leading-none md:text-2xl">Born To Blossom</span>
        <span className="block text-[0.6rem] font-semibold tracking-[0.16em] text-blossom-ink/55 md:text-[0.65rem]">
          Heal. Grow. Awaken.
        </span>
      </span>
    </a>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-50 bg-[#FCF8F3] px-4 py-4 md:fixed md:inset-x-0 md:top-0 md:bg-transparent">
      {/* Mobile — flat header, scrolls with page */}
      <nav className="flex items-center justify-between md:hidden" aria-label="Primary">
        <BrandLockup className="flex items-center gap-3" />
        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-[14px] border border-[#EFE5DA] bg-white shadow-[0_4px_14px_rgba(30,20,10,0.08)]"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <Menu className="h-5 w-5 text-[#2E2925]" />
        </button>
      </nav>

      {/* Tablet & desktop — fixed glass pill */}
      <nav
        className="container-xl glass relative hidden h-[4.25rem] items-center justify-between overflow-visible rounded-full px-4 md:flex md:h-20 md:px-7"
        aria-label="Primary"
      >
        <BrandLockup className="relative z-10 flex items-center gap-3" />

        <div className="relative z-10 hidden items-center gap-6 xl:flex xl:gap-8">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
              className="text-[0.875rem] font-medium tracking-[0.01em] text-[#5E534A] transition hover:text-[#365A43] xl:text-[0.9375rem]"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="relative z-10 hidden md:block xl:flex">
          <a
            href="#book-session"
            className="button-ripple inline-flex h-[48px] items-center gap-2 rounded-full bg-[#365A43] px-5 text-[0.875rem] font-semibold text-white shadow-[0_8px_20px_rgba(54,90,67,0.20)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2D4B37] md:h-[52px] md:px-7 md:text-[0.9375rem]"
          >
            Book Your Session <Leaf className="h-4 w-4" />
          </a>
        </div>

        <button
          type="button"
          className="relative z-10 grid h-11 w-11 place-items-center rounded-full border border-blossom-rose/25 xl:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <Menu className="h-5 w-5" />
        </button>
      </nav>

      {open ? (
        <Container className="glass mt-3 grid rounded-[28px] p-5 xl:hidden">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
              onClick={() => setOpen(false)}
              className="rounded-2xl px-4 py-3 text-sm font-semibold hover:bg-white/60"
            >
              {item}
            </a>
          ))}
          <a
            href="#book-session"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#365A43] px-6 text-sm font-semibold text-white md:hidden"
          >
            Book Your Session <Leaf className="h-4 w-4" />
          </a>
        </Container>
      ) : null}
    </header>
  );
}
