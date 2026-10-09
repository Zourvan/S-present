import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep classic `next start` for Runflare Next.js runtime
  // (standalone breaks `next start` on their Node hosting).
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
