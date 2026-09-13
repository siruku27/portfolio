import Link from "next/link";
import { profile } from "@/data/profile";

const nav = [
  { href: "/#about", label: "経歴" },
  { href: "/#skills", label: "スキル" },
  { href: "/#works", label: "制作実績" },
  { href: "/#contact", label: "ご依頼" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-bg/85 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-3">
        <Link href="/" className="font-mono text-sm font-semibold">
          {profile.name}
        </Link>
        <nav className="flex gap-4 text-sm text-muted sm:gap-7">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
