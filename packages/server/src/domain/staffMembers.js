class StaffMembersService {
  constructor(logger, sequelize) {
    this.logger = logger;
    this.sequelize = sequelize;
  }

  async getList(filters = {}) {
    this.logger.info({ data: { filters } }, "Retrieving the list of staff members");

    const { Feature, StaffMember, Robot } = this.sequelize.models;

    return StaffMember.findAll({
      where: filters,
      include: [
        {
          model: Robot,
          as: "robots",
          include: [
            {
              model: StaffMember,
              as: "experts",
            },
            {
              model: Feature,
              as: "features",
            },
          ],
        },
      ],
    });
  }
}

module.exports = StaffMembersService;
