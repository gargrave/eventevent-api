const config = {
  server: {
    port: process.env.port || 3001,
    router: {
      stripTrailingSlash: true,
    },
  },
  register: {
    plugins: [],
  },
};

module.exports = config;
