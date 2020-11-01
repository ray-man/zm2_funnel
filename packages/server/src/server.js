require("dotenv").config();

const http = require("http");

const app = require("./app");
const logger = require("./logger");
const syncdb = require("./syncdb");

process.on("unhandledRejection", (err) => {
  logger.error({ err }, "An unhandled promise rejection was found");
});

const onError = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  switch (error.code) {
    case "EACCES":
      logger.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      logger.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

syncdb().then(() => {
  const port = parseInt(process.env.PORT, 10) || 3000;
  app.set("port", port);

  const server = http.createServer(app);
  server.listen(port);
  server.on("error", onError);
  server.on("listening", () => {
    const addr = server.address();
    const bind = typeof addr === "string" ? "pipe: " + addr : "port: " + addr.port;
    logger.info("Server now listening on " + bind);
  });
});
