const Code = require('code');
const Lab = require('lab');

const { before, describe, it } = exports.lab = Lab.script(); // eslint-disable-line
const { expect } = Code;

const Server = require('../server');
const envVars = require('../env/test');

describe('Server setup', () => {
  let server;

  before(async() => {
    server = await Server.startServer(true);
  });

  it('starts up and listens as expected', async() => {
    expect(server).to.not.be.undefined();
    expect(server.info && server.info.host).to.not.be.undefined();
  });

  it('should have a valid database URL', async() => {
    expect(process.env.DATABASE_URL).to.not.be.undefined();
    expect(process.env.DATABASE_URL).to.equal(envVars.DATABASE_URL);
  });
});
