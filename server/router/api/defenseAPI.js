const express = require('express');
const router = express.Router();
const DefenseController = require('../../controller/DefenseController');

router.post('/createDefense', DefenseController.createDefense);
router.post('/assignGroup', DefenseController.assignGroupDefense);

module.exports = router;