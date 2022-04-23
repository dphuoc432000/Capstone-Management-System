const { ListTask } = require("../db/models/ListTaskModel");
const { Stage } = require("../db/models/StageModel");

class ListTaskService{

    checkStage = async (stageId) =>{
        return await Stage.findOne({
            where: {
                stageId
            }, raw: true
        }).then(data => data?true:false);
    }

    addListTask = async(listTask) =>{
        const checkStage = await this.checkStage(listTask.stageId);
        if(checkStage){
            return await ListTask.create(listTask,{
                raw: true
            }).then(data => data? true: false);
        }
        return "NO STAGE";
    }

    //khoong update stageId
    updateListTask = async( stageId,listTaskId,listTask) =>{
        const checkStage = await this.checkStage(stageId);
        if(checkStage){
            return await ListTask.findOne({
                where:{
                    listTaskId,
                    stageId
                },
                raw: true,
            }).then(async data =>{
                if(data){
                    return await ListTask.update(listTask,{
                        where: {listTaskId, stageId},
                    }).then(data => data[0]>0?true:false);
                }
                return "NO LIST TASK"
            })
        }
        return "NO STAGE";
    }

    deleteTaskList = async(stageId,listTaskId) =>{
        const checkStage = await this.checkStage(stageId);
        if(checkStage){
            return await ListTask.destroy({
                where:{
                    stageId,
                    listTaskId
                }
            }).then(count => count>0?true:false)
        }
        return "NO STAGE";
    }

    getAllTaskListOfStage = async(stageId) =>{
        const checkStage = await this.checkStage(stageId);
        if(checkStage){
            return await ListTask.findAll({
                where:{
                    stageId
                }, raw: true
            }).then(data => data)
        }
        return "NO STAGE";
    }
}

module.exports = new ListTaskService();