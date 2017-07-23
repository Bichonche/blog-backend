const db = require('../../config.json');
const uid = require('uid-safe');
const knex = require('knex')({
    client: db[process.env.NODE_ENV].client,
    connection: {
        host: db[process.env.NODE_ENV].connection.host,
        user: db[process.env.NODE_ENV].connection.user,
        password: db[process.env.NODE_ENV].connection.password,
        database: db[process.env.NODE_ENV].connection.database,
        charset: db[process.env.NODE_ENV].connection.charset
    }
});

let bookshelf = require('bookshelf')(knex);

bookshelf.plugin(require('bookshelf-bcrypt'));

module.exports = bookshelf;
