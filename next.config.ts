import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images : {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "psemployeeapp.blob.core.windows.net",
                pathname:"/announcement-images/**"
            },
            {
                protocol: "https",
                hostname: "psemployeeapp.blob.core.windows.net",
                pathname:"/resources/**"
            }
        ]
    }
};

export default nextConfig;
