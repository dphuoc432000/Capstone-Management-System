"use strict";

var express = require('express');

var router = express.Router();

var DefenseController = require('../../controller/DefenseController');

router.post('/createDefense', DefenseController.createDefense);
router.post('/assignGroup', DefenseController.assignGroupDefense);
router.get('/getAllDefense', DefenseController.getAllDefense);
router.get('/getAllDefense/:lecturerId', DefenseController.getAllDefenseByLecturerId);
module.exports = router;