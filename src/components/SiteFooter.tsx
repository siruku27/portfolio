import { profile } from "@/data/profile";

export default function SiteFooter() {
  return (
    // 下に固定したステータスバーに隠れないよう、下側を空けておく。
    <footer className="mx-auto w-full max-w-5xl px-4 pb-14 text-xs text-muted sm:px-6">
      <div className="flex flex-wrap justify-between gap-2 border-t border-line pt-4">
        <p>© {profile.name}</p>
        <a href={profile.githubUrl} className="hover:text-fg" target="_blank" rel="noreferrer">
          github.com/siruku27 ↗
        </a>
      </div>
    </footer>
  );
}
