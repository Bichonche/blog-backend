const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
/* GET users listing. */
router.get('/', function(req, res, next) {
  usersController.getAllUsers(req, res, next)
});

router.get('/:username', usersController.getUserByUsername)

router.post('/', (req, res, next) => {
  usersController.createUser(req, res, next)
});

router.delete('/', usersController.deleteAllUsers);

router.delete('/:username', usersController.deleteUser);

module.exports = router;
