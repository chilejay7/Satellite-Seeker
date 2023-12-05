const { Satellite } = require('../models');

const satelliteData = [
  {
    satellite_name: 'GLONASS-K1',
    country_id: 4,
  },
  {
    satellite_name: 'Radarsat-1',
    country_id: 3,
  },
  {
    satellite_name: 'APSTAR-9',
    country_id: 2,
  },
  {
    satellite_name: 'GOES-16',
    country_id: 1,
  },
  {
    satellite_name: 'USA-257',
    country_id: 1,
  },
];

const seedSatelliteData = () => Satellite.bulkCreate(satelliteData);

module.exports = seedSatelliteData;
