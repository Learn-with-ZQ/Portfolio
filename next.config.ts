import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The chat route reads the assistant's knowledge base at runtime.
  outputFileTracingIncludes: {
    "/api/chat": ["./src/data/knowledge.md"],
  },

  // /Websites: static homepage concepts for Karachi businesses (public/Websites).
  // Next serves public files only at their exact path, so map the folder URLs
  // to their index.html. The gallery has <base href="/Websites/"> so its
  // relative links work without a trailing slash.
  async rewrites() {
    return [
      { source: "/Websites", destination: "/Websites/index.html" },
      { source: "/Websites/:slug", destination: "/Websites/:slug/index.html" },
    ];
  },

  // They use real businesses' names and are not their official sites, so keep
  // them out of search results (every page also has a robots meta tag).
  async headers() {
    return [
      { source: "/Websites", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
      { source: "/Websites/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
    ];
  },
};

export default nextConfig;
