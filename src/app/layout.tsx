import type { Metadata } from "next";
import { JetBrains_Mono, M_PLUS_1_Code } from "next/font/google";
import SiteFooter from "@/components/SiteFooter";
import StatusBar from "@/components/StatusBar";
import { profile } from "@/data/profile";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const mplusCode = M_PLUS_1_Code({
  variable: "--font-mplus-code",
  subsets: ["latin"],
  weight: ["400", "700"],
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: `${profile.name} | ポートフォリオ`,
    template: `%s | ${profile.name}`,
  },
  description: profile.lead,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ja" className={`${jetbrainsMono.variable} ${mplusCode.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <StatusBar />
      </body>
    </html>
  );
}
