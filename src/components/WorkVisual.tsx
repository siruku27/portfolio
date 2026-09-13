import Image from "next/image";
import type { Work } from "@/data/works";

const before = {
  full: ["自前のルーティング", "複製された入力・確認・完了ページ", "文字列連結で組み立てるSQL", "平文で保存されたパスワード"],
  short: ["自前ルーティング", "ページの複製", "文字列連結のSQL", "平文パスワード"],
};
const after = {
  full: ["Laravelのルーティングとコントローラ", "Bladeとフォームリクエスト", "Eloquentとクエリビルダ", "bcryptでハッシュ化（段階移行）"],
  short: ["ルーティング", "Blade", "クエリビルダ", "bcrypt"],
};

type ColumnProps = { label: string; title: string; items: string[]; highlight?: boolean; compact?: boolean };

function Column({ label, title, items, highlight, compact }: ColumnProps) {
  return (
    <div
      className={`min-w-0 flex-1 rounded-xl border ${compact ? "p-3" : "p-4"} ${
        highlight ? "border-accent bg-accent-soft" : "border-line bg-surface"
      }`}
    >
      <p className="font-mono text-[10px] tracking-widest text-muted uppercase">{label}</p>
      <p className={`mt-0.5 font-bold ${compact ? "text-xs" : "text-sm"}`}>{title}</p>
      <ul className={compact ? "mt-2 space-y-1" : "mt-3 space-y-1.5"}>
        {items.map((item) => (
          <li
            key={item}
            className={`truncate rounded-md border border-line bg-bg ${compact ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1.5 text-xs"}`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ArchitectureDiagram({ compact }: { compact?: boolean }) {
  const variant = compact ? "short" : "full";
  return (
    <div className={`flex h-full flex-col justify-center bg-bg ${compact ? "gap-2 p-3 sm:p-4" : "gap-3 p-4 sm:p-6"}`}>
      <div
        className={`flex items-stretch gap-2 ${compact ? "flex-row items-center" : "flex-col sm:flex-row sm:items-center sm:gap-3"}`}
      >
        <Column label="Before" title="独自PHP FW" items={before[variant]} compact={compact} />
        <span aria-hidden className="text-center text-lg text-accent">
          {compact ? "→" : <><span className="sm:hidden">↓</span><span className="hidden sm:inline">→</span></>}
        </span>
        <Column label="After" title="Laravel 12" items={after[variant]} highlight compact={compact} />
      </div>
      <p className={`rounded-lg border border-dashed border-line text-center text-muted ${compact ? "px-2 py-1 text-[10px]" : "px-3 py-2 text-xs"}`}>
        既存のMariaDB（テーブル定義は変更なし）
      </p>
    </div>
  );
}

export default function WorkVisual({ work, priority, compact }: { work: Work; priority?: boolean; compact?: boolean }) {
  if (work.visual === "architecture") {
    return <ArchitectureDiagram compact={compact} />;
  }
  if (work.image) {
    return (
      <Image
        src={work.image.src}
        alt={work.image.alt}
        width={1440}
        height={900}
        priority={priority}
        className="h-full w-full object-cover object-top"
      />
    );
  }
  return (
    <div className="flex h-full items-center justify-center bg-accent-soft p-6 text-center text-lg font-bold text-accent">
      {work.title}
    </div>
  );
}
