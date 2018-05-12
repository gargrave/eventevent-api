const Code = require('code');
const Lab = require('lab');

const { before, describe, it } = exports.lab = Lab.script(); // eslint-disable-line
const { expect } = Code;

const isValidEvent = require('../../../../api/v1/validators/events').isValid;
const API = require('../../../apiWrapper');

const path = '/events';

describe('Api Route: GET Event -> Detail', () => {
  it('should respond with a single valid event', async() => {
    const res = await API.get(`${path}/3`);
    const { event } = res.data;
    isValidEvent(event, (err, value) => {
      expect(err).to.equal(null);
      expect(value).to.be.an.object();
    });
  });

  it('should respond with a 400 if no object matches ID', async() => {
    const res = await API.get(`${path}/9999999`);
    const { error } = res.data;
    expect(error).to.be.an.object();
    expect(error.error).to.be.a.string();
    expect(error.message).to.be.a.string();
    expect(error.statusCode).to.equal(400);
  });
});
