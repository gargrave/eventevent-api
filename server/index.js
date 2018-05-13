/* eslint-disable no-console */
const { verboseLog } = require('../utils/logger');
const { isNotProd } = require('../utils/env');
if (isNotProd()) {
  verboseLog(`Loading local env. vars for: ${process.env.NODE_ENV}`);
  const env = require('../env'); // eslint-disable-line
}

const Glue = require('glue');

const manifest = require('./manifest');
const routes = require('../api/v1/routes');

async function validate(decoded, request) {
  // if (!people[decoded.id]) {
  //   return { isValid: false };
  // }
  // else {
  //   return { isValid: true };
  // }
  return { isValid: true };
}

exports.startServer = async(startNow) => {
  const server = await Glue.compose(manifest, { relativeTo: __dirname });
  await server.initialize();

  // set up JWT auth
  await server.register(require('hapi-auth-jwt2')); // eslint-disable-line
  server.auth.strategy('jwt', 'jwt', {
    key: process.env.AUTH_SECRET_KEY,
    validate,
    verifyOptions: {
      algorithms: ['HS256'],
    },
  });
  server.auth.default('jwt');

  routes().forEach(r => server.route(require(r))); // eslint-disable-line

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
