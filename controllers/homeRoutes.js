const router = require('express').Router();
const { Country, Satellite, User } = require('../models');

// Get route for homepage showing satellites and the countries they belong to
router.get('/', async (req, res) => {
  try {
    const satelliteData = await Satellite.findAll({
      include: [
        {
          model: Country,
          attributes: ['id', 'country_name'],
        },
      ],
    });
    // console.log(satelliteData);

    const satellites = satelliteData.map((satellite) =>
      satellite.get({ plain: true })
    );

    console.log(`Satellite is this one ${satellites}`);

    res.render('homepage', {
      satellites,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get route for about us page
router.get('/about', (req, res) => {
  res.render('aboutUs', {
    loggedIn: req.session.loggedIn,
  });
});

module.exports = router;
