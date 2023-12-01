const { Country } = require('../models');

const countryData = [
  {
    country_name: 'USA',
  },
  {
    country_name: 'China',
  },
  {
    country_name: 'Canada',
  },
  {
    country_name: 'Russia',
  },
];

const seedCountryData = () => Country.bulkCreate(countryData);

module.exports = seedCountryData;
