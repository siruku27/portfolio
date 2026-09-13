import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Tag from "@/components/Tag";
import WorkVisual from "@/components/WorkVisual";
import { findWork, works } from "@/data/works";

export const dynamicParams = false;

export function generateStaticParams() {
  return works.map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({ params }: PageProps<"/works/[slug]">): Promise<Metadata> {
  const work = findWork((await params).slug);
  return work ? { title: work.title, description: work.summary } : {};
}

export default async function WorkPage({ params }: PageProps<"/works/[slug]">) {
  const work = findWork((await params).slug);
  if (!work) notFound();

  return (
    <article className="mx-auto max-w-3xl px-5 py-12 sm:py-16">
      <Link href="/#works" className="text-sm text-muted hover:text-ink">
        ← 制作実績の一覧へ
      </Link>

      <p className="mt-8 text-sm text-accent">{work.category}</p>
      <h1 className="mt-2 text-2xl leading-snug font-bold sm:text-4xl">{work.title}</h1>
      <p className="mt-1 text-base text-muted sm:text-lg">{work.subtitle}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {work.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-line">
        <WorkVisual work={work} priority />
      </div>

      <p className="mt-8 leading-relaxed">{work.summary}</p>

      {work.sections.map((section) => (
        <section key={section.heading} className="mt-10">
          <h2 className="border-l-4 border-accent pl-3 text-lg font-bold">{section.heading}</h2>
          <ul className="mt-4 space-y-2.5">
            {section.items.map((item) => (
              <li key={item} className="flex gap-2.5 leading-relaxed">
                <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}

      {work.note && (
        <p className="mt-10 rounded-xl border border-line bg-surface px-4 py-3 text-sm text-muted">{work.note}</p>
      )}

      {work.links && (
        <div className="mt-8 flex flex-wrap gap-3">
          {work.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-line px-5 py-2 text-sm font-medium hover:border-accent"
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      )}
    </article>
  );
}
