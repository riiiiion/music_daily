// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

require('dotenv').config();

module.exports = {
  client: 'postgresql',
    connection: {
      database: process.env.POSTGRES_DB ,
      user: process.env.POSTGRES_USER ,
      password: process.env.PASSWORD
    },
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
};
