import type { NextConfig } from "next";

// frontend/next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
}

module.exports = nextConfig

export default nextConfig;
