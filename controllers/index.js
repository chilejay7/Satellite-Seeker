const router = require('express').Router();
const apiRoutes = require('./api');
const loginRoutes = require('./login');

router.use('/api', apiRoutes);
router.use('/login', loginRoutes);

module.exports = router;