const path = require("path");
const dotenv = require("dotenv");
const logger = require("../logger");

const isCLI = process.env.CLI === "true";
const envFile = isCLI ? ".env.cli" : ".env";

dotenv.config({ path: path.resolve(__dirname, "../..", envFile) });

module.exports = {
  development: {
    username: process.env.MYSQL_ROOT_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT, 10) || 3306,
    dialect: "mysql",
    operatorsAliases: true,
    logging: process.env.DB_LOGGING === "true" ? (message) => logger.info(message) : false,
  },
  test: {
    username: process.env.MYSQL_ROOT_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: "sldbtest",
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT, 10) || 3306,
    dialect: "mysql",
    operatorsAliases: true,
    logging: false,
  },
};
