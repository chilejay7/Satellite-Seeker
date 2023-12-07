const { Satellite } = require('../models');

const satelliteData = [
  {
    satellite_name: 'XAIOXIANG-1 07',
    country_id: 4,
    norad_id: 44519,
    latitude: 22.39,
    longitude: 17.63,
  },
  {
    satellite_name: 'TELSTAR 18V',
    country_id: 3,
    norad_id: 43611,
    latitude: -14.59,
    longitude: -28.67,
  },
  {
    satellite_name: 'GEI-KOMPSAT-2B',
    country_id: 2,
    norad_id: 45246,
    latitude: 27.98,
    longitude: 86.92,
  },
  {
    satellite_name: 'SENTINEL 2B',
    country_id: 1,
    norad_id: 42063,
    latitude: 51.17,
    longitude: 10.42,
  },
  {
    satellite_name: 'SKYSAT 2',
    country_id: 1,
    norad_id: 40072,
    latitude: 40.71,
    longitude: -74,
  },
];

const seedSatelliteData = () => Satellite.bulkCreate(satelliteData);

module.exports = seedSatelliteData;
