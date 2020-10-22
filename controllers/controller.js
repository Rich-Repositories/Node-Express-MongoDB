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
    },
    homepage: function(req, res) {
        // console.log("Loged in")
    	res.send("Homepage <a href=\"/logout\">Logout</a>")
    },
    getLoginView: function(req, res) {
    	res.render("login", {
    		errorMessage: ""
    	})
    },
    login: function(req, res) {
    	var username = req.body.username
        var email = req.body.email
        var password = req.body.password
        var rememberMe = req.body.rememberMe

        if (password === undefined || typeof password != "string" || password.length == 0) {
            res.render("login", {
            	errorMessage: "Password not provided"
            })
            return
        }

        var usernameNull = false
        var emailNull = false

        if ((username === undefined || typeof username != "string" || username.length == 0)) {
            usernameNull = true
        }

        if (email === undefined || typeof email != "string" || email.length == 0) {
            emailNull = true
        } else {
            email = email.toLowerCase()
        }

        if (usernameNull == true && emailNull == true) {
            res.render("login", {
            	errorMessage: "Username or email not provided"
            })
            return
        } else if (usernameNull == true && emailNull == false) {
            username = email
            req.body.username = email
        }

        Passport.authenticate('local', function(err, user, info) {
            if (err) {
                console.log("-- Error authenticating user in login: %O", err)
                res.send("Error: " + err)
                return
            }
            if (!user) {
                res.render("login", {
                	errorMessage: "Incorrect Login"
                })
                return
            }
            req.logIn(user, function(err) {
                if (err) {
                    console.log("-- Error req.login user in login: %O", err)
                    return
                }
                if (rememberMe) {
                    // Allow the user to be remembered by the server. When they close the browser and end their session they should not have to login again once they attempt to go to the homepage
                    req.session.cookie.maxAge = 60 * 1000; // Cookie expires after 1 minute
                    // req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // Cookie expires after 30 days
                } else {
                    req.session.cookie.maxAge = false;
                }

                return res.redirect('/')
            })
        })(req, res)
    },
    getSignupView: function(req, res) {
    	res.render("signup", {
    		errorMessage: ""
    	})
    },
    signup: function(req, res) {
    	var username = req.body.username
        var password = req.body.password
        var c_password = req.body.c_password
        var email = req.body.email
        var rememberMe = req.body.rememberMe

        if (password != c_password) {
            res.render("signup", {
                errorMessage: "Need Confirm Password"
            })
            return
        } 


        UserModel.findOne().or([{
            username: username
          }, {
            email: email
          }]).exec(function(err, foundUser) {
            if (err) {
            	console.log("Error finding userModel in signup: %O", err)
            } 
            else if (foundUser) {
            	res.render("signup", {
            		errorMessage: "Username or Email has been already taken by another user."
            	})
            } 
            else {

                UserModel.register(new UserModel({
                    username: username,
                    email: email.toLowerCase()
                }), password, function(err, user) {
                    if (err) {
                        res.render("signup", {
                            errorMessage: "Error creating user"
                        })
                        return
                    }
                    Passport.authenticate('local')(req, res, function() {
                        if (rememberMe) {
                            // Allow the user to be remembered by the server. When they close the browser and end their session they should not have to login again once they attempt to go to the homepage
                            req.session.cookie.maxAge = 60 * 1000; // Cookie expires after 1 minute
                            // req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // Cookie expires after 30 days
                        } else {
                            req.session.cookie.maxAge = false;
                        }
                        res.redirect('/');
                    })
                })
            }
        })
    },
    isLoggedIn: function(req, res, next) {
        // Add a check to see if the user is logged in. If the user is logged in. Call next(), otherwize, redirect them to the login page
        if (req.isAuthenticated()) {
            req.isLogged = true
            return next();
         }

        res.redirect("/login")
    },
    logout: function(req, res) {
        req.logout()
        res.redirect("/login")
    }
}
