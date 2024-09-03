/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    getApi: process.env.NEXT_API_URL,
  },
};

export default nextConfig;
