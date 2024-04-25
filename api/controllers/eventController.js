const Event = require("../models/Event");
const { format } = require("date-fns");
async function getAllEvents(req, res, next) {
  try {
    const events = await Event.getEvents();
    if (!events) {
      return res.status(500).json({ message: "couldn't retreive events" });
    }
    res.status(200).json(events);
  } catch (err) {
    next(err);
  }
}
async function addEvent(req, res, next) {
  const { event_start, event_end, event_name } = req.body;
  const event = { ...req.body, modified: new Date() };
  if (!event_start || !event_end || !event_name) {
    return res.status(400).json({ message: "All fields required" });
  } else if (new Date(event_start).getTime() >= new Date(event_end).getTime()) {
    return res
      .status(400)
      .json({ message: "start date must be before end date" });
  }
  let result = await Event.insertEvent(event);
  if (result) {
    res.status(201).json({ message: "Event set!" });
  }
}
module.exports = {
  getAllEvents,
  addEvent
};
