const router = require('express').Router();
const { User } = require('../models');

router.get('/', async (req, res) => {
    res.send('Login page is here');
})

router.post('/', async (req, res) => {
    console.log(`Username is: ${req.body.user_name} and the password is: ${req.body.password}`);
    const newUser = await User.create();
});

module.exports = router;