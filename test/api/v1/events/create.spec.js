const Code = require('code');
const Lab = require('lab');

const { before, describe, it } = exports.lab = Lab.script(); // eslint-disable-line
const { expect } = Code;

const isValidEvent = require('../../../../api/v1/validators/events').isValid;
const { registeredUserMocks } = require('../../../../db/mocks/auth');
const { randomLoremEvent } = require('../../../../db/mocks/events');
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
    let token;

    it('logs in correctly', async() => {
      const loginRes = await API.post('/auth/login', firstUser);
      token = loginRes.data.user.token; // eslint-disable-line
      expect(token).not.to.be.undefined();
    });

    describe('with valid payload', () => {
      it('correctly creates an event', async() => {
        const res1 = await API.get(path, token);
        const originalEvents = res1.data.events;

        const createRes = await API.post(path, randomLoremEvent(), token);
        const { event } = createRes.data;
        isValidEvent(event, (err, value) => {
          expect(err).to.equal(null);
          expect(value).to.be.an.object();
        });

        const res2 = await API.get(path, token);
        const updatedEvents = res2.data.events;
        expect(updatedEvents.length).to.equal(originalEvents.length + 1);
      });
    });

    describe('with invalid "title" field', () => {
      it('rejects a payload with missing title', async() => {
        const payload = randomLoremEvent();
        delete payload.title;
        const { data: { event, error } } = await API.post(path, payload, token);
        expect(event).to.equal(undefined);
        expect(error.statusCode).to.equal(400);
      });

      it('rejects a payload with empty title', async() => {
        const payload = randomLoremEvent();
        payload.title = '';
        const { data: { event, error } } = await API.post(path, payload, token);
        expect(event).to.equal(undefined);
        expect(error.statusCode).to.equal(400);
      });
    });

    describe('with invalid "date" field', () => {
      it('rejects a payload with missing date', async() => {
        const payload = randomLoremEvent();
        delete payload.date;
        const { data: { event, error } } = await API.post(path, payload, token);
        expect(event).to.equal(undefined);
        expect(error.statusCode).to.equal(400);
      });

      it('rejects a payload with empty date', async() => {
        const payload = randomLoremEvent();
        payload.date = '';
        const { data: { event, error } } = await API.post(path, payload, token);
        expect(event).to.equal(undefined);
        expect(error.statusCode).to.equal(400);
      });

      it('rejects a payload with ill-formatted date', async() => {
        const payload = randomLoremEvent();
        payload.date = 'April 11';
        const { data: { event, error } } = await API.post(path, payload, token);
        expect(event).to.equal(undefined);
        expect(error.statusCode).to.equal(400);
      });
    });
  });
});
