const { Satellite } = require('../models');

const satelliteData = [
  {
    satellite_name: 'XAIOXIANG-1 07',
    country_id: 4,
    norad_id: 44519,
  },
  {
    satellite_name: 'TELSTAR 18V',
    country_id: 3,
    norad_id: 43611,
  },
  {
    satellite_name: 'GEI-KOMPSAT-2B',
    country_id: 2,
    norad_id: 45246,
  },
  {
    satellite_name: 'SENTINEL 2B',
    country_id: 1,
    norad_id: 42063,
  },
  {
    satellite_name: 'SKYSAT 2',
    country_id: 1,
    norad_id: 40072,
  },
];

const seedSatelliteData = () => Satellite.bulkCreate(satelliteData);

module.exports = seedSatelliteData;
