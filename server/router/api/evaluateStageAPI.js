const express = require('express');
const router = express.Router();
const evaluateStageController = require('../../controller/EvaluateStageController');

router.post('/add', evaluateStageController.addEvaluates);
router.get('/get/:stageId', evaluateStageController.getEvaluateOfStageDetail);

module.exports = router;
