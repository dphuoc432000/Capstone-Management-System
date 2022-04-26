const { EvaluateStage } = require("../db/models/EvaluateStageModel");
const { Project } = require("../db/models/ProjectModel");
const { Stage } = require("../db/models/StageModel");
const { Student } = require("../db/models/StudentModel");
const ProjectService = require("./ProjectService");
const StageService = require("./StageService");
const StudentService = require("./StudentService");

class EvaluateStageService {

    checkStudentInStage = async (stageId, stuId) =>{
        const stageData = await Stage.findOne({
            where: {stageId},
            raw: true
        }).then(data => data);
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
    //kiểm tra student đã được đánh giá trong stage này chưa
    checkStudentInEvaluateStage = async (stageId, stuId) =>{
        return await EvaluateStage.findOne({
            where:{
                stuId,
                stageId,
            }, raw: true
        }).then(data => data? true: false);
    }

    addEvaluates = async (evaluates) =>{
        for (const eva of evaluates) {
            console.log(await this.checkStudentInStage(eva.stageId, eva.stuId))
            if(!await this.checkStudentInStage(eva.stageId, eva.stuId) || await this.checkStudentInEvaluateStage(eva.stageId, eva.stuId)){
                return false;
            }
        }
        return await EvaluateStage.bulkCreate(evaluates)
            .then(data => data?true:false);
    }

    getEvaluateOfStageDetail = async (stageId) =>{
        return await Stage.findOne({
            where:{
                stageId,
            }, raw: true,
        }).then(async stageData =>{
            if(stageData){
                return {
                    ...stageData,
                    evaluates: await EvaluateStage.findAll({
                        where:{
                            stageId,
                        }
                    }).then(async data =>{
                        if(data && data.length > 0)
                            data = await Promise.all(data.map(async evaluate =>{
                                const studentData = await StudentService.getStudentByStuId(evaluate.stuId);
                                return{
                                    ...studentData,
                                    evaluate:{
                                        percentage: evaluate.percentage,
                                        comment: evaluate.comment
                                    }
                                }
                            }))
                        return data;
                    })
                }
                
            }
            return "NO STAGE";
        })
    }

}
module.exports = new EvaluateStageService();