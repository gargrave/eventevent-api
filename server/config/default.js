const cors = process.env.CORS_WHITELIST || '';

const config = {
  server: {
    port: process.env.port || 3001,
    router: {
      stripTrailingSlash: true,
    },
    routes: {
      cors: { origin: cors.split(',') },
    },
  },
  register: {
    plugins: [],
  },
};

module.exports = config;
