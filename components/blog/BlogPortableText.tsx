import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import type { PortableTextBlock } from "@portabletext/types";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mt-10 font-display text-[1.75rem] font-medium leading-tight text-[#2E2925]">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 font-display text-[1.4rem] font-medium leading-tight text-[#2E2925]">{children}</h3>
    ),
    normal: ({ children }) => <p className="mt-5 text-[1.02rem] leading-[1.9] text-[#6F6258]">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-4 border-[#C69C6D] pl-5 font-display text-[1.25rem] italic text-[#2E2925]">
        {children}
      </blockquote>
    )
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-[#2E2925]">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ children, value }) => (
      <a href={value?.href} className="underline decoration-[#C69C6D] underline-offset-4 hover:text-[#365A43]">
        {children}
      </a>
    )
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const src = urlFor(value).width(1200).url();
      return (
        <figure className="my-8 overflow-hidden rounded-[18px]">
          <Image
            src={src}
            alt={value.alt || ""}
            width={1200}
            height={750}
            className="h-auto w-full object-cover"
          />
          {value.alt ? <figcaption className="mt-2 text-center text-sm text-[#9A8D82]">{value.alt}</figcaption> : null}
        </figure>
      );
    }
  }
};

export function BlogPortableText({ value }: { value?: PortableTextBlock[] }) {
  if (!value?.length) return null;
  return <PortableText value={value} components={components} />;
}
