/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "kolaborasi-buku-backend.test",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "103.175.219.173",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
