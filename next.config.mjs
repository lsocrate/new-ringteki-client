/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.gravatar.com",
        pathname: "/avatar/**",
      },
      {
        protocol: "https",
        hostname: "jigoku.online",
        pathname: "/img/**",
      },
    ],
  },
};

export default nextConfig;
