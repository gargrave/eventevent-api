/* eslint-disable no-console */
const Glue = require('glue');

const manifest = require('./manifest');
const routes = require('../api/routes');

const knex = require('../db');

const API_ROOT = '../api';

exports.startServer = async(startNow) => {
  const server = await Glue.compose(manifest, { relativeTo: __dirname });
  await server.initialize();
  routes(API_ROOT).forEach(r => server.route(require(r))); // eslint-disable-line

  if (!startNow) {
    return server;
  }

  // Start the server
  try {
    await server.start();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }

  console.log('Server running at:', server.info.uri);
  return server;
};

if (!module.parent) {
  exports.startServer(true);
  process.on('unhandledRejection', (err) => {
    throw err;
  });
}
