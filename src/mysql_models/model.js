    const bookshelf = require('./knexConfig');

module.exports = {
    // User model
    User : bookshelf.Model.extend( {
        tableName: 'users',
        bcrypt: {field: 'password'}
    }),
    // Post model
    Post: bookshelf.Model.extend({
        tableName: 'posts',
        uuid: true,
        hasTimestamps: true,
        category: function () {
            return this.belongsTo(Category, 'category_id');
        },
        tags: function () {
            return this.belongsToMany(Tag);
        },
        author: function () {
            return this.belongsTo(User);
        }
    }),
    // Category model
    Category: bookshelf.Model.extend({
        tableName: 'categories',
        uuid : true,
        posts: function () {
            return this.hasMany(Post, 'category_id');
        }
    }),
    // Tag model
    Tag: bookshelf.Model.extend({
        tableName: 'tags',
        uuid: true,
        posts: function () {
            return this.belongsToMany(Post);
        }
    })
};