/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
  .createTable("mylist",function(table){
    table.integer("user_id").notNullable();
    table.foreign("user_id").references("users.id");
    table.integer("music_id").notNullable();
    table.foreign("music_id").references("music.id");
    table.date("date");
    table.string("place");
    table.string("comment");
    // table.unique(["user_id","music_id"],{indexName : "user_music_id"})
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("mylist");
};
