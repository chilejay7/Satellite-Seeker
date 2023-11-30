const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Country extends Model {}

Country.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    country_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    satellite_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "satellite",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezerTableName: true,
    underscored: true,
    modelName: "country",
  }
);

module.exports = Country;
