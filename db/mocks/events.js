const faker = require('faker'); // eslint-disable-line

const getOwnerId = range =>
  Math.floor(Math.random() * range) + 1;

const randomEvents = (titleGen, len = 20) =>
  Array(len).fill(0).map(() => ({
    owner_id: getOwnerId(3),
    title: titleGen(),
    date: faker.date.future(),
  }));

const data = [
  ...randomEvents(faker.company.catchPhrase, 20),
  ...randomEvents(faker.lorem.sentence, 20),
];

module.exports = {
  data,

  randomLoremEvent: () =>
    randomEvents(faker.lorem.sentence, 1)[0],
};
