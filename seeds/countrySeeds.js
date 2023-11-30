const { Country } = require("../models");

const countryData = [
  {
    country_id: 1,
    country_name: "USA",
    satellite_id: 4,
    satellite_id: 5,
  },
  {
    country_id: 2,
    country_name: "China",
    satellite_id: 4,
  },
  {
    country_id: 3,
    country_name: "Canada",
    satellite_id: 2,
  },
  {
    country_id: 4,
    country_name: "Russia",
    satellite_id: 1,
  },
];

const seedCountryData = () => Country.bulkCreate(countryData);

module.exports = seedCountryData;
