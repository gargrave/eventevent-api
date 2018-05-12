const Code = require('code');
const Lab = require('lab');

const { before, describe, it } = exports.lab = Lab.script(); // eslint-disable-line
const { expect } = Code;

const isValidEvent = require('../../../../api/v1/validators/events').isValid;
const { randomLoremEvent } = require('../../../../db/mocks/events');
const API = require('../../../apiWrapper');

const path = '/events';

describe('Api Route: POST Event -> Create', () => {
  describe('with valid payload', () => {
    it('should correctly create an event when payload is valid', async() => {
      const res1 = await API.get(path);
      const originalEvents = res1.data.events;

      const createRes = await API.post(path, randomLoremEvent());
      const { event } = createRes.data;
      isValidEvent(event, (err, value) => {
        expect(err).to.equal(null);
        expect(value).to.be.an.object();
      });

      const res2 = await API.get(path);
      const updatedEvents = res2.data.events;
      expect(updatedEvents.length).to.equal(originalEvents.length + 1);
    });
  });

  describe('invalid "title" field', () => {
    it('should reject a payload with missing title', async() => {
      const payload = randomLoremEvent();
      delete payload.title;
      const { data: { event, error } } = await API.post(path, payload);
      expect(event).to.equal(undefined);
      expect(error.statusCode).to.equal(400);
    });

    it('should reject a payload with empty title', async() => {
      const payload = randomLoremEvent();
      payload.title = '';
      const { data: { event, error } } = await API.post(path, payload);
      expect(event).to.equal(undefined);
      expect(error.statusCode).to.equal(400);
    });
  });

  describe('invalid "date" field', () => {
    it('should reject a payload with missing date', async() => {
      const payload = randomLoremEvent();
      delete payload.date;
      const { data: { event, error } } = await API.post(path, payload);
      expect(event).to.equal(undefined);
      expect(error.statusCode).to.equal(400);
    });

    it('should reject a payload with empty date', async() => {
      const payload = randomLoremEvent();
      payload.date = '';
      const { data: { event, error } } = await API.post(path, payload);
      expect(event).to.equal(undefined);
      expect(error.statusCode).to.equal(400);
    });

    it('should reject a payload with ill-formatted date', async() => {
      const payload = randomLoremEvent();
      payload.date = 'April 11';
      const { data: { event, error } } = await API.post(path, payload);
      expect(event).to.equal(undefined);
      expect(error.statusCode).to.equal(400);
    });
  });
});
