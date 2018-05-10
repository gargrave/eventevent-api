/* eslint-disable no-console */
const Glue = require('glue');

const manifest = require('./manifest');

(async() => {
  const server = await Glue.compose(manifest, { relativeTo: __dirname });
  await server.initialize();

  server.route({
    method: 'GET',
    path: '/hello',
    handler: (request, h) => (
      { data: { message: 'hello world' } }
    ),
  });

  // Start the server
  async function start() {
    try {
      await server.start();
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
    console.log('Server running at:', server.info.uri);
  }
  start();
})();

