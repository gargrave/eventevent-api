const Code = require('code');
const Lab = require('lab');

const { before, describe, it } = exports.lab = Lab.script(); // eslint-disable-line
const { expect } = Code;

const isValidEvent = require('../../../../api/v1/validators/events').isValid;
const { registeredUserMocks } = require('../../../../db/mocks/auth');
const API = require('../../../apiWrapper');

const firstUser = { ...registeredUserMocks[0], password: 'password' };
const path = '/events';

describe('API Route: GET Event -> Detail', () => {
  describe('when not authenticated', async() => {
    it('responds with a 401 error', async() => {
      const res = await API.get(`${path}/3`);
      const { event, error } = res.data;
      expect(event).to.equal(undefined);
      expect(error.statusCode).to.equal(401);
    });
  });

  describe('when authenticated', () => {
    let token;

    it('logs in correctly', async() => {
      const loginRes = await API.post('/auth/login', firstUser);
      token = loginRes.data.user.token; // eslint-disable-line
      expect(token).not.to.be.undefined();
    });

    it('responds with a single valid event', async() => {
      const res = await API.get(`${path}/3`, token);
      const { event } = res.data;
      isValidEvent(event, (err, value) => {
        expect(err).to.equal(null);
        expect(value).to.be.an.object();
      });
    });

    it('responds with a 404 if no object matches ID', async() => {
      const res = await API.get(`${path}/9999999`, token);
      const { event, error } = res.data;
      expect(event).to.equal(undefined);
      expect(error).to.be.an.object();
      expect(error.statusCode).to.equal(404);
    });

    it('responds with a 401 error if the object belongs to another user');
  });
});
