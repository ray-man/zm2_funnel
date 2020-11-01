class RobotsService {
  constructor(logger, sequelize) {
    this.logger = logger;
    this.sequelize = sequelize;
  }

  async getList(filters = {}) {
    this.logger.info({ data: { filters } }, "Retrieving the list of robots");

    const { Brand, Feature, StaffMember, Robot } = this.sequelize.models;

    return Robot.findAll({
      where: filters,
      include: [
        {
          model: Brand,
          as: "brand",
        },
        {
          model: StaffMember,
          as: "experts",
        },
        {
          model: Feature,
          as: "features",
        },
      ],
    });
  }

  async getById(id) {
    this.logger.info({ data: { id } }, "Retrieving a robot by id");

    const { Brand, Feature, StaffMember, Robot } = this.sequelize.models;

    return Robot.findOne({
      where: { id },
      include: [
        {
          model: Brand,
          as: "brand",
        },
        {
          model: StaffMember,
          as: "experts",
        },
        {
          model: Feature,
          as: "features",
        },
      ],
    });
  }

  async update(id, robotInfo) {
    this.logger.info({ data: { id } }, "Updating a robot");

    const robot = await this.getById(id);

    Object.keys(robotInfo).forEach((key) => {
      robot[key] = robotInfo[key];
    });

    await robot.save();

    return robot;
  }
}

module.exports = RobotsService;
