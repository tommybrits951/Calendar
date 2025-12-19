const Event = require("../models/Event");
const jwt = require("jsonwebtoken");

function getUserFromToken(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.ACCESS);
    return decoded._id;
  } catch {
    return null;
  }
}

async function createEvent(req, res, next) {
  try {
    const userId = getUserFromToken(req);
    if (!userId) {
      return res.status(401).json({message: "Unauthorized"});
    }
    const {
      start_time,
      end_time
    } = req.body;
    if (!start_time || !end_time) {
        return res.status(400).json({message: "Missing either start_time or end_time."})
    }
    const event = await Event.create({...req.body, start_time, end_time, user: userId})
    if (event) {
      res.status(201).json({message: "Event created."})
    }
  } catch (err) {
    next(err);
  }
}
async function getEvents(req, res, next) {
  try {
    const userId = getUserFromToken(req);
    if (!userId) {
      return res.status(401).json({message: "Unauthorized"});
    }
    const events = await Event.find({ user: userId })
    res.status(200).json(events)
  } catch (err) {
    next(err)
  }
}

async function getEvent(req, res, next) {
  try {
    const userId = getUserFromToken(req);
    if (!userId) {
      return res.status(401).json({message: "Unauthorized"});
    }
    const {_id} = req.params
    if (!_id) {
      return res.status(400).json({message: "_id missing from address parameters!"})
    }
    const event = await Event.findOne({ _id, user: userId })
    if (!event) {
      return res.status(404).json({message: "Couldn't find event."})
    }
    res.status(200).json(event)
  } catch (err) {
    next(err)
  }
}

async function updateEvent(req, res, next) {
  try {
    const userId = getUserFromToken(req);
    if (!userId) {
      return res.status(401).json({message: "Unauthorized"});
    }
    const {_id} = req.params;
    if (!_id) {
      return res.status(400).json({message: "_id missing from address parameters!"});
    }
    const event = await Event.findOneAndUpdate(
      { _id, user: userId },
      { ...req.body },
      { new: true }
    );
    if (!event) {
      return res.status(404).json({message: "Couldn't find event."});
    }
    res.status(200).json(event);
  } catch (err) {
    next(err);
  }
}

async function deleteEvent(req, res, next) {
  try {
    const userId = getUserFromToken(req);
    if (!userId) {
      return res.status(401).json({message: "Unauthorized"});
    }
    const {_id} = req.params;
    if (!_id) {
      return res.status(400).json({message: "_id missing from address parameters!"});
    }
    const event = await Event.findOneAndDelete({ _id, user: userId });
    if (!event) {
      return res.status(404).json({message: "Couldn't find event."});
    }
    res.status(200).json({message: "Event deleted."});
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createEvent,
  getEvent,
  getEvents,
  updateEvent,
  deleteEvent
}