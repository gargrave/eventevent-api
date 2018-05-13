const Code = require('code');
const Lab = require('lab');

const { before, describe, it } = exports.lab = Lab.script(); // eslint-disable-line
const { expect } = Code;

const { isValidUser } = require('../../../../api/v1/validators/auth');
const { registeredUserMocks } = require('../../../../db/mocks/auth');
const API = require('../../../apiWrapper');

const path = '/auth/login';
const firstUser = {
  ...registeredUserMocks[0],
  password: 'password',
};

describe('API Route: POST User -> Login', () => {
  describe('with valid payload', () => {
    it('should successfully authenticate as the specified user', async() => {
      const loginRes = await API.post(path, firstUser);
      const { user } = loginRes.data;
      const valid = isValidUser(user);
      expect(valid.error).to.equal(null);
      expect(valid.value).to.be.an.object();
      expect(user.password).to.be.undefined();
      expect(user.token).to.be.a.string();
    });
  });

  describe('with non-existent user', () => {
    it('should return an appropriate error if the email does not exist', async() => {
      const badUser = { email: 'kldsjfoiwjf@lksdjf.com', password: 'password' };
      const loginRes = await API.post(path, badUser);
      const { error } = loginRes.data;
      expect(error).to.be.an.object();
      expect(error.statusCode).to.equal(404);
    });
  });

  describe('with invalid password', () => {
    it('should return an appropriate error if the password is incorrect', async() => {
      const badUser = { email: firstUser.email, password: 'wrongpassword' };
      const loginRes = await API.post(path, badUser);
      const { error } = loginRes.data;
      expect(error).to.be.an.object();
      expect(error.statusCode).to.equal(401);
    });
  });
});
