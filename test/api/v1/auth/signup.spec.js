const Code = require('code');
const Lab = require('lab');

const { before, describe, it } = exports.lab = Lab.script(); // eslint-disable-line
const { expect } = Code;

const { isValidUser } = require('../../../../api/v1/validators/auth');
const { validSignupData } = require('../../../../db/mocks/auth');
const API = require('../../../apiWrapper');

const path = '/auth/signup';
const firstUser = validSignupData();

describe('API Route: POST User -> Sign Up', () => {
  describe('with valid payload', () => {
    it('successfully creates a new User', async() => {
      const signupRes = await API.post(path, firstUser);
      const { user } = signupRes.data;
      const valid = isValidUser(user);
      expect(valid.error).to.equal(null);
      expect(valid.value).to.be.an.object();
    });
  });

  describe('with duplicate user', () => {
    it('rejects a user if email is already in use', async() => {
      const signupRes = await API.post(path, firstUser);
      const { error } = signupRes.data;
      expect(error).to.be.an.object();
      expect(error.statusCode).to.equal(400);
    });
  });

  describe('with invalid payload', () => {
    describe('email', () => {
      it('rejects a user if email is invalid', async() => {
        const user = validSignupData();
        user.email = 'skdjfuihasdf@lsjdf';
        const signupRes = await API.post(path, user);
        const { error } = signupRes.data;
        expect(error).to.be.an.object();
        expect(error.statusCode).to.equal(400);
      });

      it('rejects a user if email is missing', async() => {
        const user = validSignupData();
        delete user.email;
        const signupRes = await API.post(path, user);
        const { error } = signupRes.data;
        expect(error).to.be.an.object();
        expect(error.statusCode).to.equal(400);
      });
    });

    describe('testing passwords', () => {
      it('rejects a user if password if missing', async() => {
        const user = validSignupData();
        delete user.password;
        const signupRes = await API.post(path, user);
        const { error } = signupRes.data;
        expect(error).to.be.an.object();
        expect(error.statusCode).to.equal(400);
      });

      it('rejects a user if password if too short', async() => {
        const user = validSignupData();
        user.password = 'onos';
        const signupRes = await API.post(path, user);
        const { error } = signupRes.data;
        expect(error).to.be.an.object();
        expect(error.statusCode).to.equal(400);
      });

      it('rejects a user if passwords do not match', async() => {
        const user = validSignupData();
        user.passwordConfirm = 'nomatchy';
        const signupRes = await API.post(path, user);
        const { error } = signupRes.data;
        expect(error).to.be.an.object();
        expect(error.statusCode).to.equal(400);
      });
    });
  });
});
