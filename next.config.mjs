/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        // Note: allow figma files origin.
        protocol: 'https',
        hostname: 's3-alpha-sig.figma.com',
      },
    ],
  }
};

export default nextConfig;
