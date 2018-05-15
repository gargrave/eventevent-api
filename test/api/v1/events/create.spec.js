const Code = require('code');
const Lab = require('lab');

const { before, describe, it } = exports.lab = Lab.script(); // eslint-disable-line
const { expect } = Code;

const isValidEvent = require('../../../../api/v1/validators/events').isValid;
const { registeredUserMocks } = require('../../../../db/mocks/auth');
const { randomLoremEvent } = require('../../../../db/mocks/events');
const { loginAs } = require('../../../testHelpers');
const API = require('../../../apiWrapper');

const firstUser = { ...registeredUserMocks[0], password: 'password' };
const path = '/events';

describe('API Route: POST Event -> Create', () => {
  describe('when not authenticated', async() => {
    it('responds with a 401 error', async() => {
      const res = await API.post(path, randomLoremEvent());
      const { events, error } = res.data;
      expect(events).to.equal(undefined);
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

    describe('with valid payload', () => {
      it('correctly creates an event', async() => {
        const listRes = await API.get(path, token);
        const originalEvents = listRes.data.events;

        const createRes = await API.post(
          path, randomLoremEvent(), token
        );
        expect(createRes.statusCode).to.equal(201);
        const { event } = createRes.data;
        const { value, error } = isValidEvent(event);
        expect(error).to.equal(null);
        expect(value).to.be.an.object();
        expect(event.id).to.be.a.number();
        expect(event.title).to.be.a.string();
        expect(event.date).to.be.a.string();
        expect(event.created_at).to.be.a.string();
        expect(event.updated_at).to.be.a.string();
        expect(event.owner_id).to.be.undefined();

        const listRes2 = await API.get(path, token);
        const updatedEvents = listRes2.data.events;
        expect(updatedEvents.length).to.equal(originalEvents.length + 1);
      });
    });

    describe('with invalid "title" field', () => {
      it('rejects a payload with missing title', async() => {
        const payload = randomLoremEvent();
        delete payload.title;

        const res = await API.post(path, payload, token);
        const { event, error } = res.data;

        expect(event).to.equal(undefined);
        expect(error.statusCode).to.equal(400);
      });

      it('rejects a payload with empty title', async() => {
        const payload = randomLoremEvent();
        payload.title = '';

        const res = await API.post(path, payload, token);
        const { event, error } = res.data;

        expect(event).to.equal(undefined);
        expect(error.statusCode).to.equal(400);
      });
    });

    describe('with invalid "date" field', () => {
      it('rejects a payload with missing date', async() => {
        const payload = randomLoremEvent();
        delete payload.date;

        const res = await API.post(path, payload, token);
        const { event, error } = res.data;

        expect(event).to.equal(undefined);
        expect(error.statusCode).to.equal(400);
      });

      it('rejects a payload with empty date', async() => {
        const payload = randomLoremEvent();
        payload.date = '';

        const res = await API.post(path, payload, token);
        const { event, error } = res.data;

        expect(event).to.equal(undefined);
        expect(error.statusCode).to.equal(400);
      });

      it('rejects a payload with ill-formatted date', async() => {
        const payload = randomLoremEvent();
        payload.date = 'April 11';

        const res = await API.post(path, payload, token);
        const { event, error } = res.data;

        expect(event).to.equal(undefined);
        expect(error.statusCode).to.equal(400);
      });
    });
  });
});
