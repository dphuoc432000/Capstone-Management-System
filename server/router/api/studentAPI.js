const express = require('express');
const router = express.Router();
const StudentController = require('../../controller/StudentController');

router.post('/registerExecuteProject', StudentController.registerExecuteProject);
router.get('/:id', StudentController.getStudent);
router.get('/', StudentController.getAllStudent);
module.exports = router;