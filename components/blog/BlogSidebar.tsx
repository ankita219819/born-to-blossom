import Image from "next/image";
import Link from "next/link";
import { Clock3, UserRound } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import { formatPostDate, type BlogPostListItem } from "@/sanity/lib/types";

export function BlogSidebar({ posts }: { posts: BlogPostListItem[] }) {
  if (!posts.length) return null;

  return (
    <aside className="rounded-[20px] border border-[#EFE5DA] bg-[#FFFDFC] p-5 shadow-[0_10px_30px_rgba(30,20,10,0.04)] md:p-6">
      <h2 className="border-b border-[#EFE5DA] pb-3 font-display text-[1.35rem] font-medium text-[#2E2925]">
        Featured Posts
      </h2>
      <div className="mt-5 grid gap-5">
        {posts.map((post) => {
          const imageUrl = post.mainImage ? urlFor(post.mainImage).width(480).height(300).url() : null;
          return (
            <article key={post._id} className="grid gap-3">
              <Link href={`/blog/${post.slug}`} className="relative block aspect-[16/10] overflow-hidden rounded-[12px] bg-[#EDE5D8]">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={post.mainImage?.alt || post.title}
                    fill
                    className="object-cover"
                    sizes="320px"
                  />
                ) : null}
                {post.category ? (
                  <span className="absolute left-2 top-2 rounded-[4px] bg-[#2E2925]/88 px-2 py-1 text-[0.58rem] font-bold uppercase tracking-[0.08em] text-white">
                    {post.category}
                  </span>
                ) : null}
              </Link>
              <div>
                <h3 className="font-display text-[1.05rem] font-medium leading-snug text-[#2E2925]">
                  <Link href={`/blog/${post.slug}`} className="hover:text-[#365A43]">
                    {post.title}
                  </Link>
                </h3>
                <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-[0.72rem] text-[#9A8D82]">
                  <span className="inline-flex items-center gap-1">
                    <UserRound className="h-3 w-3" />
                    {post.author || "Admin"}
                  </span>
                  {post.publishedAt ? (
                    <span className="inline-flex items-center gap-1">
                      <Clock3 className="h-3 w-3" />
                      {formatPostDate(post.publishedAt)}
                    </span>
                  ) : null}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </aside>
  );
}
