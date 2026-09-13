import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 静的ファイルとして書き出し、Vercelでもレンタルサーバーでも置けるようにする。
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
