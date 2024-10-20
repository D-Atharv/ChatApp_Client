/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      remotePatterns: [
          {
              protocol: 'http',
              hostname: 'localhost',
              port: '3000', // Port where your backend is running
              pathname: '/uploads/**', // Path to match all files under /uploads
          },
      ],
  },
  rewrites: async () => [
    {
      source: '/api/:path*',
      destination: 'http://localhost:3000/api/:path*'  // Proxy to Backend
    }
  ],
  reactStrictMode: false
};
export default nextConfig;
