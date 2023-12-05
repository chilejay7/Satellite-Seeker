const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

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
    // longitude: {
    //   type: DataTypes.FLOAT,
    //   allowNull: true,
    // },
    // latitude: {
    //   type: DataTypes.FLOAT,
    //   allowNull: true,
    // },
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'country',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'satellite',
  }
);

module.exports = Satellite;
