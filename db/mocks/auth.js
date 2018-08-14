const bcrypt = require('bcryptjs');
const faker = require('faker'); // eslint-disable-line

const HOSTABLE_USERS_RANGE = 3;
const REGISTERABLE_USERS_MIN = HOSTABLE_USERS_RANGE + 2;
const REGISTERABLE_USERS_RANGE = 3;

const MOCK_PASSWORD = bcrypt.hashSync('password', 10);
const registeredUserMocks = [
  { email: 'user1@example.com', password: MOCK_PASSWORD },
  { email: 'user2@example.com', password: MOCK_PASSWORD },
  { email: 'user3@example.com', password: MOCK_PASSWORD },
  { email: 'Jo.Auer@hotmail.com', password: MOCK_PASSWORD },
  { email: 'Ashley_Barton5@yahoo.com', password: MOCK_PASSWORD },
  { email: 'Ally87@gmail.com', password: MOCK_PASSWORD },
  { email: 'Gordon_Tromp@yahoo.com', password: MOCK_PASSWORD },
  { email: 'Rodger24@hotmail.com', password: MOCK_PASSWORD },
  { email: 'Furman78@hotmail.com', password: MOCK_PASSWORD },
  { email: 'Jasper.Spinka88@yahoo.com', password: MOCK_PASSWORD },
  { email: 'Dean88@hotmail.com', password: MOCK_PASSWORD },
  { email: 'Mavis49@hotmail.com', password: MOCK_PASSWORD },
  { email: 'Cecil.Walker54@gmail.com', password: MOCK_PASSWORD },
  { email: 'Hailie.Swift91@gmail.com', password: MOCK_PASSWORD },
];

const validSignupData = () => ({
  email: faker.internet.email(),
  password: 'password',
  passwordConfirm: 'password',
});

module.exports = {
  getHostableUserId: () =>
    Math.floor(Math.random() * HOSTABLE_USERS_RANGE) + 1,

  getRegisterableUserId: () =>
    Math.floor(Math.random() * REGISTERABLE_USERS_RANGE) + REGISTERABLE_USERS_MIN,

  registeredUserMocks,
  validSignupData,
};
