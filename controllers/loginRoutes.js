const router = require('express').Router();
const { User } = require('../models');

router.get('/', async (req, res) => {
    res.render('login');
})

router.post('/', async (req, res) => {
    console.log(`Username is: ${req.body.user_name} and the password is: ${req.body.password}`);

    const { user_name, password } = req.body;


    const userData = await User.findOne({
        where: {
            user_name: user_name.toLowerCase(),
        }
    });

    if (!userData) {
        res.status(400).render('login');
        return;
    }

});

module.exports = router;