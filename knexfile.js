// Update with your config settings.
// userINFO = require('./password.js')
require('dotenv').config();
let myPassword = process.env.PASSWORD;
module.exports = {

  development: {
    client: 'pg',
    connection: {
      
      database: 'recipe-book',
      user:     'postgres',
      password: myPassword
    },

    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
