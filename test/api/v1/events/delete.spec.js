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
    let user;
    let token;

    it('logs in as user 1', async() => {
      user = await loginAs(firstUser);
      token = user.token; // eslint-disable-line
    });

    it('correctly deletes an event', async() => {
      const res1 = await API.get(path, token);
      const originalEvents = res1.data.events;
      const { id } = originalEvents[0];

      const deleteRes = await API.del(`${path}/${id}`, token);
      expect(deleteRes.statusCode).to.equal(200);
      const { event } = deleteRes.data;
      const { value, error } = isValidEvent(event);
      expect(error).to.equal(null);
      expect(value).to.be.an.object();
      expect(event.id).to.be.a.number();
      expect(event.owner_id).to.be.a.number();
      expect(event.title).to.be.a.string();
      expect(event.date).to.be.a.string();
      expect(event.created_at).to.be.a.string();
      expect(event.updated_at).to.be.a.string();

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

    it('returns a 404 error if trying to delete another user\'s object', async() => {
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
