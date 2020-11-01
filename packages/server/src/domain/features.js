class FeatureService {
  constructor(logger, sequelize) {
    this.logger = logger;
    this.sequelize = sequelize;
  }

  async getAll() {
    const { Feature } = this.sequelize.models;

    return Feature.findAll({});
  }
}

module.exports = FeatureService;
