import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Media uploaded to the CMS is served from this same app.
    localPatterns: [{ pathname: "/api/media/file/**" }],
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
