/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: "kolaborasi-buku-backend.test",
        port: '',
        pathname: '/**',
      }
      ],
  },
};

export default nextConfig;
