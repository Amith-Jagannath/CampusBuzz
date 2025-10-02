// next.config.js
import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ["lh3.googleusercontent.com", "res.cloudinary.com"],
  },

  experimental: {
    serverComponentsExternalPackages: ["prisma"],
  },
};

// Keep PWA wrapper as the default export
export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
})(nextConfig);
