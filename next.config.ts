import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  basePath: "/gg-learnlabs",

  assetPrefix: "/gg-learnlabs/",

  trailingSlash: true,

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
