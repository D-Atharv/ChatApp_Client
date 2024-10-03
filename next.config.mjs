/** @type {import('next').NextConfig} */
const nextConfig = {
    rewrites: async () => [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3000/api/:path*'  // Proxy to Backend
      }
    ],
  };
  
  export default nextConfig;
  