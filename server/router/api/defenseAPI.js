const express = require('express');
const router = express.Router();
const DefenseController = require('../../controller/DefenseController');

router.post('/createDefense', DefenseController.createDefense);
router.post('/assignGroup', DefenseController.assignGroupDefense);
router.get('/getAllDefense', DefenseController.getAllDefense);
router.get('/getAllDefense/:lecturerId', DefenseController.getAllDefenseByLecturerId);

module.exports = router;