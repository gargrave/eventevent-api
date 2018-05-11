/* eslint-disable no-console */
const Glue = require('glue');

const manifest = require('./manifest');

exports.startServer = async(startNow) => {
  const server = await Glue.compose(manifest, { relativeTo: __dirname });
  await server.initialize();

  server.route({
    method: 'GET',
    path: '/hello',
    handler: (request, h) => (
      { data: { message: 'hello world' } }
    ),
  });

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
