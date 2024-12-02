import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

};

module.exports = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.dropbox.com'
            },
            {
                protocol: 'https',
                hostname: 'food-guide.canada.ca'
            }
        ],
    },
}

export default nextConfig;
