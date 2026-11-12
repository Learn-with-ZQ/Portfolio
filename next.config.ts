import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The chat route reads the assistant's knowledge base at runtime.
  outputFileTracingIncludes: {
    "/api/chat": ["./src/data/knowledge.md"],
  },
};

export default nextConfig;
