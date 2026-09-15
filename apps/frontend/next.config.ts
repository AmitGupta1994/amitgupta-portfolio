import type { NextConfig } from "next";

const cmsUrl = new URL(process.env.CMS_URL ?? "http://localhost:3001");

const nextConfig: NextConfig = {
  images: {
    // Next refuses to optimize images from private IPs; the CMS runs on localhost in development.
    dangerouslyAllowLocalIP: process.env.NODE_ENV !== "production",
    remotePatterns: [
      // Uploads served by the Payload CMS (apps/admin)
      {
        protocol: cmsUrl.protocol === "https:" ? "https" : "http",
        hostname: cmsUrl.hostname,
        port: cmsUrl.port,
        pathname: "/api/media/file/**",
      },
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn-images-1.medium.com",
      },
      {
        protocol: "https",
        hostname: "miro.medium.com",
      },
      {
        protocol: "https",
        hostname: "medium.com",
      },
    ],
  },
};

export default nextConfig;
