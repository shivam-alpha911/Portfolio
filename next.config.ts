import type { NextConfig } from "next";

// GITHUB_ACTIONS is auto-set to "true" in GitHub Actions runners.
// Vercel does NOT set this, so it gets a clean root-level deployment.
const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: "export",           // Generate static HTML/CSS/JS in out/
  basePath: isGitHubPages ? "/Portfolio" : "",   // Subpath on GitHub Pages
  assetPrefix: isGitHubPages ? "/Portfolio/" : "",
  images: {
    unoptimized: true,        // Required for static export (no server-side image optimization)
  },
};

export default nextConfig;
