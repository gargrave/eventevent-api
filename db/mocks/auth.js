const bcrypt = require('bcryptjs');
const faker = require('faker'); // eslint-disable-line

const MOCK_PASSWORD = bcrypt.hashSync('password', 10);

const randomUsers = (len = 10) =>
  Array(len).fill(0).map(() => ({
    email: faker.internet.email(),
    password: MOCK_PASSWORD,
  }));

const validSignupData = () => ({
  email: faker.internet.email(),
  password: 'password',
  passwordConfirm: 'password',
});

module.exports = {
  randomUsers,
  validSignupData,
};
