module.exports = (sequelize, DataTypes) => {
  const Lead = sequelize.define(
    "Lead",
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },

      feature: {
        type: DataTypes.TEXT(),
        get: function () {
          return JSON.parse(this.getDataValue("feature"));
        },
        set: function (value) {
          return this.setDataValue("feature", JSON.stringify(value));
        },
      },

      meta: {
        type: DataTypes.TEXT(),
        get: function () {
          return JSON.parse(this.getDataValue("meta"));
        },
        set: function (value) {
          return this.setDataValue("meta", JSON.stringify(value));
        },
      },

      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("NOW()"),
      },

      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("NOW()"),
      },
    },
    { tableName: "sl_lead" }
  );

  Lead.associate = () => {
    const { StaffMember, Client } = sequelize.models;

    Lead.belongsToMany(Client, {
      as: "clients",
      through: "ClientLead",
      foreignKey: "leadId",
    });

    Lead.belongsToMany(StaffMember, {
      as: "experts",
      through: "LeadExpert",
      foreignKey: "leadId",
    });
  };

  return Lead;
};
