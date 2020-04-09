var express = require('express');
var router = express.Router();
const UserController = require('../controllers/user.controller');

router.get('/', (req, res) => res.send("Welcome to Vehicles API v1"));
router.post('/signup', UserController.signUp);
router.post('/signin', UserController.signIn);

module.exports = router;
