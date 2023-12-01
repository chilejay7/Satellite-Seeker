const router = require('express').Router();
const { Country, Satellite, User } = require('../models');

router.get('/', async (req, res) => {
  try {
    const satelliteData = await Satellite.findAll();
    console.log(satelliteData);

    const satellites = satelliteData.map((satellite) =>
      satellite.get({ plain: true })
    );

    console.log(`Satellite is this one ${satellites}`);

    res.render('homepage', {
      satellites,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
