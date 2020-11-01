"use strict";
const faker = require("faker");
const { seedValue, features } = require("../src/config/seeders");

const TABLE_NAME = "sl_features";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    faker.seed(seedValue);

    const data = features.map((name, index) => ({ id: index + 1, name }));

    await queryInterface.bulkInsert(TABLE_NAME, data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(TABLE_NAME, null, {});
  },
};
