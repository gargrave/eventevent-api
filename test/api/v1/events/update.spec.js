const Code = require('code');
const Lab = require('lab');

const { before, describe, it } = exports.lab = Lab.script(); // eslint-disable-line
const { expect } = Code;

const isValidEvent = require('../../../../api/v1/validators/events').isValid;
const API = require('../../../apiWrapper');

const path = '/events';

describe('Api Route: Put | PATCH Event -> Update', () => {
  describe('with valid payload', () => {
    it.skip('should correctly update an event when payload is valid', async() => {
      const res = await API.get(`${path}/5`);
      const { event } = res.data;
      const originalEvent = { ...event };
      event.title = `This is the Updated Title-${Math.random()}`;

      const updateRes = await API.put(`${path}/5`, event);
      const updated = updateRes.data.event;

      isValidEvent(event, (err, value) => {
        expect(err).to.equal(null);
        expect(value).to.be.an.object();
      });
      expect(updated.title).to.equal(event.title);
      expect(updated.title).not.to.equal(originalEvent.title);
      expect(updated.date).to.equal(originalEvent.date);
      expect(updated.created_at).to.equal(originalEvent.created_at);
      expect(updated.updated_at).not.to.equal(originalEvent.updated_at);
    });
  });

  // describe('invalid "title" field', () => {
  //   it('should reject a payload with missing title', async() => {
  //     const payload = randomLoremEvent();
  //     delete payload.title;
  //     const { data: { event, error } } = await API.post(path, payload);
  //     expect(event).to.equal(undefined);
  //     expect(error.statusCode).to.equal(400);
  //   });

  //   it('should reject a payload with empty title', async() => {
  //     const payload = randomLoremEvent();
  //     payload.title = '';
  //     const { data: { event, error } } = await API.post(path, payload);
  //     expect(event).to.equal(undefined);
  //     expect(error.statusCode).to.equal(400);
  //   });
  // });

  // describe('invalid "date" field', () => {
  //   it('should reject a payload with missing date', async() => {
  //     const payload = randomLoremEvent();
  //     delete payload.date;
  //     const { data: { event, error } } = await API.post(path, payload);
  //     expect(event).to.equal(undefined);
  //     expect(error.statusCode).to.equal(400);
  //   });

  //   it('should reject a payload with empty date', async() => {
  //     const payload = randomLoremEvent();
  //     payload.date = '';
  //     const { data: { event, error } } = await API.post(path, payload);
  //     expect(event).to.equal(undefined);
  //     expect(error.statusCode).to.equal(400);
  //   });

  //   it('should reject a payload with ill-formatted date', async() => {
  //     const payload = randomLoremEvent();
  //     payload.date = 'April 11';
  //     const { data: { event, error } } = await API.post(path, payload);
  //     expect(event).to.equal(undefined);
  //     expect(error.statusCode).to.equal(400);
  //   });
  // });
});
