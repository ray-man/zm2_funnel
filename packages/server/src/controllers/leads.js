const express = require("express");
const LeadService = require("../domain/leads");
const { sequelize } = require("../models");

const router = express.Router();

router.post("/", async (request, response, next) => {
  try {
    const leadService = new LeadService(request.log, sequelize);

    const client = await leadService.create(request.body);
    response.status(200).json(client);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (request, response, next) => {
  try {
    const leadService = new LeadService(request.log, sequelize);

    const client = await leadService.getExpertById(request.params.id);
    response.status(200).json(client);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
