const Code = require('code');
const Lab = require('lab');

const { before, describe, it } = exports.lab = Lab.script(); // eslint-disable-line
const { expect } = Code;

const { loginAs } = require('../../../testHelpers');
const { registeredUserMocks } = require('../../../../db/mocks/auth');
const API = require('../../../apiWrapper');

const firstUser = { ...registeredUserMocks[0], password: 'password' };
const path = '/auth/user';

describe('API Route: GET Auth -> User', () => {
  describe('with valid token', () => {
    let testUser;
    let token;

    it('logs in as user #1', async() => {
      testUser = await loginAs(firstUser);
      token = testUser.token; // eslint-disable-line
    });

    it('responds with correct user data', async() => {
      const res = await API.get(path, token);
      const { data: { error, user } } = res;
      expect(error).to.be.undefined();
      expect(user).to.be.an.object();
      expect(user.id).to.equal(testUser.id);
      expect(user.email).to.equal(testUser.email);
      expect(user.created_at).to.equal(testUser.created_at);
      expect(user.updated_at).to.equal(testUser.updated_at);
      expect(user.password).to.be.undefined();
      expect(user.token).to.be.undefined();
    });
  });

  describe('with invalid token', () => {
    it('responds with an appropriate error message if token is invalid', async() => {
      const res = await API.get(path, 'invalid_token');
      const { data: { error, user }, response } = res;
      expect(user).to.be.undefined();
      expect(response).to.be.an.object();
      expect(response.status).to.equal(401);
      expect(error).to.be.an.object();
      expect(error.statusCode).to.equal(401);
    });

    it('responds with an appropriate error message if token is missing', async() => {
      const res = await API.get(path);
      const { data: { error, user }, response } = res;
      expect(user).to.be.undefined();
      expect(response).to.be.an.object();
      expect(response.status).to.equal(401);
      expect(error).to.be.an.object();
      expect(error.statusCode).to.equal(401);
    });
  });
});
