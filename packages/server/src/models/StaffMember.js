module.exports = (sequelize, DataTypes) => {
  const StaffMember = sequelize.define(
    "StaffMember",
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },

      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },

      name: {
        type: DataTypes.STRING(255),
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
      tableName: "sl_staff_members",
    }
  );

  StaffMember.associate = () => {
    const { Robot } = sequelize.models;

    StaffMember.belongsToMany(Robot, {
      as: "robots",
      through: "RobotExpert",
      foreignKey: "staffMemberId",
    });
  };

  return StaffMember;
};
