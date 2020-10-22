const express = require('express')
const router = express.Router()
const controller = require('../controllers/controller')
const isLoggedIn = controller.isLoggedIn

router.get("/", isLoggedIn, controller.homepage)
router.get("/login", controller.getLoginView)
router.post("/login", controller.login)
router.get("/signup", controller.getSignupView)
router.post("/signup", controller.signup)
router.get("/logout", controller.logout)

module.exports = router
