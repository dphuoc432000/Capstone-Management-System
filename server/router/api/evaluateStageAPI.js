const express = require('express');
const router = express.Router();
const evaluateStageController = require('../../controller/EvaluateStageController');

router.post('/add', evaluateStageController.addEvaluates);

module.exports = router;
