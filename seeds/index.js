const seedCountryData = require("./countrySeeds");
const seedSatelliteData = require("./satelliteSeeds");
const seedUserData = require("./userSeeds");

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedCountryData();

  await seedSatelliteData();

  await seedUserData();

  process.exit(0);
};

seedAll();
