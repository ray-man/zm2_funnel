"use strict";
const faker = require("faker");
const { seedValue, seedRowCounts, features } = require("../src/config/seeders");

const TABLE_NAME = "sl_robot_features";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    faker.seed(seedValue);

    const data = [];

    const allFeaturesIds = features.map((_, index) => index + 1);

    for (let robotId = 1; robotId <= seedRowCounts.robots; robotId += 1) {
      const randomFeaturesIds = faker.helpers.shuffle(allFeaturesIds);

      const size = faker.random.number({ min: 1, max: seedRowCounts.maxFeaturesPerRobot });
      const uniqueFeaturesIds = randomFeaturesIds.slice(0, size);

      uniqueFeaturesIds.forEach((featureId) => {
        data.push({ id: data.length + 1, robotId, featureId });
      });
    }

    await queryInterface.bulkInsert(TABLE_NAME, data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(TABLE_NAME, null, {});
  },
};
