const bcrypt = require('bcryptjs');
const faker = require('faker'); // eslint-disable-line

const MOCK_PASSWORD = bcrypt.hashSync('password', 10);
const registeredUserMocks = [
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
  registeredUserMocks,
  validSignupData,
};
