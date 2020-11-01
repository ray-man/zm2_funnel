const robotsController = require("./controllers/robots");
const staffMembersController = require("./controllers/staffMembers");
const clientsController = require("./controllers/clients");
const infoController = require("./controllers/info");
const leadController = require("./controllers/leads");

const logger = require("./logger");

module.exports = (app) => {
  logger.info("Attaching routes to app");

  app.get("/api/", (request, response) => {
    response.status(200).send("Welcome to sl-server");
  });

  app.use("/api/robots", robotsController);
  app.use("/api/staff-members", staffMembersController);
  app.use("/api/clients", clientsController);
  app.use("/api/info", infoController);
  app.use("/api/leads", leadController);
};
