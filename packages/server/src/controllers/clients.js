const express = require("express");
const ClientService = require("../domain/clients");
const { sequelize } = require("../models");

const router = express.Router();

router.post("/", async (request, response, next) => {
  try {
    const clientService = new ClientService(request.log, sequelize);
    const client = await clientService.create(request.body);
    response.status(200).json(client);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
