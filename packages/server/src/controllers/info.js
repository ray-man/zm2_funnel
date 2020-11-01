const express = require("express");
const RobotsService = require("../domain/robots");
const FeatureService = require("../domain/features");
const BrandService = require("../domain/brand");
const { sequelize } = require("../models");

const router = express.Router();

router.get("/types", async (request, response, next) => {
  try {
    const robotService = new RobotsService(request.log, sequelize);

    const types = await robotService.getTypes();
    response.status(200).json(types);
  } catch (error) {
    next(error);
  }
});

router.get("/features", async (request, response, next) => {
  try {
    const featureService = new FeatureService(request.log, sequelize);

    const features = await featureService.getAll();
    response.status(200).json(features);
  } catch (error) {
    next(error);
  }
});

router.get("/brands", async (request, response, next) => {
  try {
    const brandService = new BrandService(request.log, sequelize);

    const brands = await brandService.getAll();
    response.status(200).json(brands);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
