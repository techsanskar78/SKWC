const fs = require('fs');
const path = require('path');

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const text = fs.readFileSync(filePath, 'utf8');
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const eq = line.indexOf('=');
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    if (!key || process.env[key] !== undefined) continue;
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    process.env[key] = value;
  }
}

loadEnvFile(path.join(__dirname, '..', 'backend', '.env'));

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['skwc-backend'],
  poweredByHeader: false,
  compress: true,
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
    serverComponentsExternalPackages: ['googleapis', 'zod'],
  },
  webpack: (config) => {
    const frontendModules = path.join(__dirname, 'node_modules');
    config.resolve.modules = [frontendModules, ...(config.resolve.modules || ['node_modules'])];
    config.resolve.alias = {
      ...config.resolve.alias,
      googleapis: path.join(frontendModules, 'googleapis'),
      zod: path.join(frontendModules, 'zod'),
    };
    return config;
  },
  onDemandEntries: {
    maxInactiveAge: 60 * 60 * 1000,
    pagesBufferLength: 16,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    deviceSizes: [640, 750, 828, 1080, 1200, 1600],
    imageSizes: [32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'drive.google.com' },
      { protocol: 'https', hostname: 'googleusercontent.com' },
    ],
  },
  eslint: { ignoreDuringBuilds: true },
};

module.exports = nextConfig;
