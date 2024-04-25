const router = require("express").Router();
const controller = require("../controllers/eventController");
router.route("/").get(controller.getAllEvents).post(controller.addEvent);
module.exports = router;
