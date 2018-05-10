/* eslint-disable no-console */

const Hapi = require('hapi');
const Blipp = require('blipp');

// Create a server with a host and port
const server = Hapi.server({
  host: 'localhost',
  port: 3001,
});

(async() => {
  await server.register(Blipp);
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

