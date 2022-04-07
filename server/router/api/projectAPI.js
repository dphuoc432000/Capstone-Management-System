const express = require('express');
const projectController = require('../../controller/ProjectController');
const router = express.Router();

router.post("/update/topic/:projectId", projectController.updateProjectNoStart);
router.post("/update/project/:projectId", projectController.updateProjectStart);
router.get("/get/:typeCapstone", projectController.getProjectByTypeCapstone);
router.post("/reject/:projectId", projectController.rejectTopic);
router.post("/approved/:projectId", projectController.approvedTopic);

module.exports = router;