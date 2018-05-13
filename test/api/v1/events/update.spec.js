const Code = require('code');
const Lab = require('lab');

const { before, describe, it } = exports.lab = Lab.script(); // eslint-disable-line
const { expect } = Code;

const isValidEvent = require('../../../../api/v1/validators/events').isValid;
const { registeredUserMocks } = require('../../../../db/mocks/auth');
const API = require('../../../apiWrapper');

const firstUser = { ...registeredUserMocks[0], password: 'password' };
const path = '/events';

describe('API Route: Put | PATCH Event -> Update', () => {
  describe('when authenticated', () => {
    let token;

    it('logs in correctly', async() => {
      const loginRes = await API.post('/auth/login', firstUser);
      token = loginRes.data.user.token; // eslint-disable-line
      expect(token).not.to.be.undefined();
    });

    describe('with valid payload', () => {
      it('correctly updates an event when payload is valid', async() => {
        const res = await API.get(`${path}/5`, token);
        const { event } = res.data;
        const originalEvent = { ...event };
        event.title = `This is the Updated Title-${Math.random()}`;

        const updateRes = await API.put(`${path}/5`, event, token);
        const updated = updateRes.data.event;

        isValidEvent(event, (err, value) => {
          expect(err).to.equal(null);
          expect(value).to.be.an.object();
        });
        expect(updated.title).to.equal(event.title);
        expect(updated.title).not.to.equal(originalEvent.title);
        expect(updated.date).to.equal(originalEvent.date);
        expect(updated.created_at).to.equal(originalEvent.created_at);
        // expect(updated.updated_at).not.to.equal(originalEvent.updated_at);
      });
    });

    describe('invalid "title" field', () => {
      it('rejects a payload with missing title');

      it('rejects a payload with empty title');
    });

    describe('invalid "date" field', () => {
      it('rejects a payload with missing date');

      it('rejects a payload with empty date');

      it('rejects a payload with ill-formatted date');
    });
  });
});
