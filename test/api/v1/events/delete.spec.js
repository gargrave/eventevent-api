const Code = require('code');
const Lab = require('lab');

const { before, describe, it } = exports.lab = Lab.script(); // eslint-disable-line
const { expect } = Code;

const isValidEvent = require('../../../../api/v1/validators/events').isValid;
const API = require('../../../apiWrapper');

const path = '/events';

describe('Api Route: DELETE Event -> Delete', () => {
  it('should correctly delete an event', async() => {
    const res1 = await API.get(path);
    const originalEvents = res1.data.events;

    const deleteRes = await API.del(`${path}/${1}`);
    const { event } = deleteRes.data;
    isValidEvent(event, (err, value) => {
      expect(err).to.equal(null);
      expect(value).to.be.an.object();
    });

    const res2 = await API.get(path);
    const updatedEvents = res2.data.events;
    expect(updatedEvents.length).to.equal(originalEvents.length - 1);
  });

  it('should respond with a 400 if not object matches ID', async() => {
    const res = await API.del(`${path}/9999999`);
    const { error } = res.data;
    expect(error).to.be.an.object();
    expect(error.error).to.be.a.string();
    expect(error.message).to.be.a.string();
    expect(error.statusCode).to.equal(400);
  });
});
