/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
  .createTable("music",function(table){
    table.increments("id").primary();
    table.string("Title").notNullable();
    table.string("Artist").notNullable();
    table.integer("key");
    table.integer("tempo");
    table.integer("duration");
    table.string("img");
    table.string("URL");
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("music");
};
