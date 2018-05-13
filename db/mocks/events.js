const faker = require('faker'); // eslint-disable-line

const randomEvents = (titleGen, len = 20) =>
  Array(len).fill(0).map(() => ({
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
