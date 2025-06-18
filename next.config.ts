import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
    // edit: updated to new key. Was previously `allowedForwardedHosts`
    allowedOrigins:  ["localhost:3000","solid-robot-jjq6wx67r69hpgww-3000.app.github.dev" ],
  },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },


}

export default nextConfig
