const express = require('express');
const router = express.Router();
const lecturerController = require('../../controller/LecturerController');

router.post('/add', lecturerController.addLecturer);
router.post('/update', lecturerController.updateLecturerAndUser)
module.exports = router;