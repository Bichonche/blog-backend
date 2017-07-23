const Schema = require("../mysql_models/model"),
    User = Schema.User,
    uid = require('uid-safe'),
    Message = require("../messages/message");
class usersController {
    getAllUsers(req, res, next) {
        new User().fetchAll()
            .then(users => res.send(users))
            .catch(err => res.send(err))

    }

    getUserByUsername(req, res, next) {
        new User({username: req.params.username})
            .fetch({require:true})
            .then(user => res.send(user))
            .catch(e => next(e));
    }

    createUser(req, res, next) {
        new User(req.body).save({id: uid.sync(6)})
            .then(user =>res.send(user))
            .catch(e => next(e))
    }

    deleteAllUsers(req, res, next) {
        new User()
            .where('id', '!=', '0')
            .destroy()
            .then(m => res.send(m))
            .catch(e => next(e))
    }

    deleteUser(req, res, next) {
        console.log(req.params.username);
        new User()
            .where({username : req.params.username})
            .destroy({require : true})
            .then(u => {res.send(Message.isAcknowledged(true).setMessage("User "+ req.params.username + " was deleted"))})
            .catch(e => next(e))

    }
}

module.exports = new usersController();