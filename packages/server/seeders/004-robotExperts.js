"use strict";
const faker = require("faker");
const { generateUniqueList } = require("../seedersUtils");
const { seedValue, seedRowCounts } = require("../src/config/seeders");

const TABLE_NAME = "sl_robot_experts";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    faker.seed(seedValue);

    const data = [];

    for (let robotId = 1; robotId <= seedRowCounts.robots; robotId += 1) {
      const size = faker.random.number({ min: 1, max: seedRowCounts.maxExpertsPerRobot });
      const uniqueStaffMembersIds = generateUniqueList(size, () =>
        faker.random.number({ min: 1, max: seedRowCounts.staffMembers })
      );

      uniqueStaffMembersIds.forEach((staffMemberId) => {
        data.push({ id: data.length + 1, robotId, staffMemberId });
      });
    }

    await queryInterface.bulkInsert(TABLE_NAME, data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(TABLE_NAME, null, {});
  },
};
