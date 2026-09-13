import Link from "next/link";
import Tag from "@/components/Tag";
import WorkVisual from "@/components/WorkVisual";
import { career, profile, services, skills, strengths } from "@/data/profile";
import { works } from "@/data/works";

function SectionHeading({ en, ja }: { en: string; ja: string }) {
  return (
    <div className="mb-8">
      <p className="font-mono text-xs tracking-widest text-accent uppercase">{en}</p>
      <h2 className="mt-1 text-2xl font-bold sm:text-3xl">{ja}</h2>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <section className="mx-auto max-w-5xl px-5 pt-16 pb-20 sm:pt-24">
        <p className="font-mono text-sm text-accent">{profile.role}</p>
        <h1 className="mt-4 text-3xl leading-tight font-bold sm:text-5xl">
          {profile.catchcopy.map((line) => (
            <span key={line} className="inline-block">
              {line}
            </span>
          ))}
        </h1>
        <p className="mt-6 max-w-2xl leading-relaxed text-muted sm:text-lg">{profile.lead}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#works" className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-bg hover:opacity-90">
            制作実績を見る
          </a>
          <a href="#contact" className="rounded-full border border-line px-5 py-2.5 text-sm font-medium hover:border-accent">
            お仕事のご相談
          </a>
        </div>
        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {strengths.map((item) => (
            <div key={item.title} className="rounded-2xl border border-line bg-surface p-5">
              <p className="font-bold">{item.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="works" className="scroll-mt-16 border-t border-line bg-surface">
        <div className="mx-auto max-w-5xl px-5 py-20">
          <SectionHeading en="Works" ja="制作実績" />
          <div className="grid gap-6 md:grid-cols-2">
            {works.map((work) => (
              <Link
                key={work.slug}
                href={`/works/${work.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-bg transition hover:border-accent"
              >
                <div className="aspect-[16/10] overflow-hidden border-b border-line">
                  <WorkVisual work={work} compact />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs text-accent">{work.category}</p>
                  <h3 className="mt-1 text-lg font-bold">{work.title}</h3>
                  <p className="text-sm text-muted">{work.subtitle}</p>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed">{work.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {work.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                  <p className="mt-auto pt-5 text-sm font-medium text-accent">
                    詳しく見る <span className="inline-block transition group-hover:translate-x-1">→</span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-5xl scroll-mt-16 px-5 py-20">
        <SectionHeading en="Career" ja="経歴" />
        <ol className="relative space-y-8 border-l border-line pl-6">
          {career.map((item) => (
            <li key={item.title} className="relative">
              <span aria-hidden className="absolute top-1.5 -left-[29px] size-2.5 rounded-full border-2 border-accent bg-bg" />
              <p className="font-mono text-xs text-muted">{item.period}</p>
              <p className="mt-1 font-bold">{item.title}</p>
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted">{item.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="skills" className="scroll-mt-16 border-t border-line bg-surface">
        <div className="mx-auto max-w-5xl px-5 py-20">
          <SectionHeading en="Skills" ja="スキル" />
          <div className="grid gap-6 sm:grid-cols-2">
            {skills.map((group) => (
              <div key={group.label} className="rounded-2xl border border-line bg-bg p-5">
                <p className="font-bold">{group.label}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item} className="rounded-lg border border-line bg-surface px-3 py-1.5 font-mono text-sm">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-5xl scroll-mt-16 px-5 py-20">
        <SectionHeading en="Contact" ja="お仕事のご依頼" />
        <div className="grid gap-8 md:grid-cols-[3fr_2fr]">
          <div>
            <p className="font-bold">こんなお仕事をお受けしています</p>
            <ul className="mt-4 space-y-2.5">
              {services.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm leading-relaxed">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-muted">
              小さな修正から継続的な開発まで、お気軽にご相談ください。
            </p>
          </div>
          <div className="rounded-2xl border border-line bg-surface p-6">
            <p className="font-bold">ご連絡について</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              フリーランスのため、平日・土日祝を問わず稼働できます。メッセージはこまめに確認し、迅速にお返事します。
            </p>
            {profile.crowdworksUrl ? (
              <a
                href={profile.crowdworksUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-block rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-bg hover:opacity-90"
              >
                クラウドワークスで相談する ↗
              </a>
            ) : (
              <p className="mt-5 text-sm">ご依頼はクラウドワークスのメッセージからお願いします。</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
