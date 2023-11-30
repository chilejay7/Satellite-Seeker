const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Satellite extends Model {}

Satellite.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    satellite_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "country",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezerTableName: true,
    underscored: true,
    modelName: "satellite",
  }
);

module.exports = Satellite;
