const express = require('express');
const router = express.Router();
const userController = require('../../controller/UserController');

router.post('/add', userController.addUser);
router.post('/update/:userId', userController.updateUser);

module.exports = router;