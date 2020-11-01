const express = require("express");
const StaffMembersService = require("../domain/staffMembers");
const { sequelize } = require("../models");

const router = express.Router();

router.get("/", async (request, response, next) => {
  try {
    const staffMembersService = new StaffMembersService(request.log, sequelize);

    const staffMembers = await staffMembersService.getList(request.query);

    response.status(200).json(staffMembers);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
