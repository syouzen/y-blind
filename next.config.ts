import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 로컬 개발 환경에서만 프록시 설정 (CORS 우회)
  async rewrites() {
    if (process.env.NODE_ENV === "development") {
      return [
        {
          source: "/api-proxy/:path*",
          destination: "https://y-blind-server.onrender.com/:path*",
        },
      ];
    }
    return [];
  },
};

export default nextConfig;
