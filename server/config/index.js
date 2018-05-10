/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const merge = require('lodash/merge');

const defaultConfig = require('./default');
const envConfig = require(`./${process.env.NODE_ENV}`) || {};

module.exports = merge(defaultConfig, envConfig);
