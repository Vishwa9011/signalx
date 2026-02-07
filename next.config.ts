import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/blitz",
        destination: "/trade",
        permanent: true,
      },
      {
        source: "/trade-history",
        destination: "/history",
        permanent: true,
      },
      {
        source: "/leaderboard",
        destination: "/rankings",
        permanent: true,
      },
      {
        source: "/profile",
        destination: "/account",
        permanent: true,
      },
      {
        source: "/points",
        destination: "/trade",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
