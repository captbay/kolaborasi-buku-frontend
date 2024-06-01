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
      {
        protocol: "http",
        hostname: "103.175.219.173",
        port: "8080",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "admin.penerbitarunika.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "demo.admin.penerbitarunika.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
