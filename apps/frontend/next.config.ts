import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

// Preview/staging deployments must never be indexed.
const isProduction = !process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production";

const nextConfig: NextConfig = {
  // The CMS must never be cached by a CDN, however Cloudflare's rules are set up.
  async headers() {
    return [
      ...(isProduction
        ? []
        : [
            {
              source: "/:path*",
              headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
            },
          ]),
      {
        source: "/admin/:path*",
        headers: [{ key: "Cache-Control", value: "private, no-store, max-age=0" }],
      },
      {
        source: "/api/:path*",
        headers: [{ key: "Cache-Control", value: "private, no-store, max-age=0" }],
      },
    ];
  },
  images: {
    // Media uploaded to the CMS, plus static brand assets in public/<site>.
    localPatterns: [{ pathname: "/api/media/file/**" }, { pathname: "/techcompany/**" }, { pathname: "/mokshyatrails/**" }],
    remotePatterns: [
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
      {
        // YouTube thumbnails for the film galleries.
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        // Uploads once Vercel Blob storage is connected.
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
