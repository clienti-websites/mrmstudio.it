import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // yet-another-react-lightbox ships ESM-only (no CJS build); this makes both
  // the Next.js build and the Jest test transform handle it correctly.
  transpilePackages: ["yet-another-react-lightbox"],
};

export default nextConfig;
