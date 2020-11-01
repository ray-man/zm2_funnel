class ClientService {
  constructor(logger, sequelize) {
    this.logger = logger;
    this.sequelize = sequelize;
  }

  async create(data) {
    const { Client } = this.sequelize.models;
    let record = null;
    try {
      record = await Client.create(data);
    } catch (e) {
      this.logger.error(e);
    } finally {
      return record;
    }
  }
}

module.exports = ClientService;
