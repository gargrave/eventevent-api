const Code = require('code');
const Lab = require('lab');

const { before, describe, it } = exports.lab = Lab.script(); // eslint-disable-line
const { expect } = Code;

const { registeredUserMocks } = require('../../../../db/mocks/auth');
const API = require('../../../apiWrapper');

const firstUser = { ...registeredUserMocks[0], password: 'password' };
const path = '/events';

describe('API Route: GET Events -> List', () => {
  describe('when not authenticated', async() => {
    it('responds with a 401 error', async() => {
      const res = await API.get(path);
      const { events, error } = res.data;
      expect(events).to.equal(undefined);
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

    it('responds with a list of events', async() => {
      const res = await API.get(path, token);
      const { events } = res.data;
      expect(events).to.be.an.array();
      expect(events.length).to.be.above(1);
    });
  });
});
