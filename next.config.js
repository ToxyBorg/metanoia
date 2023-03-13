/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    // domains: ["images.unsplash.com", "tagpjpitlabjswlonwwj.supabase.co"],
    // deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tagpjpitlabjswlonwwj.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/items/**",
      },
    ],
  },
};

module.exports = nextConfig;
