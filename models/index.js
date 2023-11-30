const User = require("./User");
const Country = require("./Country");
const Satellite = require("./Satellite");

// Satellite has one country, uses country_id as reference
Satellite.hasOne(Country, {
  foreignKey: "country_id",
  onDelete: "CASCADE",
});

// Country can have many satellites, uses country_id as reference
Country.hasMany(Satellite, {
  foreignKey: "country_id",
  onDelete: "CASCADE",
});

module.exports = { User, Country, Satellite };
