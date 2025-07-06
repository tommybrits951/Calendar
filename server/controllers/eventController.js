const Event = require("../models/Event");

async function createEvent(req, res, next) {
  try {
    const {
      start_time,
      end_time
    } = req.body;
    if (!start_time || !end_time) {
        return res.status(400).json({message: "Missing either start_time or end_time."})
    }
    const event = await Event.create({...req.body, start_time, end_time})
    if (event) {
      res.status(201).json({message: "Event created."})
    }
  } catch (err) {
    next(err);
  }
}
async function getEvents(req, res, next) {
  try {
    const events = await Event.find()
    res.status(200).json(events)
  } catch (err) {
    next(err)
  }
}

async function getEvent(req, res, next) {
  try {
    const {_id} = req.params
    if (!_id) {
      return res.status(400).json({message: "_id missing from address parameters!"})
    }
    const event = await Event.findById(_id)
    if (!event) {
      return res.status(404).json({message: "Couldn't find event."})
    }
    res.status(200).json(event)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  createEvent,
  getEvent,
  getEvents
}