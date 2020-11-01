module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define(
    "Client",
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
        unique: true,
      },

      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },

      phone: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },

      address: {
        type: DataTypes.TEXT(),
        allowNull: false,
      },

      notes: {
        type: DataTypes.TEXT(),
        allowNull: true,
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
      tableName: "sl_clients",
    }
  );

  return Client;
};
