const knex = require('./knexConfig'),
    Bookshelf = require('bookshelf')(knex);

// User model

module.exports = Bookshelf.Model.extend();