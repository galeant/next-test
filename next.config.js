const withImages = require('next-images');

const redirects = {
  async redirects() {
    return [
      {
        source: '/dashboards',
        destination: '/dashboards/crypto',
        permanent: true
      }
    ];
  }
};

module.exports = withImages(redirects);


// const nextConfig = {
//   output: 'export',
//   // Optional: Add a trailing slash to all paths `/about` -> `/about/`
//   // trailingSlash: true,
//   // Optional: Change the output directory `out` -> `dist`
//   // distDir: 'dist',
// }
// module.exports = nextConfig