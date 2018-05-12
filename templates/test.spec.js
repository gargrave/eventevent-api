const Code = require('code');
const Lab = require('lab');

const { before, describe, it } = exports.lab = Lab.script(); // eslint-disable-line
const { expect } = Code;

describe('ThingWeAreTesting', () => {
  it('needs its first passing test', () => {
    expect(true).to.equal(true);
  });
});
