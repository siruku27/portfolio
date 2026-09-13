import Link from "next/link";
import { profile } from "@/data/profile";

// tmux のステータスバーに見立てたメニュー。画面の下に固定する。
const windows = [
  { href: "/#works", label: "制作実績" },
  { href: "/#about", label: "経歴" },
  { href: "/#skills", label: "スキル" },
  { href: "/#contact", label: "ご依頼" },
];

export default function StatusBar() {
  return (
    <nav aria-label="メニュー" className="fixed inset-x-0 bottom-0 z-10 border-t border-line bg-bar text-xs">
      <div className="mx-auto flex max-w-5xl items-center gap-x-4 overflow-x-auto px-4 py-2 whitespace-nowrap sm:px-6">
        <Link href="/" className="bg-amber px-1.5 font-bold text-bg">
          {profile.name}
        </Link>
        {windows.map((item, index) => (
          <Link key={item.href} href={item.href} className="text-muted hover:text-fg">
            <span className="text-blue">{index + 1}</span>:{item.label}
          </Link>
        ))}
        <span className="ml-auto hidden text-muted md:inline">PHP · Laravel · React · Next.js</span>
      </div>
    </nav>
  );
}
