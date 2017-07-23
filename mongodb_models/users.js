
const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10,
    validator = require('validator');

    mongoose.Promise = require('bluebird');

const usersSchema = new Schema({
    username : {type: String, required: true, index : { unique: true}},
    name : {type: String, required: true},
    surname : {type: String, required: true},
    emailAddress : {type : String, required: true, validate: [validator.isEmail, 'Enter a valid E-mail']},
    password: {type: String, required: true},
    articles: [{type: mongoose.Schema.ObjectId, ref: 'Articles'}],
    comments: [{type: mongoose.Schema.ObjectId, ref: 'Comments'}]
});

usersSchema.pre('save', function(next) {
    const user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

usersSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('Users', usersSchema);
