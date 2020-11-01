"use strict";
const faker = require("faker");
const { generateUniqueList } = require("../seedersUtils");
const { seedValue, seedRowCounts } = require("../src/config/seeders");

const TABLE_NAME = "sl_robots";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    faker.seed(seedValue);

    const uniqueNames = generateUniqueList(seedRowCounts.robots, () => faker.company.catchPhrase());
    const data = uniqueNames.map((name, index) => ({
      id: index + 1,
      name,
      type: faker.random.arrayElement(["cleaning", "kitchen", "warehouse"]),
      autonomy: faker.random.number({ min: 1, max: 72 }),
      weight: faker.random.arrayElement([1, 5, 8, 14, 25, 50]),
      price: faker.random.arrayElement([1, 2, 3, 5, 8, 13]) * 1000000,
      brandId: faker.random.number({ min: 1, max: seedRowCounts.brands }),
    }));

    await queryInterface.bulkInsert(TABLE_NAME, data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(TABLE_NAME, null, {});
  },
};
