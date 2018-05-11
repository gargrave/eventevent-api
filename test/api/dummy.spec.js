const Code = require('code');
const Lab = require('lab');

const { before, describe, it } = exports.lab = Lab.script(); // eslint-disable-line
const { expect } = Code;

const API = require('../apiWrapper');

describe('Server setup', () => {
  it('should return "hello world"', async() => {
    const res = await API.get('/hello');
    expect(res.message).to.equal('hello world');
  });
});
