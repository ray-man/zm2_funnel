const express = require("express");
const ClientService = require("../domain/clients.js");
const { sequelize } = require("../models");

const router = express.Router();

router.post("/", async (request, response, next) => {
  try {
    const clientService = new (request.log, sequelize)();

    const client = await clientService.create(request.body);
    response.status(200).json(client);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
