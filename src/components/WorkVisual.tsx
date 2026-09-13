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
    <div className={`min-w-0 flex-1 border bg-bg ${compact ? "p-2.5" : "p-4"} ${highlight ? "border-amber" : "border-line"}`}>
      <p className={`text-blue ${compact ? "text-[11px]" : "text-xs"}`}>{label}/</p>
      <p className={`mt-0.5 font-bold ${compact ? "text-xs" : "text-sm"} ${highlight ? "text-amber" : ""}`}>{title}</p>
      <ul className={compact ? "mt-1.5 space-y-0.5 text-[11px]" : "mt-3 space-y-1 text-xs"}>
        {items.map((item) => (
          <li key={item} className="truncate">
            <span className="text-muted">- </span>
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
    <div className={`flex h-full flex-col justify-center bg-panel ${compact ? "gap-2 p-3 sm:p-4" : "gap-3 p-4 sm:p-6"}`}>
      <div className={`flex items-stretch gap-2 ${compact ? "flex-row items-center" : "flex-col sm:flex-row sm:items-center sm:gap-3"}`}>
        <Column label="before" title="独自PHP FW" items={before[variant]} compact={compact} />
        <span aria-hidden className="text-center text-amber">
          {compact ? "→" : <><span className="sm:hidden">↓</span><span className="hidden sm:inline">→</span></>}
        </span>
        <Column label="after" title="Laravel 12" items={after[variant]} highlight compact={compact} />
      </div>
      <p className={`text-muted ${compact ? "text-[10px]" : "text-xs"}`}>{"// 既存のMariaDB（テーブル定義は変更なし）"}</p>
    </div>
  );
}

// 「ファイル名  # 説明」の形の行を、説明だけ薄く表示する。
function Tree({ lines, compact }: { lines: string[]; compact?: boolean }) {
  return (
    <pre className={`h-full overflow-auto bg-panel leading-relaxed ${compact ? "p-4 text-[11px] sm:text-xs" : "p-5 text-xs sm:text-sm"}`}>
      {lines.map((line) => {
        const [, code, comment] = line.match(/^(.*?)(\s+# .*)?$/) ?? [];
        return (
          <span key={line} className="block">
            {code}
            {comment && <span className="text-muted">{comment}</span>}
          </span>
        );
      })}
    </pre>
  );
}

export default function WorkVisual({ work, priority, compact }: { work: Work; priority?: boolean; compact?: boolean }) {
  if (work.visual === "architecture") {
    return <ArchitectureDiagram compact={compact} />;
  }
  if (work.tree) {
    return <Tree lines={work.tree} compact={compact} />;
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
    <div className="flex h-full items-center justify-center bg-panel p-6 text-center font-bold text-amber">
      {work.title}
    </div>
  );
}
