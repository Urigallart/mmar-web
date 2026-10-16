import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 92],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.mmarcoach.com" }],
        destination: "https://mmarcoach.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
