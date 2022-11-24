// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

require('dotenv').config();

module.exports = {
  client: 'postgresql',
    connection: {
      database: process.env.POSTGRES_DB || "music_diary" ,
      user: process.env.POSTGRES_USER || "postgres" ,
      password: process.env.PASSWORD|| null
    },
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
};
