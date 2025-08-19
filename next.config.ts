import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["localhost"], // Add localhost to allowed image domains
  },
};

export default nextConfig;
