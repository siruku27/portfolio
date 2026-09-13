import Link from "next/link";
import Prompt from "@/components/Prompt";
import Tag from "@/components/Tag";
import WorkVisual from "@/components/WorkVisual";
import { career, profile, services, skills, strengths } from "@/data/profile";
import { works } from "@/data/works";

const button = "inline-block border px-3 py-1.5 text-sm transition-colors";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl space-y-20 px-4 pt-10 pb-16 sm:px-6 sm:pt-16">
      <section>
        <Prompt>whoami</Prompt>
        <div className="mt-5">
          <p className="text-sm text-amber">{profile.role}</p>
          <h1 className="mt-3 text-[1.7rem] leading-snug font-bold sm:text-5xl sm:leading-tight">
            {profile.catchcopy.map((line) => (
              <span key={line} className="inline-block">
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">{profile.lead}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#works" className={`${button} border-amber text-amber hover:bg-amber hover:text-bg`}>
              [ 制作実績を見る ]
            </a>
            <a href="#contact" className={`${button} border-line hover:border-fg`}>
              [ お仕事のご相談 ]
            </a>
          </div>
        </div>
      </section>

      <section aria-label="強み">
        <Prompt>cat strengths.md</Prompt>
        <div className="mt-5 grid gap-6 sm:grid-cols-3">
          {strengths.map((item) => (
            <div key={item.title} className="border-l border-line pl-4">
              <p className="font-bold">
                <span className="text-muted">## </span>
                {item.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="works" className="scroll-mt-6">
        <Prompt as="h2" label="制作実績">
          ls works/
        </Prompt>
        <p className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm">
          {works.map((work) => (
            <Link key={work.slug} href={`/works/${work.slug}`} className="text-blue hover:underline">
              {work.slug}/
            </Link>
          ))}
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {works.map((work) => (
            <Link
              key={work.slug}
              href={`/works/${work.slug}`}
              className="group flex flex-col border border-line bg-panel transition-colors hover:border-amber"
            >
              <div className="flex flex-wrap justify-between gap-x-3 border-b border-line px-4 py-2 text-xs">
                <span className="text-blue">works/{work.slug}/</span>
                <span className="text-muted">{work.category}</span>
              </div>
              <div className="aspect-[16/10] overflow-hidden border-b border-line">
                <WorkVisual work={work} compact />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="text-lg font-bold">{work.title}</h3>
                <p className="text-sm text-muted">{work.subtitle}</p>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed">{work.summary}</p>
                <div className="mt-4 flex flex-wrap gap-x-2 gap-y-1">
                  {work.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
                <p className="mt-auto pt-5 text-sm text-amber">
                  $ cat README.md <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="about" className="scroll-mt-6">
        <Prompt as="h2" label="経歴">
          git log --graph career
        </Prompt>
        <ol className="mt-6">
          {[...career].reverse().map((item, index) => (
            <li key={item.title} className="relative ml-1 border-l border-line pb-7 pl-6 last:border-transparent last:pb-0">
              <span aria-hidden className="absolute top-0 -left-[0.3em] bg-bg leading-snug text-amber">
                *
              </span>
              <p className="flex flex-wrap items-baseline gap-x-3 leading-snug">
                <span className="text-sm text-muted">{item.period}</span>
                <span className="font-bold">{item.title}</span>
                {index === 0 && <span className="text-sm text-green">(HEAD -&gt; main)</span>}
              </p>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">{item.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="skills" className="scroll-mt-6">
        <Prompt as="h2" label="スキル">
          cat skills.json
        </Prompt>
        <div className="mt-5 border border-line bg-panel p-4 text-sm leading-relaxed sm:p-5">
          <p className="text-muted">{"{"}</p>
          {skills.map((group, groupIndex) => (
            <div key={group.label} className="pl-4 sm:pl-6">
              <p>
                <span className="text-blue">&quot;{group.label}&quot;</span>
                <span className="text-muted">: [</span>
              </p>
              <p className="flex flex-wrap gap-x-2 pl-4 sm:pl-6">
                {group.items.map((item, index) => (
                  <span key={item} className="whitespace-nowrap">
                    <span className="text-green">&quot;{item}&quot;</span>
                    {index < group.items.length - 1 && <span className="text-muted">,</span>}
                  </span>
                ))}
              </p>
              <p className="text-muted">]{groupIndex < skills.length - 1 ? "," : ""}</p>
            </div>
          ))}
          <p className="text-muted">{"}"}</p>
        </div>
      </section>

      <section id="contact" className="scroll-mt-6">
        <Prompt as="h2" label="お仕事のご依頼">
          cat contact.txt
        </Prompt>
        <div className="mt-5 grid gap-8 md:grid-cols-[3fr_2fr]">
          <div>
            <p className="font-bold">
              <span className="text-muted"># </span>
              こんなお仕事をお受けしています
            </p>
            <ul className="mt-3 space-y-2">
              {services.map((item) => (
                <li key={item} className="flex gap-2 text-sm leading-relaxed">
                  <span aria-hidden className="text-amber">
                    -
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-muted">{"// 小さな修正から継続的な開発まで、お気軽にご相談ください。"}</p>
          </div>
          <div className="border border-line bg-panel p-5">
            <p className="font-bold">
              <span className="text-muted"># </span>
              ご連絡について
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              フリーランスのため、平日・土日祝を問わず稼働できます。メッセージはこまめに確認し、迅速にお返事します。
            </p>
            {profile.crowdworksUrl ? (
              <a
                href={profile.crowdworksUrl}
                target="_blank"
                rel="noreferrer"
                className={`${button} mt-5 border-amber text-amber hover:bg-amber hover:text-bg`}
              >
                [ クラウドワークスで相談する ↗ ]
              </a>
            ) : (
              <p className="mt-5 text-sm">ご依頼はクラウドワークスのメッセージからお願いします。</p>
            )}
          </div>
        </div>
      </section>

      <Prompt cursor />
    </div>
  );
}
