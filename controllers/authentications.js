// Models
UserModel = require("../models/user")

// User Login
Passport = require("passport")
LocalStrategy = require('passport-local').Strategy

module.exports = {
    configure: function(app) {
        app.use(require('express-session')({
            secret: 'Massive Secret Test',
            resave: false,
            saveUninitialized: false
        }))
        app.use(Passport.initialize())
        app.use(Passport.session())
        Passport.use(new LocalStrategy(UserModel.authenticate()))
        Passport.serializeUser(UserModel.serializeUser())
        Passport.deserializeUser(UserModel.deserializeUser())
    }
}
