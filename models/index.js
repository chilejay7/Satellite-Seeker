const User = require('./User');
const Country = require('./Country');
const Satellite = require('./Satellite');

// Country can have many satellites, uses country_id as reference
Country.hasMany(Satellite, {
  foreignKey: 'country_id',
  onDelete: 'CASCADE',
});

// Satellite has one country, uses country_id as reference
Satellite.belongsTo(Country, {
  foreignKey: 'country_id',
  onDelete: 'CASCADE',
});

module.exports = { User, Country, Satellite };
