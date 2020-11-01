const express = require("express");
const RobotsService = require("../domain/robots");
const { sequelize } = require("../models");

const router = express.Router();

router.get("/", async (request, response, next) => {
  try {
    const robotsService = new RobotsService(request.log, sequelize);

    const robots = await robotsService.getList(request.query);

    response.status(200).json(robots);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (request, response, next) => {
  try {
    const robotsService = new RobotsService(request.log, sequelize);

    const robot = await robotsService.getById(request.params.id);

    response.status(200).json(robot);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (request, response, next) => {
  try {
    const robotsService = new RobotsService(request.log, sequelize);

    const robot = await robotsService.update(request.params.id, request.body);

    response.status(200).json(robot);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
