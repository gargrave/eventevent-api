const Code = require('code');
const Lab = require('lab');

const { before, describe, it } = exports.lab = Lab.script(); // eslint-disable-line
const { expect } = Code;

const API = require('../../../apiWrapper');

const path = '/events';

describe('Api Route: GET Events -> List', () => {
  it('should respond with a list of events', async() => {
    const res = await API.get(path);
    const { events } = res.data;
    expect(events).to.be.an.array();
    expect(events.length).to.be.above(1);
  });
});
