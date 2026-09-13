import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Prompt from "@/components/Prompt";
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
    <article className="mx-auto max-w-3xl px-4 pt-10 pb-16 sm:px-6 sm:pt-16">
      <Prompt path="~/works">cat {work.slug}/README.md</Prompt>

      <div className="mt-6 border-l border-line pl-4 sm:pl-6">
        <h1 className="text-2xl leading-snug font-bold sm:text-4xl">
          <span className="text-muted"># </span>
          {work.title}
        </h1>
        <p className="mt-2 text-muted">&gt; {work.subtitle}</p>

        <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
          <dt className="text-blue">type</dt>
          <dd>{work.category}</dd>
          <dt className="text-blue">stack</dt>
          <dd className="flex flex-wrap gap-x-2">
            {work.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </dd>
        </dl>

        <div className="mt-8 overflow-hidden border border-line">
          <WorkVisual work={work} priority />
        </div>

        <p className="mt-8 leading-relaxed">{work.summary}</p>

        {work.sections.map((section) => (
          <section key={section.heading} className="mt-10">
            <h2 className="text-lg font-bold">
              <span className="text-muted">## </span>
              {section.heading}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {section.items.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm leading-relaxed sm:text-[15px]">
                  <span aria-hidden className="text-amber">
                    -
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}

        {work.note && <p className="mt-10 border-l-2 border-amber pl-3 text-sm text-muted">{work.note}</p>}

        {work.links && (
          <p className="mt-8 flex flex-wrap gap-x-6 text-sm">
            {work.links.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="text-blue hover:underline">
                [{link.label}]({link.href})
              </a>
            ))}
          </p>
        )}
      </div>

      <div className="mt-12">
        <Prompt path="~/works">
          <Link href="/#works" className="text-amber hover:underline">
            cd ..
          </Link>
        </Prompt>
      </div>
    </article>
  );
}
