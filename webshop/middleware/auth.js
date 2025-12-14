const passport = require('passport');
const session = require('express-session');
const flash = require('express-flash');
const initializePassport = require('../config/passportConfig');
const User = require('../models/User');

function setupAuth(app) {
    if (process.env.NODE_ENV !== 'production') {
        require('dotenv').config();
    }

    initializePassport(
        passport,
        async name => await User.findOne({ where: { name } }),
        async id => await User.findByPk(id)
    );

    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    }));

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());

}
module.exports = setupAuth;
