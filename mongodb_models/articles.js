
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ShortUID = require('short-uid');
const usersSchema = require('./users')

const articleSchema = new Schema({
    id : {type : String, index :{unique: true}},
    title: {type: String, required : true},
    author: {type : mongoose.Schema.ObjectId, ref: 'Users', required: true},
    body: {type: String, required: true},
    comments: [{type: mongoose.Schema.ObjectId, ref: 'Comments'}],
    date: {type: Date, default: Date.now},
    hidden: Boolean,
    meta: {
        votes: Number,
        favs: Number
    }
});

articleSchema.pre('save', function(next) {
    const article = this;
    // if (!article.isModified('id')) return next();
    let idgen = new ShortUID();
    article.id = idgen.randomUUID(6);


    next();


});

articleSchema.post('save', next => {
    // updating the author's articles section
    usersSchema.findByIdAndUpdate(this.author, {$push : {articles: this.id}})


});
module.exports = mongoose.model('Articles',articleSchema);