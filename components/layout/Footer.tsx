"use client";

import { useState } from "react";
import { ChevronRight, Instagram, Leaf, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { footerQuickLinks, footerServices } from "@/lib/content";
import { cn } from "@/lib/utils";
import { SacredMark } from "@/components/ui/SacredMark";
import { Container } from "@/components/layout/Container";
import { FooterDecoration } from "@/components/decorations/FooterDecoration";

const SOCIAL_LINKS = [
  {
    href: "https://www.instagram.com/borntoblossom_soulawakening/",
    label: "Instagram",
    Icon: Instagram
  },
  {
    href: "https://www.youtube.com/@BornToBlossomHealing",
    label: "YouTube",
    Icon: Youtube
  }
] as const;

function FooterColumn({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div>
      <h3 className="font-bold">{title}</h3>
      <div className="mt-4 grid gap-2.5 text-sm text-blossom-ink/65 md:mt-5 md:gap-3">
        {items.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
            className="hover:text-blossom-green"
          >
            {item}
          </a>
        ))}
      </div>
    </div>
  );
}

function FooterAccordion({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-t border-[#EFE5DA]">
      <button
        type="button"
        className="flex w-full items-center justify-between py-4 text-left"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        <span className="text-[0.9375rem] font-bold text-[#2E2925]">{title}</span>
        <ChevronRight
          className={cn("h-4 w-4 shrink-0 text-[#9A8D82] transition-transform duration-300", open && "rotate-90")}
        />
      </button>
      {open ? <div className="pb-4">{children}</div> : null}
    </div>
  );
}

function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={cn("flex gap-4", className)}>
      {SOCIAL_LINKS.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#6F6258] transition hover:text-[#365A43]"
          aria-label={label}
        >
          <Icon className="h-5 w-5" />
        </a>
      ))}
    </div>
  );
}

function ConnectDetails({ className }: { className?: string }) {
  return (
    <div className={cn("grid gap-3 text-sm text-blossom-ink/68", className)}>
      <p className="flex items-center gap-3">
        <Mail className="h-4 w-4 shrink-0 text-blossom-rose" /> hello@borntoblossom.com
      </p>
      <p className="flex items-center gap-3">
        <Phone className="h-4 w-4 shrink-0 text-blossom-rose" /> +91 75068 28722
      </p>
      <p className="flex items-center gap-3">
        <MapPin className="h-4 w-4 shrink-0 text-blossom-rose" /> Gurgaon, Haryana, India
      </p>
    </div>
  );
}

export function Footer() {
  return (
    <footer id="contact" className="relative border-t border-[#EFE5DA] bg-[#F8F3ED]">
      <div className="hidden md:contents">
        <FooterDecoration />
        <SacredMark className="pointer-events-none absolute -right-14 bottom-16 z-0 hidden w-48 opacity-20 xl:block" />
      </div>

      {/* Mobile card footer */}
      <Container className="relative z-10 py-6 md:hidden">
        <div className="rounded-[28px] border border-[#EFE5DA] bg-[#FFFDFC] p-6 shadow-[0_10px_30px_rgba(30,20,10,0.05)]">
          <div className="flex items-start gap-3">
            <SacredMark className="w-11 shrink-0" />
            <div>
              <h2 className="font-display text-[1.5rem] font-medium leading-none text-[#2E2925]">Born To Blossom</h2>
              <p className="mt-1.5 text-[0.72rem] font-bold tracking-[0.08em] text-[#2E2925]">Heal. Grow. Awaken.</p>
            </div>
          </div>

          <p className="mt-4 text-[0.875rem] leading-[1.75] text-[#6F6258]">
            A holistic space for healing, growth &amp; transformation. You are born to blossom.
          </p>

          <SocialLinks className="mt-5" />

          <div className="mt-2">
            <FooterAccordion title="Quick Links">
              <div className="grid gap-2.5 text-sm text-blossom-ink/65">
                {footerQuickLinks.map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
                    className="hover:text-blossom-green"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </FooterAccordion>

            <FooterAccordion title="Services">
              <div className="grid gap-2.5 text-sm text-blossom-ink/65">
                {footerServices.map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
                    className="hover:text-blossom-green"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </FooterAccordion>

            <FooterAccordion title="Connect">
              <ConnectDetails />
            </FooterAccordion>

            <FooterAccordion title="Begin Your Healing Journey">
              <p className="text-sm leading-[1.75] text-[#6F6258]">
                Take the first step towards healing, clarity and inner peace.
              </p>
              <a
                href="#book-session"
                className="button-ripple mt-4 inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-full bg-[#365A43] text-[0.9375rem] font-semibold text-white shadow-[0_12px_28px_rgba(54,90,67,0.22)]"
              >
                Book Your Session <Leaf className="h-4 w-4" />
              </a>
            </FooterAccordion>
          </div>

          <div className="mt-6 border-t border-[#EFE5DA] pt-5 text-center text-xs text-blossom-ink/55">
            <p>© 2026 Born To Blossom. All rights reserved.</p>
            <div className="mt-2 flex items-center justify-center gap-3">
              <a href="#">Privacy Policy</a>
              <span aria-hidden>|</span>
              <a href="#">Terms & Conditions</a>
            </div>
          </div>
        </div>
      </Container>

      {/* Desktop footer */}
      <Container className="relative z-10 hidden grid-cols-1 gap-10 py-10 md:grid md:grid-cols-2 md:gap-12 xl:grid-cols-[1.1fr_0.7fr_1fr_0.9fr] xl:gap-12">
        <div className="max-w-sm md:col-span-2 xl:col-span-1">
          <SacredMark className="mb-5 w-14 md:w-16" />
          <h2 className="font-display text-[1.75rem] font-medium text-[#2E2925] md:text-[2rem]">Born To Blossom</h2>
          <p className="mt-4 text-[0.875rem] leading-[1.8] text-[#6F6258]">
            A holistic space for healing, growth and awakening.
          </p>
          <p className="mt-3 text-[0.875rem] font-semibold text-[#365A43]">You are born to blossom.</p>
          <div className="mt-6 flex gap-3">
            {SOCIAL_LINKS.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-10 w-10 place-items-center rounded-full border border-[#EFE5DA] bg-white text-[#6F6258] transition hover:border-[#365A43] hover:text-[#365A43]"
                aria-label={label}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <FooterColumn title="Quick Links" items={footerQuickLinks} />
        <FooterColumn title="Services" items={footerServices} />

        <div>
          <h3 className="font-bold">Connect</h3>
          <ConnectDetails className="mt-4 md:mt-5 md:gap-4" />
        </div>
      </Container>

      <div className="relative z-10 hidden border-t border-[#EFE5DA] py-5 md:block">
        <Container className="flex flex-col items-start justify-between gap-4 text-xs text-blossom-ink/55 sm:flex-row sm:items-center">
          <p>© 2026 Born To Blossom. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms & Conditions</a>
          </div>
        </Container>
      </div>
    </footer>
  );
}
