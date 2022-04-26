const { EvaluateStage } = require("../db/models/EvaluateStageModel");
const { Project } = require("../db/models/ProjectModel");
const { Stage } = require("../db/models/StageModel");
const { Student } = require("../db/models/StudentModel");
const ProjectService = require("./ProjectService");
const StageService = require("./StageService");
const StudentService = require("./StudentService");

class EvaluateStageService {

    checkStudentInStage = async (stageId, stuId) =>{
        // return await StudentService.getStudentByStuId(stuId)
        //     .then(async data =>{
        //         if(data){
        //             await ProjectService.
        //         }
        //         return false;
        //     })

        const stageData = await Stage.findOne({
            where: {stageId},
            raw: true
        }).then(data => data);
        console.log(stageData);
        if(stageData){
            const projectData = await Project.findOne({
                where:{
                    projectId: stageData.projectId,
                }, raw: true
            })
            console.log(projectData);
            return await Student.findOne({
                where:{
                    stuId,
                    groupId: projectData.groupId
                }, raw: true
            }).then(data => data?true:false);
        }
        return false;
    }

    addEvaluates = async (evaluates) =>{
        let check = true;
        for (const eva of evaluates) {
            console.log(await this.checkStudentInStage(eva.stageId, eva.stuId))
            if(!await this.checkStudentInStage(eva.stageId, eva.stuId)){
                check = false;
                break;
            }
        }
        if(check)
            return await EvaluateStage.bulkCreate(evaluates)
                .then(data => data?true:false);
        return false;
    }

}
module.exports = new EvaluateStageService();