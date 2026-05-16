/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Otimização para versões modernas de JS
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
