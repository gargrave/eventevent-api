const Code = require('code');
const Lab = require('lab');

const { before, describe, it } = exports.lab = Lab.script(); // eslint-disable-line
const { expect } = Code;

const isValidEvent = require('../../../../api/v1/validators/events').isValid;
const { registeredUserMocks } = require('../../../../db/mocks/auth');
const API = require('../../../apiWrapper');

const firstUser = { ...registeredUserMocks[0], password: 'password' };
const path = '/events';

describe('API Route: DELETE Event -> Delete', () => {
  describe('when not authenticated', async() => {
    it('responds with a 401 error', async() => {
      const res = await API.del(`${path}/${1}`);
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

    it('correctly deletes an event', async() => {
      const res1 = await API.get(path, token);
      const originalEvents = res1.data.events;

      const deleteRes = await API.del(`${path}/${1}`, token);
      const { event } = deleteRes.data;
      isValidEvent(event, (err, value) => {
        expect(err).to.equal(null);
        expect(value).to.be.an.object();
      });

      const res2 = await API.get(path, token);
      const updatedEvents = res2.data.events;
      expect(updatedEvents.length).to.equal(originalEvents.length - 1);
    });

    it('responds with a 404 if no object matches ID', async() => {
      const res = await API.del(`${path}/9999999`, token);
      const { error } = res.data;
      expect(error).to.be.an.object();
      expect(error.error).to.be.a.string();
      expect(error.message).to.be.a.string();
      expect(error.statusCode).to.equal(404);
    });

    it('returns a 401 error if trying to delete another user\'s object');
  });
});
