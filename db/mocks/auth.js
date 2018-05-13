const faker = require('faker'); // eslint-disable-line

const validSignupData = () => ({
  email: faker.internet.email(),
  password: 'password',
  passwordConfirm: 'password',
});

module.exports = {
  validSignupData,
};
