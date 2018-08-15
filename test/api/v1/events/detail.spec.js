const Code = require('code');
const Lab = require('lab');

const { before, describe, it } = exports.lab = Lab.script(); // eslint-disable-line
const { expect } = Code;

const isValidEvent = require('../../../../api/v1/validators/events').isValid;
const { registeredUserMocks } = require('../../../../db/mocks/auth');
const { loginAs, findOwnedRecord } = require('../../../testHelpers');
const API = require('../../../apiWrapper');

const firstUser = { ...registeredUserMocks[0], password: 'password' };
const secondUser = { ...registeredUserMocks[1], password: 'password' };
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
    let user;
    let token;

    it('logs in as user #1', async() => {
      user = await loginAs(firstUser);
      token = user.token; // eslint-disable-line
    });

    it('responds with a single valid event', async() => {
      const ownedEvent = await findOwnedRecord('events', token);
      const res = await API.get(`${path}/${ownedEvent.id}`, token);
      expect(res.statusCode).to.equal(200);
      const { event } = res.data;
      isValidEvent(event, (err, value) => {
        expect(err).to.equal(null);
        expect(value).to.be.an.object();
      });
    });

    it('includes the correct data in the event', async() => {
      const ownedEvent = await findOwnedRecord('events', token);
      const res = await API.get(`${path}/${ownedEvent.id}`, token);
      const { event } = res.data;
      expect(event.id).to.be.a.number();
      expect(event.owner_id).to.be.a.number();
      expect(event.title).to.be.a.string();
      expect(event.date).to.be.a.string();
      expect(event.created_at).to.be.a.string();
      expect(event.updated_at).to.be.a.string();
    });

    it('responds with a 404 if no object matches ID', async() => {
      const res = await API.get(`${path}/9999999`, token);
      const { event, error } = res.data;
      expect(event).to.equal(undefined);
      expect(error).to.be.an.object();
      expect(error.statusCode).to.equal(404);
    });

    it('returns a 404 error if trying to get another user\'s object', async() => {
      const ownedEvent = await findOwnedRecord('events', token);

      // now get a token for user #2
      user = await loginAs(secondUser);
      token = user.token; // eslint-disable-line

      // and try to delete user #1's entry
      const deleteRes = await API.del(`${path}/${ownedEvent.id}`, token);
      const { event, error } = deleteRes.data;
      expect(event).to.be.undefined();
      expect(error.statusCode).to.equal(404);
    });
  });
});
