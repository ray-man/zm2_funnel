const { createLogger, stdSerializers } = require("bunyan");

const logger = createLogger({
  name: "sl-server",
  streams: [
    {
      level: "info",
      stream: process.stdout,
      serializers: stdSerializers,
    },
  ],
});

module.exports = logger;
