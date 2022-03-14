const {uploadFile} = require('../../helper/upload');
const express = require('express');
const router = express.Router();
const notificationController = require('../../controller/NotificationController');

router.post('/add/:userId', uploadFile("upload").array('files',10), notificationController.addNotification);

module.exports = router;