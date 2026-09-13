export default function Tag({ children }: { children: React.ReactNode }) {
  return <span className="text-xs text-muted">[{children}]</span>;
}
