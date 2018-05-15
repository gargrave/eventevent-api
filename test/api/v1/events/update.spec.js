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

describe('API Route: Put | PATCH Event -> Update', () => {
  describe('when authenticated', () => {
    let user;
    let token;

    it('logs in as user #1', async() => {
      user = await loginAs(firstUser);
      token = user.token; // eslint-disable-line
    });

    describe('with valid payload', () => {
      it('correctly updates an event', async() => {
        const ownedEvent = await findOwnedRecord('events', token);
        const event = { ...ownedEvent };
        event.title = `Updated Title-${Math.random()}`;

        const updateRes = await API.put(
          `${path}/${ownedEvent.id}`, event, token
        );
        const updated = updateRes.data.event;
        const { value, error } = isValidEvent(updated);
        expect(error).to.equal(null);
        expect(value).to.be.an.object();

        expect(updated.owner_id).to.be.undefined();
        expect(event.id).to.be.a.number(ownedEvent.id);
        expect(updated.title).to.equal(event.title);
        expect(updated.title).not.to.equal(ownedEvent.title);
        expect(updated.date).to.equal(ownedEvent.date);
        expect(updated.created_at).to.equal(ownedEvent.created_at);
        // expect(updated.updated_at).not.to.equal(ownedEvent.updated_at);
      });
    });

    describe('with invalid "title" field', () => {
      it('rejects a payload with empty title', async() => {
        const ownedEvent = await findOwnedRecord('events', token);
        ownedEvent.title = '';

        const res = await API.put(
          `${path}/${ownedEvent.id}`, ownedEvent, token
        );
        const { event, error } = res.data;

        expect(event).to.equal(undefined);
        expect(error.statusCode).to.equal(400);
      });
    });

    describe('with invalid "date" field', () => {
      it('rejects a payload with empty date', async() => {
        const ownedEvent = await findOwnedRecord('events', token);
        ownedEvent.date = '';

        const res = await API.put(
          `${path}/${ownedEvent.id}`, ownedEvent, token
        );
        const { event, error } = res.data;

        expect(event).to.equal(undefined);
        expect(error.statusCode).to.equal(400);
      });

      it('rejects a payload with ill-formatted date', async() => {
        const ownedEvent = await findOwnedRecord('events', token);
        ownedEvent.date = 'notactuallyadate';

        const res = await API.put(
          `${path}/${ownedEvent.id}`, ownedEvent, token
        );
        const { event, error } = res.data;

        expect(event).to.equal(undefined);
        expect(error.statusCode).to.equal(400);
      });
    });

    it('returns a 404 error if trying to update another user\'s object', async() => {
      const ownedEvent = await findOwnedRecord('events', token);

      // now get a token for user #2
      user = await loginAs(secondUser);
      token = user.token; // eslint-disable-line

      // and try to update user #1's entry
      const eventUpdate = {
        ...ownedEvent,
        title: `This is the Updated Title-${Math.random()}`,
      };

      const updateRes = await API.put(
        `${path}/${ownedEvent.id}`, eventUpdate, token
      );
      const { event, error } = updateRes.data;
      expect(event).to.be.undefined();
      expect(error.statusCode).to.equal(404);
    });
  });
});
