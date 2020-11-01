class BrandService {
  constructor(logger, sequelize) {
    this.logger = logger;
    this.sequelize = sequelize;
  }

  async getAll() {
    const { Brand } = this.sequelize.models;

    return Brand.findAll({});
  }
}

module.exports = BrandService;
