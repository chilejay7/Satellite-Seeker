const router = require('express').Router();
const satelliteRoutes = require('./satelliteRoutes');

router.use('/satellite', satelliteRoutes);

module.exports = router;