import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images : {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "https://psemployeeapp.blob.core.windows.net",
                pathname:"/**/**"
            }
        ]
    }
};

export default nextConfig;
