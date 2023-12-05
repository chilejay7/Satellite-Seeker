const router = require('express').Router();
const { Satellite, Country } = require('../../models');

router.get('/', (req, res) => {
  res.render('sat', {
    loggedIn: req.session.loggedIn,
  });
});

router.get('/search', (req, res) => {
    res.render('uphere', {
        loggedIn: req.session.loggedIn,
    });
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;  

    const satellite = await Satellite.findByPk(id, {
        include: [
            {
                model: Country,
                attributes: [
                    'id',
                    'country_name',
                ],
            },
        ],
    });

    const oneSatellite = satellite.get({ plain: true });

    res.render('satId', {
        oneSatellite,
        loggedIn: req.session.loggedIn,
    })
})

module.exports = router;
