const express = require('express');
const router = express.Router();
const lecturerController = require('../../controller/LecturerController');

router.post('/add', lecturerController.addLecturer);
router.post('/update', lecturerController.updateLecturerAndUser);
router.get('/list', lecturerController.getAllLecturer);
router.get('/get/:userId', lecturerController.getLecturerByUserId);

module.exports = router;