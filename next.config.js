const { NextFederationPlugin } = require("@module-federation/nextjs-mf");

/** @type {import('next').NextConfig} */
const nextConfig = {

  webpack(config) {

    config.plugins.push(
        new NextFederationPlugin({
          name: 'catalogo',
          filename: 'static/chunks/remoteEntry.js',
          exposes: {
            './Catalogo': './src/components/Catalogo',
          },
          shared: {
            react: { singleton: true, eager: true, requiredVersion:false },
            'react-dom': { singleton: true, eager: true, requiredVersion:false }
          },
        })
      );
    return config;
  },
  reactStrictMode: true,
};

module.exports = nextConfig;