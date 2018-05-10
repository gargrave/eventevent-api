const config = {
  port: process.env.port || 3001,
  router: {
    stripTrailingSlash: true,
  },
};

module.exports = config;
