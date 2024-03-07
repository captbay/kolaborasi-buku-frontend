/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "flowbite.s3.amazonaws.com",
      "kolaborasi-buku-backend.test",
      "via.placeholder.com",
    ],
  },
};

export default nextConfig;
