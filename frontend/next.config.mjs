/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.seadn.io",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
