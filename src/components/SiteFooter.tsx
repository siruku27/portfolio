import { profile } from "@/data/profile";

export default function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2 px-5 py-6 text-xs text-muted">
        <p>© {profile.name}</p>
        <a href={profile.githubUrl} className="hover:text-ink" target="_blank" rel="noreferrer">
          GitHub
        </a>
      </div>
    </footer>
  );
}
