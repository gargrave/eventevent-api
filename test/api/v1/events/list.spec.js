const Code = require('code');
const Lab = require('lab');

const { describe, it } = exports.lab = Lab.script(); // eslint-disable-line
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
    let user;
    let token;

    it('logs in correctly', async() => {
      const loginRes = await API.post('/auth/login', firstUser);
      user = loginRes.data.user; // eslint-disable-line
      token = loginRes.data.user.token; // eslint-disable-line
      expect(token).not.to.be.undefined();
    });

    it('responds with a list of only the current user\'s events', async() => {
      const res = await API.get(path, token);
      expect(res.statusCode).to.equal(200);
      const { events } = res.data;
      const unownedEvents = events.filter(e => e.owner_id !== user.id);
      expect(events).to.be.an.array();
      expect(events.length).to.be.above(0);
      expect(unownedEvents.length).to.equal(0);
    });

    it('includes the correct data in the events', async() => {
      const res = await API.get(path, token);
      const { events } = res.data;
      const [event] = events;
      expect(event.id).to.be.a.number();
      expect(event.owner_id).to.be.a.number();
      expect(event.title).to.be.a.string();
      expect(event.date).to.be.a.string();
      expect(event.created_at).to.be.a.string();
      expect(event.updated_at).to.be.a.string();
    });
  });
});
