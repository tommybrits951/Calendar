/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("events", (tbl) => {
    tbl.increments("event_id").primary();
    tbl.dateTime("event_start").notNullable();
    tbl.dateTime("event_end").notNullable();
    tbl.string("event_name").notNullable();
    tbl.string("event_street");
    tbl.string("event_province");
    tbl.string("event_city");
    tbl.bigInteger("postal");
    tbl.dateTime("modified").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("events");
};
