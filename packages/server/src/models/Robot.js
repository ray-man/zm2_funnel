module.exports = (sequelize, DataTypes) => {
  const Robot = sequelize.define(
    "Robot",
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },

      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },

      type: {
        type: DataTypes.ENUM("cleaning", "kitchen", "warehouse"),
        allowNull: false,
      },

      autonomy: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },

      weight: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },

      price: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
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
    {
      tableName: "sl_robots",
    }
  );

  Robot.associate = () => {
    const { Feature, Brand, StaffMember } = sequelize.models;

    Robot.belongsTo(Brand, {
      as: "brand",
      foreignKey: {
        name: "brandId",
        allowNull: false,
      },
    });

    Robot.belongsToMany(Feature, {
      as: "features",
      through: "RobotFeature",
      foreignKey: "robotId",
    });

    Robot.belongsToMany(StaffMember, {
      as: "experts",
      through: "RobotExpert",
      foreignKey: "robotId",
    });
  };

  return Robot;
};
