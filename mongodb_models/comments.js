
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentsSchema = new Schema({
    author: {type: mongoose.Schema.ObjectId, ref: 'Users'}
});

module.exports = mongoose.model('Comments',commentsSchema);