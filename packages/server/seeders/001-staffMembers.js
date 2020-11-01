"use strict";
const faker = require("faker");
const { generateUniqueList } = require("../seedersUtils");
const { seedValue, seedRowCounts } = require("../src/config/seeders");

const TABLE_NAME = "sl_staff_members";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    faker.seed(seedValue);

    const uniqueNames = generateUniqueList(
      seedRowCounts.staffMembers,
      () => `${faker.name.firstName()} ${faker.name.lastName()}`
    );
    const data = uniqueNames.map((name, index) => ({
      id: index + 1,
      name,
      email: `${name.split(" ").join(".")}@example.com`,
    }));

    await queryInterface.bulkInsert(TABLE_NAME, data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(TABLE_NAME, null, {});
  },
};
