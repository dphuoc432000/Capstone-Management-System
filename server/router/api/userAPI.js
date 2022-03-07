const express = require('express');
const router = express.Router();
const userController = require('../../controller/UserController');

router.post('/add', userController.addUser);

module.exports = router;