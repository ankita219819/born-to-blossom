import Image from "next/image";
import Link from "next/link";
import { Clock3, UserRound } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import { formatPostDate, type BlogPostListItem } from "@/sanity/lib/types";

export function BlogPostCard({ post }: { post: BlogPostListItem }) {
  const imageUrl = post.mainImage ? urlFor(post.mainImage).width(640).height(400).url() : null;

  return (
    <article className="grid gap-4 border-b border-[#EFE5DA] py-6 last:border-b-0 sm:grid-cols-[220px_1fr] sm:gap-6 md:py-8">
      <Link href={`/blog/${post.slug}`} className="relative block aspect-[16/10] overflow-hidden rounded-[14px] bg-[#EDE5D8] sm:aspect-[5/4]">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={post.mainImage?.alt || post.title}
            fill
            className="object-cover transition duration-500 hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, 220px"
          />
        ) : null}
        {post.category ? (
          <span className="absolute left-2.5 top-2.5 rounded-[4px] bg-[#2E2925]/88 px-2 py-1 text-[0.62rem] font-bold uppercase tracking-[0.08em] text-white">
            {post.category}
          </span>
        ) : null}
      </Link>

      <div className="min-w-0">
        <h2 className="font-display text-[1.45rem] font-medium leading-[1.2] tracking-[-0.02em] text-[#2E2925] md:text-[1.75rem]">
          <Link href={`/blog/${post.slug}`} className="transition hover:text-[#365A43]">
            {post.title}
          </Link>
        </h2>

        <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.78rem] text-[#9A8D82]">
          <span className="inline-flex items-center gap-1.5">
            <UserRound className="h-3.5 w-3.5" />
            {post.author || "Admin"}
          </span>
          {post.publishedAt ? (
            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="h-3.5 w-3.5" />
              {formatPostDate(post.publishedAt)}
            </span>
          ) : null}
        </div>

        {post.excerpt ? (
          <p className="mt-3 line-clamp-3 text-[0.92rem] leading-[1.7] text-[#6F6258]">{post.excerpt}</p>
        ) : null}
      </div>
    </article>
  );
}
