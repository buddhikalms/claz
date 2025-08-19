import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["localhost"], // Add localhost to allowed image domains
  },
};

module.exports = nextConfig;
