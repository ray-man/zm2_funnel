class LeadService {
  constructor(logger, sequelize) {
    this.logger = logger;
    this.sequelize = sequelize;
  }

  async create(data) {
    const { Lead } = this.sequelize.models;
    let record = null;
    try {
      record = await Lead.create(data);
    } catch (e) {
      this.logger.error(e);
    } finally {
      return record;
    }
  }
}

module.exports = LeadService;
