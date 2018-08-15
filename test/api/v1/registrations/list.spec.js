const Code = require('code');
const Lab = require('lab');

const { describe, it } = exports.lab = Lab.script(); // eslint-disable-line
const { expect } = Code;

const { getRegisterableUser } = require('../../../../db/mocks/auth');
const API = require('../../../apiWrapper');

const firstUser = { ...getRegisterableUser(), password: 'password' };
const path = '/registrations';

describe('API Route: GET Registrations -> List', () => {
  describe('when not authenticated', async() => {
    it('responds with a 401 error', async() => {
      const res = await API.get(path);
      const { registrations, error } = res.data;
      expect(registrations).to.equal(undefined);
      expect(error.statusCode).to.equal(401);
    });
  });

  describe('when authenticated', () => {
    let user;
    let token;

    it('logs in correctly', async() => {
      const loginRes = await API.post('/auth/login', firstUser);
      user = loginRes.data.user; // eslint-disable-line
      token = loginRes.data.user.token; // eslint-disable-line
      expect(token).not.to.be.undefined();
    });

    it('correctly fetches only the current user\'s registrations', async() => {
      const res = await API.get(path, token);
      const { registrations } = res.data;
      const unownedRegistrations = registrations.filter(
        r => r.user_id !== user.id,
      );

      expect(res.statusCode).to.equal(200);
      expect(registrations).to.be.an.array();
      expect(registrations.length).to.be.above(0);
      expect(unownedRegistrations.length).to.equal(0);
    });

    it('includes the correct data with the registrations', async() => {
      const res = await API.get(path, token);
      const { registrations } = res.data;
      const [firstReg] = registrations;

      expect(res.statusCode).to.equal(200);
      expect(registrations).to.be.an.array();
      expect(firstReg.user_id).to.be.a.number();
      expect(firstReg.id).to.be.a.number();
      expect(firstReg.registered_at).to.be.a.string();
      // check the embedded event data
      expect(firstReg.event.id).to.be.a.number();
      expect(firstReg.event).to.be.an.object();
      expect(firstReg.event.date).to.be.a.string();
      expect(firstReg.event.title).to.be.a.string();
    });
  });
});
