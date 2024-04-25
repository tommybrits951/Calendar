/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("events").del();
  await knex("events").insert([
    {
      event_id: 1,
      event_start: "04-24-2024 12:00:00",
      event_end: "04-25-2024 12:00:10",
      modified: "04-24-2024 21:24:00",
      event_name: "Stupid thing i gotta get to"
    },
    {
      event_id: 2,
      event_start: "04-24-2024 12:00:00",
      event_end: "04-25-2024 12:00:10",
      modified: "04-24-2024 21:24:00",
      event_name: "Stupid thing i gotta get to"
    },
    {
      event_id: 3,
      event_start: "04-24-2024 12:00:00",
      event_end: "04-25-2024 12:00:10",
      modified: "04-24-2024 21:24:00",
      event_name: "Stupid thing i gotta get to"
    }
  ]);
};
