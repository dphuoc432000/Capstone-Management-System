const express = require('express');
const router = express.Router();
const userController = require('../../controller/UserController');

router.post('/add', userController.addUser);//(Test)
router.post('/update/:userId', userController.updateUser);//(Test)
router.post('/delete/:userId', userController.removeUserById);

module.exports = router;