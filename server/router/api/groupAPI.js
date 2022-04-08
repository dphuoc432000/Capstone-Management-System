const express = require('express');
const router = express.Router();

const GroupController = require("../../controller/GroupController");
router.post("/createGroup", GroupController.createGroup);
router.post("/assignmentor", GroupController.assignMentor);
router.get("/", GroupController.getAllGroup);
module.exports = router;