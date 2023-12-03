const router = require('express').Router();
const satelliteRoutes = require('./satelliteRoutes');

router.use('/view', satelliteRoutes);

module.exports = router;