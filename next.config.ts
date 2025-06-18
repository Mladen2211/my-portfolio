/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  basePath: isProd ? "" : "",
  assetPrefix: isProd ? "" : "",
};

export default nextConfig;