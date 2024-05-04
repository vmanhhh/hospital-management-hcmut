/**
 * @type {import('next').NextConfig}
 */
 const nextConfig = {
  basePath: "",
  async redirects() {
    return [
      {
          source: '/',
          destination: '/',
          basePath: false,
          permanent: false
      }
    ]
  },
}

export default nextConfig