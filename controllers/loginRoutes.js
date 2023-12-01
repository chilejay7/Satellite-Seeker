const router = require('express').Router();
const { User } = require('../models');

router.get('/', async (req, res) => {
    res.render('login');
})

// Route used to authenticate and log users into the site.
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
    };

    const verifyPassword = await userData.checkPassword(password);

    if (!verifyPassword) {
        req.status(400).render('login');
        return;
    }

    req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.user_name = userData.user_name;
        req.session.email = userData.email;
        req.session.loggedIn = true;

        res
            .status(200)
            .send('You logged in!')
            // .redirect('/');
    });

});

router.post('/create_account', async (req, res) => {
    const { user_name, email, password } = req.body;

    const userData = await User.create({
        user_name: user_name.toLowerCase(),
        email: email.toLowerCase(),
        password,
    });

    const newUser = await User.findOne({
        where: {
            user_name,
        }
    });

    req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.user_name = userData.user_name;
        req.session.email = userData.email;
        req.session.loggedIn = true;

        res.status(200).send('You created a user!')
    });

});

module.exports = router;