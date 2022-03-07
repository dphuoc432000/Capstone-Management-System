const express = require('express');
const router = express.Router();
const lecturerController = require('../../controller/LecturerController');

router.post('/add', lecturerController.addLecturer);

module.exports = router;