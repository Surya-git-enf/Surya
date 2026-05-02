/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ['three', 'postprocessing'],
  images: {
    domains: [],
  },
};

export default nextConfig;
