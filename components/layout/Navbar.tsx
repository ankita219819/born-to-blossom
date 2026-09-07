"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Leaf, Menu } from "lucide-react";
import { navItems } from "@/lib/content";
import { BrandLogo } from "@/components/ui/SacredMark";
import { Container } from "@/components/layout/Container";

function navHref(item: string) {
  switch (item) {
    case "Home":
      return "/#home";
    case "About":
      return "/about";
    case "Services":
      return "/services";
    case "Assessment":
      return "/soul-assessment";
    case "Corporate":
      return "/corporate";
    case "Workshops":
      return "/workshops";
    case "Blog":
      return "/blog";
    case "FAQ":
      return "/faq";
    case "Book":
      return "/#book-session";
    case "RESTORE":
      return "/restore";
    case "Contact":
      return "/#contact";
    default:
      return `/#${item.toLowerCase().replaceAll(" ", "-")}`;
  }
}

function BrandLockup({ className }: { className?: string }) {
  return (
    <Link href="/" className={className} aria-label="Born to Blossom home">
      <BrandLogo
        priority
        className="h-12 w-12 shrink-0 rounded-[10px] shadow-[0_4px_14px_rgba(30,20,10,0.08)] md:h-14 md:w-14 md:rounded-[12px]"
      />
      <span className="min-w-0">
        <span className="block font-display text-xl leading-none text-[#2E2925] md:text-2xl">
          Born To Blossom
        </span>
        <span className="mt-1 block max-w-[11rem] text-[0.58rem] font-semibold uppercase leading-[1.35] tracking-[0.08em] text-blossom-ink/55 md:max-w-[14rem] md:text-[0.62rem]">
          A safe and nurturing space for healing emotions
        </span>
      </span>
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio");

  if (isStudio) return null;

  return (
    <header className="relative z-50 bg-[#FCF8F3] px-4 py-4 md:fixed md:inset-x-0 md:top-0 md:bg-transparent">
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

      <nav
        className="container-xl glass relative hidden h-[4.25rem] items-center justify-between overflow-visible rounded-full px-4 md:flex md:h-20 md:px-7"
        aria-label="Primary"
      >
        <BrandLockup className="relative z-10 flex items-center gap-3" />

        <div className="relative z-10 hidden items-center gap-5 xl:flex xl:gap-7">
          {navItems.map((item) => (
            <Link
              key={item}
              href={navHref(item)}
              className="text-[0.875rem] font-medium tracking-[0.01em] text-[#5E534A] transition hover:text-[#365A43] xl:text-[0.9375rem]"
            >
              {item}
            </Link>
          ))}
        </div>

        <div className="relative z-10 hidden md:block xl:flex">
          <Link
            href="/#book-session"
            className="button-ripple inline-flex h-[48px] items-center gap-2 rounded-full bg-[#365A43] px-5 text-[0.875rem] font-semibold text-white shadow-[0_8px_20px_rgba(54,90,67,0.20)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2D4B37] md:h-[52px] md:px-7 md:text-[0.9375rem]"
          >
            Book a Healing Session <Leaf className="h-4 w-4" />
          </Link>
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
            <Link
              key={item}
              href={navHref(item)}
              onClick={() => setOpen(false)}
              className="rounded-2xl px-4 py-3 text-sm font-semibold hover:bg-white/60"
            >
              {item}
            </Link>
          ))}
          <Link
            href="/#book-session"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#365A43] px-6 text-sm font-semibold text-white md:hidden"
          >
            Book a Healing Session <Leaf className="h-4 w-4" />
          </Link>
        </Container>
      ) : null}
    </header>
  );
}
