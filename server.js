const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const morgan = require('morgan');
const passport = require('passport');
const routes = require('./controllers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const helpers = require('./utils/helpers');

const hbs = exphbs.create({ helpers });

//Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3008;

// Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'public')));
const sess = {
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
  },
  secret: process.env.DB_SECRET,
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(routes);

// Starts the server to begin listening
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
});
