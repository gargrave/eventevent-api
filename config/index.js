/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const defaultConfig = require('./default');
const envConfig = require(`./${process.env.NODE_ENV}`) || {};

const config = {
  ...defaultConfig,
  ...envConfig,
};

module.exports = config;
