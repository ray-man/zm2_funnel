const { sequelize } = require("./models");
const logger = require("./logger");

const sleep = async (seconds) => {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });
};

const syncDB = async (options = {}) => {
  const { force = false } = options;

  try {
    await sequelize.authenticate();
    logger.info("Connection has been established successfully");

    await sequelize.sync({ force });
    logger.info("Synced models with DB");
  } catch (err) {
    const retryIn = 5; // seconds

    logger.error(
      { err },
      `There was an error while trying to sync models with the DB. Retrying in ${retryIn} seconds.`
    );

    await sleep(retryIn);
    await syncDB(options);
  }
};

module.exports = syncDB;
