const router = require("express").Router()
const controller = require("../controllers/userController")


router.post("/auth", controller.login)
router.post("/", controller.register)
router.get("/", controller.refreshHandle)

module.exports = router