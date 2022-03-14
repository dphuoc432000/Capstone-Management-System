const {uploadFile} = require('../../helper/upload');
const express = require('express');
const router = express.Router();
const fileStorageController = require('../../controller/FileStorageController');

router.post('/upload/:userId', uploadFile("upload").array('files',10), fileStorageController.addFile);//Test
router.get('/', fileStorageController.get);

module.exports = router;