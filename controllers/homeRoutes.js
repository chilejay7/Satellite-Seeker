const router = require("express").Router();
const { Country, Satellite, User } = require("../models");

router.get("/", async (req, res) => {
  try {
    const satelliteData = await Satellite.findAll({
      include: [
        {
          model: Country,
          attributes: ["country_name"],
        },
      ],
    });

    const satellites = satelliteData.map((satellite) =>
      satellite.get({ plain: true })
    );

    res.render("homepage", {
      satellites,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
