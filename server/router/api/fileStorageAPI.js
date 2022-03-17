const {uploadFile} = require('../../helper/upload');
const express = require('express');
const router = express.Router();
const fileStorageController = require('../../controller/FileStorageController');

router.post('/upload/:userId', uploadFile("upload\\notification").fields([
    {name: 'file1', maxCount: 1},
    {name: 'file2', maxCount: 1},
    {name: 'file3', maxCount: 1},
    {name: 'file4', maxCount: 1}]), fileStorageController.addFile);//Test
router.get('/', fileStorageController.get);

module.exports = router;