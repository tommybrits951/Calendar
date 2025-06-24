const Event = require("../models/Event");

async function createEvent(req, res, next) {
  try {
    const {
      start_time,
      end_time,
      location,
      address,
      postal,
      contact_name,
      contact_phone,
    } = req.body;
    if (!start_time || !end_time) {
        return res.status(400).json({message: "Missing either start_time or end_time."})
    }

  } catch (err) {
    next(err);
  }
}
