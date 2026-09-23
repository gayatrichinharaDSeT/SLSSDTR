import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  // The gated strategic-brief PDF lives outside `public/` (so it can never
  // be fetched by a direct URL) and is only ever read via `fs.readFile` in
  // the download route below — Next's build-time file tracer can miss a
  // dynamically-joined path like that, so it's listed explicitly to
  // guarantee it ships in the deployed function bundle.
  outputFileTracingIncludes: {
    "/api/resources/strategic-brief/download": ["./private/resources/**/*"],
  },
};

export default nextConfig;
