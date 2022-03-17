const express = require('express');
const router = express.Router();
const StudentController = require('../../controller/StudentController');
const authJwt = require("../../helper/authJwt");
router.post('/registerExecuteProject', StudentController.registerExecuteProject);
router.get('/:id', StudentController.getStudent);
router.get('/',StudentController.getAllStudent);
router.post('/update/:id', StudentController.approveStudent);
module.exports = router;