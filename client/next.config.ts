import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    SALT_ROUNDS: process.env.SALT_ROUNDS,
    NEXT_PUBLIC_DB_API_BASEURL: process.env.NEXT_PUBLIC_DB_API_BASEURL,
    NEXT_PUBLIC_AUTH_API_BASEURL: process.env.NEXT_PUBLIC_AUTH_API_BASEURL,
  },
};

export default nextConfig;
