import type { NextConfig } from 'next';

const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const repositoryBasePath = '/vladimir-portfolio';

const nextConfig: NextConfig = isGitHubPages
  ? {
      output: 'export',
      basePath: repositoryBasePath,
      assetPrefix: repositoryBasePath,
      trailingSlash: true,
      images: { unoptimized: true },
    }
  : {};

export default nextConfig;
