class LeadService {
  constructor(logger, sequelize) {
    this.logger = logger;
    this.sequelize = sequelize;
  }

  async getExpertById(id) {
    this.logger.info({ data: { id } }, "Retrieving a lead Expert by Lead id");
    const { LeadExpert, StaffMember } = this.sequelize.models;
    let staff = null;
    await LeadExpert.findOne({ where: { id }, raw: true }).then((result) => {
      staff = StaffMember.findOne({
        where: { id: result.expertId },
        raw: true,
      });
    });

    return staff;
  }

  async create(data) {
    const { Lead } = this.sequelize.models;
    let record = null;
    try {
      record = await Lead.create(data);
    } catch (e) {
      this.logger.error(e);
    } finally {
      if (record.id) {
        await this.saveClientRelation(data.meta.leadClient, record.id);
      }
      return await this.assignExpert(data, record.id);
    }
  }

  async saveClientRelation(clientId, leadId) {
    const { ClientLead } = this.sequelize.models;
    try {
      let record = await ClientLead.create({
        leadId: leadId,
        clientId: clientId,
      });
    } catch (e) {
      this.logger.error(e);
    }
  }

  async assignExpert(data, leadId) {
    const { Robot, StaffMember, RobotExpert } = this.sequelize.models;
    const brandIds = data.meta.brand ? data.meta.brand.map((b) => b.id) : [];
    const robotTypes = data.meta.robotType ? data.meta.robotType : [];
    const autonomy = data.meta.autonomy ? data.meta.autonomy : null;
    const weight = data.meta.weight ? data.meta.weight : null;
    const minRange = data.meta.minRange ? data.meta.minRange : null;
    const maxRange = data.meta.maxRange ? data.meta.maxRange : null;
    let assignedExpert = null;

    let whereStatement = {};
    let robots = null;
    let staff = null;

    // Checking Against Brand Ids
    if (brandIds.length > 0) {
      whereStatement.brandId = { $in: brandIds };
    }

    // Checking Against Types
    if (robotTypes.length > 0) {
      whereStatement.type = { $in: robotTypes };
    }

    // Checking Against autonomy
    if (autonomy) {
      whereStatement.autonomy = autonomy;
    }

    // Checking Against Weight
    if (weight) {
      whereStatement.weight = weight;
    }

    // Checking Against min Price Range
    if (minRange) {
      whereStatement.price = { $gte: minRange };
    }

    // Checking Against max Price range
    if (maxRange) {
      whereStatement.price = { $lte: maxRange };
    }

    robots = await Robot.findAll({
      where: whereStatement,
      attributes: ["id"],
    }).then((list) => list.map((item) => item.id));

    if (robots.length > 0) {
      staff = await RobotExpert.findAll({
        where: { robotId: { $in: robots } },
        attributes: [
          "staffMemberId",
          [
            this.sequelize.fn("count", this.sequelize.col("robotId")),
            "number_of_robots",
          ],
        ],
        group: ["staffMemberId"],
        raw: true,
      });

      if (staff.length > 0) {
        let topExpert = staff.reduce((max, item) =>
          max.number_of_robots > item.number_of_robots ? max : item
        );

        let expertCompetition = staff.filter(
          (item) => item.number_of_robots == topExpert.number_of_robots
        );

        switch (true) {
          case expertCompetition.length == 0:
            this.logger.info("############# No Result");
            let expert = await this.randomExpert();
            assignedExpert = await this.saveLeadExpert(leadId, expert.id);
            break;
          case expertCompetition.length == 1:
            this.logger.info("############# One result");
            assignedExpert = await this.saveLeadExpert(
              leadId,
              topExpert.staffMemberId
            );
            break;
          case expertCompetition.length > 1:
            let exper = await this.featureFecth(
              expertCompetition.map((exp) => exp.staffMemberId),
              data.feature.feature.map((feat) => feat.id)
            );
            assignedExpert = await this.saveLeadExpert(
              leadId,
              exper.staffMemberId
            );
            this.logger.info(
              `############# More than one result. ${expertCompetition.length} ${expertCompetition[0]}`
            );
        }
      } else {
        this.logger.info("############# No Staff Result");
        let expert = await this.randomExpert();
        assignedExpert = await this.saveLeadExpert(leadId, expert.id);
      }
    } else {
      this.logger.info("############# No Robot Result");
      let expert = await this.randomExpert();
      assignedExpert = await this.saveLeadExpert(leadId, expert.id);
    }
    return assignedExpert;
  }

  async saveLeadExpert(leadId, expertId) {
    const { LeadExpert } = this.sequelize.models;
    let assignedExpert = null;
    try {
      assignedExpert = await LeadExpert.create({
        leadId: leadId,
        expertId: expertId,
      });
    } catch (e) {
      this.logger.error(e);
    } finally {
      return assignedExpert;
    }
  }

  async featureFecth(expertList, featureList) {
    const { RobotExpert, Robot, RobotFeature } = this.sequelize.models;

    let expertFeatureList = [];

    expertList.forEach((expert) => {
      let dic = { staffMemberId: expert };
      RobotExpert.findAll({
        where: { staffMemberId: expert },
        attributes: ["robotId"],
        raw: true,
      }).then((result) => {
        dic["robots"] = result.map((item) => item.robotId);

        RobotFeature.findAll({
          where: {
            robotId: { $in: dic.robots },
            featureId: { $in: featureList },
          },
          attributes: [
            [
              this.sequelize.fn("count", this.sequelize.col("robotId")),
              "feature_count",
            ],
          ],
          raw: true,
        }).then((result) => {
          dic["features"] = result.map((re) => re.feature_count);
        });
      });

      expertFeatureList.push(dic);
    });

    let expert = expertFeatureList.reduce((max, item) =>
      max.features > item.features ? max : item
    );

    let expertCompetition = expertFeatureList.filter(
      (item) => item.feature == expert.feature
    );

    if (expertCompetition.length > 1) {
      this.logger.info("More then One exper is there");
    }

    return expert;
  }

  async randomExpert() {
    const { StaffMember } = this.sequelize.models;

    return await StaffMember.findAll({
      order: this.sequelize.literal("rand()"),
      limit: 1,
    });
  }
}

module.exports = LeadService;
