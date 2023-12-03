const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('sat', {
        loggedIn: req.session.loggedIn,
    });
});

module.exports = router;