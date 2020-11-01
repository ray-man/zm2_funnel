const mysql = require("mysql2/promise");
const config = require("../config/db");
const logger = require("../logger");
const syncdb = require("../syncdb");
const { sequelize, Sequelize } = require("../models");

const seeds = [
  require("../../seeders/001-staffMembers"),
  require("../../seeders/002-brands"),
  require("../../seeders/003-robots"),
  require("../../seeders/004-robotExperts"),
  require("../../seeders/005-features"),
  require("../../seeders/006-robotFeatures"),
];

const runSeeds = async () => {
  logger.info("Unseeding test database");
  for (let i = seeds.length - 1; i >= 0; i -= 1) {
    await seeds[i].down(sequelize.getQueryInterface(), Sequelize);
  }

  logger.info("Seeding test database");
  for (let i = 0; i < seeds.length - 1; i += 1) {
    await seeds[i].up(sequelize.getQueryInterface(), Sequelize);
  }
};

module.exports = async () => {
  logger.info("Setting up the test run");
  const connection = await mysql.createConnection({
    host: config.test.host,
    port: config.test.port,
    user: config.test.username,
    password: config.test.password,
  });

  await connection.query("DROP DATABASE IF EXISTS sldbtest");
  await connection.query("CREATE DATABASE IF NOT EXISTS sldbtest");

  logger.info("Replaced test database");

  await syncdb({ force: true });

  await runSeeds();

  await connection.close();

  logger.info("Finished setup for the test run");
};
