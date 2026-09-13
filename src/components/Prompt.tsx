type PromptProps = {
  path?: string;
  children?: React.ReactNode;
  as?: "p" | "h2";
  // 見出しとして使うとき、読み上げではコマンドの代わりにこの名前を伝える。
  label?: string;
  cursor?: boolean;
};

export default function Prompt({ path = "~", children, as: Tag = "p", label, cursor }: PromptProps) {
  return (
    <Tag aria-label={label} className="text-sm font-normal break-words sm:text-[15px]">
      <span className="hidden text-green sm:inline">siruku27@portfolio</span>
      <span className="hidden text-muted sm:inline">:</span>
      <span className="text-blue">{path}</span>
      <span className="text-muted">$ </span>
      <span className="text-fg">{children}</span>
      {cursor && (
        <span aria-hidden className="cursor ml-0.5 inline-block h-[1.1em] w-[0.6em] translate-y-[0.2em] bg-fg" />
      )}
    </Tag>
  );
}
