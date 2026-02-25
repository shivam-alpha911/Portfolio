import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",           // Generate static HTML/CSS/JS in out/
  basePath: isProd ? "/Portfolio" : "",   // Subpath on GitHub Pages
  assetPrefix: isProd ? "/Portfolio/" : "",
  images: {
    unoptimized: true,        // Required for static export (no server-side image optimization)
  },
};

export default nextConfig;
