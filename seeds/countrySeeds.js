const { Country } = require('../models');

const countryData = [
  {
    country_name: 'USA',
  },
  {
    country_name: 'South Korea',
  },
  {
    country_name: 'Canada',
  },
  {
    country_name: 'China',
  },
];

const seedCountryData = () => Country.bulkCreate(countryData);

module.exports = seedCountryData;
