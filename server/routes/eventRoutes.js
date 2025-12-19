const router = require("express").Router()
const controller = require('../controllers/eventController')
const {logger} = require("../middleware/logger")

router.get("/", logger, controller.getEvents)
router.get("/:_id", logger, controller.getEvent)
router.post("/", logger, controller.createEvent)
router.put("/:_id", logger, controller.updateEvent)
router.delete("/:_id", logger, controller.deleteEvent)

router.use((err, req, res, next) => {
    res.status(500).json({message: "Problem with Event"})
})

module.exports = router