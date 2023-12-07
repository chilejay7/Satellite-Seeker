const axios = require('axios');
const router = require('express').Router();
const { Satellite, Country } = require('../../models');

router.get('/', (req, res) => {
  res.render('sat', {
    loggedIn: req.session.loggedIn,
  });
});

// Used with the uphere.js script file to retrieve data from the UPHERE.SPACE API
router.get('/search', (req, res) => {
  res.render('uphere', {
    loggedIn: req.session.loggedIn,
  });
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const satData = await Satellite.findByPk(id, {
        include: [
          {
            model: Country,
            attributes: ['id', 'country_name'],
          }
        ]
      })
      if(satData) {
        const satInfo = satData.get({ plain: true });
        console.log(satInfo);
        res.render('satid', { 
        satInfo,
        loggedIn: req.session.loggedIn,
         })
      }
    } catch (err) {
      res.status(500).json(err)
    }
})

// POST route for norad ID submitted to track coordinates and map out location
router.post('/', async (req, res) => {
  // req.body property names will be whatever is sent from JSON string
  const { longitudeMap, latitudeMap } = req.body;

  console.log(req.body);

  const mapUrl = `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/pin-l-communications-tower+f74e4e(${longitudeMap},${latitudeMap})/${longitudeMap},${latitudeMap},2/500x500?access_token=${process.env.Mapbox_API_KEY}`;

  const geoCodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitudeMap},${latitudeMap}.json?access_token=${process.env.Mapbox_API_KEY}`;

  try {
    // Axios method is used to make request to geoCodingUrl with information from the client side
    const geoResponse = await axios.get(geoCodingUrl);

    // If the features array from the geoResponse exists/is greater than 0, set place variable equal to place_name property. Then return the mapUrl and place, otherwise just return mapUrl
    // Response goes to client side through JSON object
    if (geoResponse.data.features.length > 0) {
      const place = geoResponse.data.features[0].place_name;
      res.json({ mapUrl, place });
    } else {
      res.json({ mapUrl });
    }

    // Any errors that occur will throw an error and console log it
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params; 
    const deletePost = await Satellite.destroy({
        where: {
            id,
        }
    });

    res.status(200).json('The satellite has been removed.')
});

module.exports = router;
