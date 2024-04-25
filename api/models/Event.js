const db = require("../config/db-config");

function getById(id) {
  const event = db("events").where("event_id", id).first();
  return event;
}

async function insertEvent(event) {
  const [event_id] = await db("events").insert(event);
  const result = await getById(event_id);
  return result;
}

async function getEvents() {
  const events = await db("events");
  return events;
}

module.exports = {
  getById,
  insertEvent,
  getEvents
};
